title: Using Lodash for fun and profit
description: "Presenting the JavaScript library Lodash"
categories:
- Tutorial
- Programming
- Library
- JavaScript
tags:
- Tutorial
- Programming
- Library
- JavaScript
- Functional programming
- Lodash
date: 2015-10-01
---

# Using Lodash for fun and profit

Lodash is a JavaScript utility library enabling a functional programming coding style.
Lodash has general purpose functions, for type checking, string utilities, even functions to manipulate functions.
More importantly, it has functions to manipulate collections. Collections is a general term covering arrays, objects (seen as maps) and even strings (seen as arrays of characters).

This allows to replace most `for` loops with powerful and succint function calls, showing clearly the intent of the operation without having to analyze complex code.


## History

In the days of JavaScript before EcmaScript 5 (which added methods like map or filter), JS was mostly used as an imperative language.
The Underscore library (created by Jeremy Ashkenas) changed that by introducing (in 2009) functions like map, filter or reduce to ease processing of arrays. Similarly to jQuery, which adds a global variable named `$` to be reacheable from everywhere, Underscore adds a global variable named... `_` to provide its functions.
An Underscore contributer, John-David Dalton, tired of some limitations and inconsistencies of the library, forked it (in 2012) and named the project Lo-Dash (pun on "low dash", ie. an underscore). Later, it just took the name Lodash. The library kept the `_` symbol, as it is intended to be a drop-in replacement of Underscore: replace one with the other, no other code change, and benefit from higher speed, more functions, more consistency and better documentation.
Today, Lodash diverges from the Underscore API but maintains a compatibility build.
Out of the box, Lodash is bigger than Underscore. Unless you start adding extensions to the latter to get functionalities available in Lodash... And Lodash has a tool to create a build having only the functions you want. And if you use `require` on your functions, it will build automatically with only them.
As said, EcmaScript 5 brought some functional features like map or filter on arrays. Underscore uses them if available, hoping their implementation will be someday faster than a manual implementation. Lodash generally prefers its hand-tuned implementations, much faster than current browser implementations. JD Dalton is performance-obsessed (he co-created a benchmark library and the JSPerf site) so he ensures the performance hit of using his library instead of hand-crafted for loops is very minor.

Personally, I started to use Underscore, but I found I needed to mutate an array, to avoid loosing AngularJS bindings. Underscore doesn't allow that, so I looked into its extensions. But the one allowing maybe to do that was poorly documented. I finally used Lodash and never looked back.
I once made an issue (#2052) on Underscore to point out that some information was missing at one place and had to be found elsewhere. The issue was closed without change.
In contrast, Lodash's doc repeats all the information needed to use a function in each entry. It might seem tiresome, but the user skips over these repetitions... unless she really need the info! In this case, it is here. Great when jumping to a definition to refresh the memory... or to discover it.
Moreover, I made an issue to point out some little confusion. JD Dalton quickly asked for a pull request, and merged it verbatim within hours.


## Functional programming

As said, Lodash has functions acting specifically on arrays, objects (aka. associative arrays, aka. maps) and strings (and more).
But it also has functions that treat these three types as one: collection. They are taken as "bag of items in variable number, ordered or not".
These functions always take a collection as input, and generally a function, called _iteratee_, or _predicate_ if it returns a boolean, that processes each item of the collection.
There are functions to filter out items (or to keep only some of them), to map them to something else, to reduce them to a single value, to find an item, etc.
With them, you will never need to write a for loop ever again...

I wrote an article explaining the base principles of functional programming (FP) behind these functions. I invite you to read it before continuing here: although the article is language agnostic, it fully apply to Lodash and I cleverly used Lodash function names there... Actually, most of them are relatively standard in the FP world and can be found in various libraries across various languages.

So here, I will concentrate on the specificities of Lodash, fully adapted to the needs of JavaScript.


## General patterns of Lodash function parameters

As said, lot of Lodash functions take a collection as first parameter, and an iteratee as second one.
Example:
`var r = _.filter(list, function (v) { return v.name === someName; });`
You will find yourself to write frequently such simple predicate.
So Lodash made a shortcut for this pattern:
`var r = _.filter(list, 'name', someName);`
Even if you use ES6 and its arrow notation, it is still more concise...

You can even omit the value:
`var r = _.filter(list, 'name');`
In this case, Lodash will return the value of this property for each object, used here as a truthy or falsy value: here, it will keep out all objects without a name property (undefined), or with a null or empty value.
If you replace `filter` with `map`, it returns all the name values of the list.

If you replace the property name with an object, Lodash will return `true` if the current item includes (deeply) all the properties of the given object with their values.
For example:
`var p = _.find(persons, { name: Bond', surname: 'James' });`
will return the first person with these name and surname.

You will find these shortcuts in most Lodash functions, if applicable. The Lodash documentation re-explain them on each function supporting them.

Most iteratees / predicates also share the same set of parameters: they are generally called with the current item, its index if the collection is an array or a string, or its key if that's a map (an object), and the collection itself.
When a function has an iteratee (or other callback function), it also accepts an optional `thisArg` as last parameter. This allows to bind an object to the callback, to access its properties or methods. I haven't used it yet...

Note that Lodash is robust against `undefined` or `null` input: it won't throw exceptions, but will do some kind of noop, depending on function.


## Reminder

In the article mentioned above, I talk about some common functions:
forEach (each), forEachRight (eachRight), reduce (foldl, inject), reduceRight (foldr), range, filter (select), reject, find (detect), findLast, findIndex, map (collect), mapRight, take, takeWhile, takeRight, takeRightWhile, first (head), last, initial, rest (tail), drop, dropWhile, dropRight, dropRightWhile, map, every (all), some (any), zip, unzip, partial, ary, rearg, negate.
The names between parentheses are aliases.
Except for consistency, I won't present them again here.

I won't present all the functions of Lodash, check the official documentation to have an up-to-date list and detailed presentations.
They are numerous. I advice to quickly scan the list, to get an idea of what they do, what are the available tools, then later to check in depth the functions you need.


## Chaining

Let say you want to filter an array, take only the last 10 elements and map them to something else.
You can do that in three steps:
```
var numbers = [ 10, 55, 6, 98, ... ];
var rf = _.filter(numbers, function (n)
{
  return n <= 10;
}
var rt = _.take(rf, 10);
var r = _.map(rt, function (n) { return n * 10; });
```
This shows clearly each step, which can be nice for debugging, but it is a bit verbose and it creates variables "polluting" the current scope.
Of course, you can nest the calls:
```
var r = _.map(_.take(_.filter(numbers, function (n) { return n <=10; }, 10), function (n) { return n * 10; });
```
No more intermediary variables, but it is a bit less readable, and the order of calls isn't obvious.
Lodash allows to chain calls, leading to more readable code, and even to more efficient processing of data.
```
var r = _.chain(numbers)
  .filter(function (n) { return n <= 10; })
  .take(10)
  .map(function (n) { return n * 10; })
  .value();
```
Notice the call to `value()`.
It is necessary because this chain is open-ended: you can add other functions after it. Eg. you can end it after the `take()`, and have two different values by ending the chain with two different `map`s.
`value()` tells to end the chain and to evaluate it.
This shows that this chaining is _lazy_: no processing is done until it is requested by `value()`. Moreover, this chaining is optimized, Lodash practices function fusion with shortcut: it doesn't create an intermediary result on each function call, but rather creates a compound function processing the whole input at once. And, of course, it will not map the data beyond the 10 selected by `take()`.
There is a slighly shorter variant:
```
var r = _(numbers).filter(...)...value();
```
They are basically the same, with a little difference: `value()` is not necessary if the final result is a primitive (string, number, ...). And it is slightly shorter, although less explicit.


## Mutating data

We saw that FP privileges usage of immutable data,  returning a new structure instead of changing the given one.
But Lodash is pragmatic, and provides functions that can mutate collections in-place: it might be more memory efficient, and it is useful when you must keep the reference to the data. For example, if you bind a collection in AngularJS, you have to change it in-place; if you assign a new collection, the binding is broken.


## Collection functions

Reminder: _collection_ is a generic term. Basically, it covers JS iterable structures: arrays, objects (seen as map, sometime called associative arrays) and strings (seen as a list of characters).
The following functions work for these kinds of collections. Later, we will present functions more specific to each type.



## Array functions

We already saw lot of functions that can be applied on arrays (among other iterable structures). Let's see some more specific.

### Functions mutating arrays

`_.fill(array, value, [start=0], [end=array.length])`
Fills the given array with the given value in the given range (defaulting to full array).

`_.pull(array, [values])`
Removes all provided values (as list of arguments) from the array.

`_.pullAt(array, [indexes])`
Removes elements from the array at the given indexes (as list of arguments or array of indexes).
Returns an array of removed values (null value if index is out of range).

`_.remove(array, [predicate=_.identity], [thisArg])`
Removes all elements from array that predicate returns truthy for, and returns an array of removed values.
Supports property shortcuts.

`_.property.reverse()`
Reverses the wrapped array and returns the wrapped instance (for chaining).

### Functions returning a new arrays

`_.without()`
Same as `_.pull` but doesn't mutate the array.

`_.at()`
Same as `_.pullAt` but doesn't mutate the array.

`_.filter()`
Same as `_.remove` but doesn't mutate the array.


## Object functions

### Accessors

Objects in JS are dynamic: sometime, an information is optional or missing.
For example, you might want to access `order.customer.addresses.shipping.zipCode`.
The shipping address can be optional, eg. if it is the same than the customer's address.
Plus we can have missing (`undefined`) information at any level.
We can put the access in a try / catch block. But that's ugly.
Or we can check each level up to the one we want:
`if (order !== undefined && order.customer !== undefined && order.customer.addresses !== undefined && ...)`
Tiresome and prone to errors. Idem for the shortcut version `order && order.customer && order.customer.addresses ...`.
Lodash offers functions to access an arbitrary depth of nested objects without throwing errors.

`_.get(object, path, [defaultValue])`
Accesses the property at the given path.
Example: `var zip = _.get(order, "customer.addresses.shipping.zipCode");`
gives the value if available, or `undefined` (or the default value, if provided) if one level is missing.

`_.set(object, path, value)`
Is similar, except it sets the value at the given path, creating intermediary objects if needed.
It mutates the object.

`_.has(object, path)`
Checks if path is a direct property.
```
var oo = { x: 'foo', y: { z: 'bar', u: undefined } };
_has(oo, 'y.z') //=> true
_has(oo, 'y.u') //=> true
_has(oo, 'y.m') //=> false
```

Note that `path` can also be an array: `[ 'customer', 'addresses', ... ]`
It can include indexes of arrays: `"customer.addresses[1].zipCode"`

### Assign, merge and defaults

Elegant and flexible ways to merge objects and set default values to missing properties.
These functions mutate the destination object, and return the result.
It is not uncommon to give an empty object `{}` as destination, if we want to merge two objects but to leave them intact (or if one of them can be undefined).

`_assign(object, [sources], [customizer], [thisArg])`
Assign the (own) properties of source object(s) to the destination object, each additional source property overwriting the previous ones, including source properties set to undefined

`defaults(object, [sources])`
Assign the (own) properties of source object(s) to the destination object, only if the destination property is `undefined`. Once a property is assigned, it won't change.

`defaultsDeep(object, [sources])`
Is like `_.defaults` but it t recursively assigns default properties.

merge overwrites deeply all properties with successive values, except undefined source properties

Example:

```
var dest = { name: 'Foo', age: 25, driver: true,
    id: { driverLicense: '88-65', ssn: '1-54-455', other: 'mango' }  };
var src1 = { name: 'Bar', driver: false, address: 'Here and there',
    id: { driverLicense: undefined, ssn: '2-44-985', pwd: '123' }  };
var src2 = { name: 'Moo', maried: true, age: undefined, address: 'Somewhere',
    id: { driverLicense: '11-75', ssn: undefined, warcry: 'Kowabunga' } };

_.assign(dest, src1, src2)

==> {"name":"Moo","driver":false,"id":{"driverLicense":"11-75","warcry":"Kowabunga"},"address":"Somewhere","maried":true}

_.merge(dest, src1, src2)

==> {"name":"Moo","age":25,"driver":false,"address":"Somewhere","maried":true,
    "id":{"driverLicense":"11-75","ssn":"2-44-985","other":"mango","pwd":"123","warcry":"Kowabunga"}}

_.defaults(dest, src1, src2)

==> {"name":"Foo","age":25,"driver":true,"address":"Here and there","maried":true,
    "id":{"driverLicense":"88-65","ssn":"1-54-455","other":"mango"}}

_.defaultsDeep(dest, src1, src2)

==> {"name":"Foo","age":25,"driver":true,"address":"Here and there","maried":true,
    "id":{"driverLicense":"88-65","ssn":"1-54-455","other":"mango","pwd":"123","warcry":"Kowabunga"}}
```


## String functions

### Case-changing functions

Reminder: case is a typographical style: uppercase (A) or lowercase (a).
JavaScript allows to change case of a whole string: `s.toUpperCase()` and `s.toLowerCase()`.
Language identifiers (and file names, etc.) can have various styles:
- snake_case (one style of variables)
- UPPER_CASE (constants)
- camelCase (another style of variables)
- TitleCase (classes)
- kebab-case (CSS properties, often CSS class names too)
and sentence styles:
- Initial capital
- Start Case

Lodash offers a number of functions to convert from any style to one of these.

_.camelCase: foo--bar-, __foo_bar, Foo Bar => fooBar
_.capitalize: foo bar => Foo bar
_.kebabCase: FooBar, _foo__bar_, foo Bar => foo-bar
_.snakeCase: foo bar, fooBar, Foo-Bar => foo_bar
_.startCase: foo bar, --Foo-bar, _foo_bar => Foo Bar

### Additional functions:

_.deburr("ça déjà tôt") => ca deja tot
_.startsWith("aaron", "aa") -> true
_.endsWith("file.txt", ".txt") => true
_.repeat("=-", 3) => =-=-=-

Plus some other functions too long to detail: see doc for more.
A `template` function allowing string interpolation.
Two escape functions to escape some characters in HTML and regexp. There is also an unescape function.
Three pad functions to fit a length.
Three trim functions to remove characters (spaces by default) from left, right or both sides of a string.
`trunc` cutting a string at given length and separator, with a continuation string (ellipsis by default).
`words` cutting a sentence in words.


## Function functions

Ie. functions manipulating functions, aka. _higher-order_ functions.
See the FP article on the use cases for the functions.

We saw `partial` to pre-fill arguments, `ary` to reduce the number of parameters, `rearg` to change their order, and `negate` to invert the result of a predicate.

### Time-related functions

`_.debounce(func, [wait=0], [options])`
`_.throttle(func, [wait=0], [options])`
These two functions seem similar, but differ in effect (of course!) and usage.
They are used when a function is called frequently at irregular intervals. A typical example is a callback on user input. These functions limit the number of calls effectively done, to limit the pressure on the process.

`debounce` prevents calling the function unless it hasn't be called for some time.
For example, we set a callback on key press in a text field. There, we want to do an Ajax call to search for the text input so far. But we don't want to do too frequent calls if the user types quickly: we can have a new character before the previous request response arrives.
So we wait for a pause in the typing to issue the request: we prevent calling the function, but if the function hasn't been called for a given time, then we really call the function with the latest result.

`throttle` allows calling the function only once in a given interval.
It is typically used to regulate a great amount of calls, like mouse moves (dragging) or scroll events.
It cuts time in windows of given interval, and it blocks all calls except the last one of the window (or the first one if specified by an option).
So when you have a stream of events to process, it samples these events to reduce the amount of processing.


## Various other functions

Lodash offers a number of functions to check the type of a given value:
isUndefined, isNull,
isObject, isArray, isFunction, isNative (function),
isBoolean, isDate, isNumber, isRegexp, isString,
isArgument, isError, isTypedArray, isElement (Dom element),
isNaN, isFinite
Their name is explicit enough to dispense of a short description. See doc for details.
They a particularly useful to ensure an argument has been passed to a function.

`_.isEmpty` checks if the given value is empty. Can check for arrays, objects, strings and jQuery-like collections,
`_.isEqual` does a deep comparison between two values to determine if they are equivalent. A customizer function allows some fuzzy logic (eg. case-insensitive comparison, etc.).
`_.isMatch` does a deep comparison to determine if the given object includes all the properties of the source object. Also accepts a customizer function.

`_.clone` and `_.cloneDeep` create respectively a shallow and a deep clone of the given value. Accepts a customizer.

