title: How I use MobX 2 in an AngularJS 1 application
description: "Presenting MobX 2 in a concrete use case with AngularJS 1"
categories:
- Programming
- JavaScript
tags:
- Tutorial
- Programming
- JavaScript
- Library
- Functional programming
- Reactive programming
date: 2016-04-30
---

# How I use MobX 2 in an AngularJS 1 application

MobX is a library simplifying state management by using functional reactive principles.
It manages dependencies between values, somehow like a spreadsheet does with its cells: if the value of a cell changes, other cells depending on the first one can change too, in a cascading way.

The manual of MobX can be read at [MobX, Simple, scalable state management](https://mobxjs.github.io/mobx/refguide/).
It is a comprehensive guide, rather dense (worth reading again after experimenting with the library...) but clear and informative.

I used it in an AngularJS 1 application, to manage state of controllers (components), so in a rather local and isolated way.
That's just one way of using it, which I explain below.

{% img /images/MobX_logo.png "'MobX logo'" "'MobX'" %}

<!-- more -->

## Why I need(ed) something like MobX

On my second AngularJS project (the third made in the company), we have some quite complex state management: we have a main view / controller showing a graph (nodes with relations), with a toolbar, whose buttons are disabled depending on user actions (changing the graph), data loading (fetching graph data), state in the data (is graph processed on server side), etc.
We also have two dialog boxes (one calling the other) with controls and buttons, also interacting, depending on user choices, state of / in data, etc.
We have to enable / disable these controls, and also set tooltips or messages explaining why they are disabled, so that user can do proper actions.
All this led to a rather complex state management, done in a classical way, with booleans and intermediary data structures, and functions called to update dependencies between these variables.
We managed this state with a bunch of booleans (is this control disabled?) set on the fly in a ad hoc way (uh, I need this flag, let's create it there) on the scope (the controller instance), and by calling functions to show appropriate tooltips / messages in all places where the state changes.

At the end, the code was a bit messy, with state changing everywhere, forgotten cases, having to track usage to add the missing ones, sometime inconsistent or unclear usage, etc.

Then I saw a tweet mentioning MobX. I had a look at the site, and the description looked like a good fit to my problem.
A superficial look could lead to think it was made for React with an ES6 syntax, but reading on, I found they are actually framework-agnostic (React-specific stuff is separate) and totally compatible with ES5.


## Context

I use the "controller as" pattern in this Angular application, and I assign `this` to the `ctrl` variable at the start of the controllers.
So I refer to `ctrl.xyz` for the controller variables, those visible from the related template.
I also have some variables with same lifetime than the controller, but not needing to be visible on the view. By convention, we name them `ctrl._xyz`, the underscore meaning "private"...
If you don't use "controller as" pattern, you can mentally replace `ctrl` with `$scope`.

I tend to name functions that are traditionally anonymous, like iteratees of Lodash functions, callbacks defined in function calls, etc.
Ie. instead of doing `_.map(circles, function (c) { return TWO_PI * c.radius; ];` I write `_.map(circles, function __toPerimeter(c) { return TWO_PI * c.radius; ];`.
This is generally a good practice, as it shows the intent of the transformation, and these names can show up in stack traces in debuggers, etc.
It is even more important with MobX, because it keeps tracks of these names and this allows an easier debugging of its mechanisms.
I use a double underscore as prefix to help distinguishing these small functions from the others when my IDE (Atom) lists them.


## My usage of MobX

I have two objects on the controller, related to the view, ie. referenced in the template:

- As input, `ctrl.viewModel` contains the models, referenced by `ng-model` directives. Ie. they are changed by the user (text input, radio-buttons, check boxes, etc.).
- As output, `ctrl.view` contains the view values, used in the template to display these values.

Between them, I can have some intermediary objects, eg. `ctrl._model` for data structures, `ctrl._internal` for flags, etc.
These objects, and `ctrl.viewModel`, are observable by wrapping them in a `mobx.observable` call.
MobX transforms (recursively) each field (property) of these objects to observable values: that's simpler than calling `observable` on each field.
If you use a more OOP approach, as described in the docs, you might want finer control on how some fields are observable and some are not.
Here, I just use these plain objects to group together observable values.

These observables can be simple values set by the code (string, number, boolean); or arrays (each value is observed), or objects (each property is observed).
Observable values are replaced by MobX by a pair of accessors, ES5's getters and setters, or specialized objects, like ObservableArray, mimicking the behavior of real arrays, but observing each entry and operation (like `splice`).
If the property of an observable object is assigned a new value, MobX makes it observable too.
It doesn't do it for added properties, so they must be declared from the start, which is a good thing: no more variables added "on the fly" in the middle of the code.

In some cases, I observe arrays to watch insertions / deletions: I don't change the objects it has inside, which generally doesn't change anyway. To improve performances (and memory consumption), I use the `asFlat` modifier.

The observed values can be also be functions without parameters: they are called when the field is read.
The function acts as a getter, and can compute a value from other values.
If some of these values are observables, MobX invokes their getter, which in turn can invoke other getters, etc.

Instead of a direct computation from other values, the function can call a transformer, created via... `mobx.createTransformer`.
A transformer takes one (and only one) observable value as entry, and must return a new value computed from the parameter, and possibly from other observable values.
As we use properties from observables, we invoke their getters. MobX then keeps track of these sub-observable objects.
When a setter is invoked on these objects, MobX knows it has to recompute the result of the transformer.
Otherwise, since input hasn't changed, it knows output didn't change*, so it can return the previous value, said to be memoized. This results in a much faster response, particularly if the operation iterates on large collections.
* Obviously, the function must be deterministic: for a given input, it always returns the same output. Don't put `random()`, `getTime()` or I/O result in there!

The above is an over-simplified description how MobX works. The exact mechanism is described in the article [Becoming fully reactive: an in-depth explanation of MobX](https://medium.com/@mweststrate/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254). MobX has optimizations making all this working very fast...
Beside, as the core mechanism is based on accessors, it is intrinsically static: no need to scan all the observed variables / entries / properties regularly to check if there is a change, the sole fact to get or set a value is enough to trigger the mechanism. The other advantage is synchronicity and atomicity: changes don't have to wait for a "digest" cycle, and all changes are applied at once: no inconsistent intermediary state.

Back to my implementation: `ctrl.view` is not an observable. It is already watched / bound by Angular, and I prefer to keep it "static", assigning new values if their dependencies change.
For this, I use `mobx.autorun` which is used to do side-effects when an observable value inside it changes.
My side-effects here are to assign a new value to `ctrl.view` properties... I do that only for computation-intensive value evaluations (extracting data from collections, etc.), using transformers to memoize the results.
Actually, it corresponds to described side effects, like disabling a control, selecting an entry in a list, etc. Because it is Angular, instead of calling `control.setEnabled(true / false)` or `combo.select(index)`, we assign the values to bound variables: `ctrl.control.enabled = true / false` or `combo.selection = combo.model[index]`. But basically, that's the same thing.

As `createTransformer` is a bit heavy-handed (needs some boilerplate code, accepts only one parameter), for lighter evaluations (no iterations) I use the ES5 getter syntax, function evaluated each time the property is read: `var o = { get foo() { return someValue * 2; } }; var x = o.foo; // Calls the getter and returns twice someValue`
I formerly used `mobx.computed` for that, but I am not sure if it brings any advantage here...

In other words, I went from

    ctrl.view =
    {
        saveDisabled: mobx.computed(function saveDisabled()
        {
            return ctrl._internal.noItems || !ctrl._internal.hasCommonStuff || ctrl._internal.isStarted;
        }),
    };

to

    ctrl.view =
    {
        get saveDisabled()
        {
            return ctrl._internal.noItems || !ctrl._internal.hasCommonStuff || ctrl._internal.isStarted;
        },
    };

Note: transformations must be used inside a reaction like `@observer` or `autorun`. They also work if they are part of the dependency graph pulled from an `autorun`, as done above (view depending on observable objects).
Maybe the `computed` version allows such triggering, if needed.


## Conclusion

It might seem strange to use MobX with AngularJS, whereas the latter can `$watch` value changes or invoke functions from the template.
MobX has two advantages here:

- It is synchronous, while AngularJS computes watches only in a digest cycle. This ensures there is no "dirty" state, with intermediary values, or values changed and not yet updated in the display.
- It can memoize results. This avoids complex collection processing on each cycle, these are done only when the collections actually change.

This avoids explicit `$watch` (I never use them in controllers anyway), evaluation of functions in templates (like `ng-disabled="vm.isFooDisabled()"`) or manual calls to `ctrl.updateState()` in the controller code, which can be forgotten or done too much.
MobX allows to describe a graph of dependencies, and to ensure it is always up to date.

For complex changes, like changing several values in an array, we can also use transactions, minimizing the recalculations.

MobX is a mature library, used in large applications, and it proved to be very efficient.











## Potential issues / points to be aware of

### Avoid to assign null to observables

That's a general advice in computing: instead of using `null`, use a "null object", a real "inert" object . Like an empty object `{}`, an empty array `[]` or similar.
MobX will throw when you assign `null` to an observable, and will tell you that you have an infinite loop in your dependencies, so these null objects are better here.


### T

I had an issue because I made an array of objects observable.
I made an array of a subset of these objects, these where still observables (references on the original objects, actually). I gave the subset elsewhere, and a _.cloneDeep was done to avoid changing the original stuff. But this resulted in an empty array!
So, beware of interactions with other parts of code.

In my case, I observed the array only to see if it is not empty, which is a bit overkill...

    ctrl._model = mobx.observable(
    {
        stuffList: [],
    });

Easy way out: I tell MobX not to observe the objects themselves.

    ctrl._model = mobx.observable(
    {
        stuffList: mobx.asFlat([]), // Observe array, not objects inside it
    });

Assigning later the real array to stuffList preserved the asFlat modifier.

Basically, if you are interested in changes in the array (add / remove items), but not the objects inside them (which might not change at all!), `asFlat` is good to use (can even improve performance / reduce memory usage, which doesn't hurt...).
