title: How to test if a variable or property is defined in JavaScript
description: "Shows various ways to test if a variable or a property is defined in JavaScript"
categories:
- Tutorial
- Programming
- JavaScript
tags:
- Tutorial
- Programming
- JavaScript
date: 2015-03-20 18:20
updated: 2015-12-18 10:20
---

# How to test if a variable or property is defined in JavaScript

## The problem

There are several use cases for testing if a variable or property is defined. We will examine them before examining the ways to check the state.

- Check if a global variable exists.
Of course, in our code, we carefully avoid to create global variables... We use `var` each time we declare a variable, and `'use strict';` guards against forgetting it. Of course, we have `'use strict';` everywhere, and an ESLint, JSHint or similar tool configuration to enforce it.
But still, we can have global variables, at least when we load 'old-school' (not AMD / CommonJS enabled) libraries: jQuery's `$` and Underscore / Lodash's `_` are famous examples.
In generic code, we might want to check if these variables are defined, and if not, to provide an alternative implementation.
Reminder: in a browser, these global variables are attached to the `window` object.
In the general case, we have two scenarii: the variable is not declared at all, or it is declared but no value has been assigned to it yet.
In the first case, if we try to use it, we will have an error (ReferenceError) complaining about a non-existing variable.
In the second case, the variable has the value `undefined`.

- Check if a local variable exists.
Actually, I will ignore this one: it is the same case than the first one, and a simple look at the code around is better than coding a check! It is here only for exhausting the cases...

- Check if a property is defined on an object.
That's the most common case. It can be used against global objects (eg. to see if a browser object has one of the latest features), against library objects (to handle old versions or optional features), against function parameters (optional properties on a parameter), etc.

- Check if a function parameter is defined.
A function expecting a number of parameters can be called with only part of them, or even none.
In this case, the missing parameters (at the end of the list) are declared but have the value `undefined`.

## The possible checks

JavaScript offers several ways to do this check. What is the "best" one?
As often, the answer is: "It depends"...

### typeof v

A rather universal / safe way is to use the `typeof` operator:
```
if (typeof someIdentifier == 'undefined')
```
Advantage: it works in all cases, even when the variable is not declared at all (that's the only case where we can use an undeclared variable without throwing an error). But honestly, it is verbose / cumbersome... :-) And I dislike using strings in code like that: if you type `'undfined'` instead, it can go unnoticed for a long time...
Note: since `typeof` is guaranteed to return a string result, we can use the `==` check. You might prefer to use `===` comparison if that's the policy of your project (which might be enforced by some tools).

### v === undefined

A simpler way to do the check is to compare against `undefined`:
```
if (someIdentifier === undefined)
```
Beware: don't use `==` as automatic type conversions done by JavaScript will bite you!

Some people object that this method can be flawed because JavaScript doesn't prevent from assigning a value to `undefined`:
`undefined = {};` is legal!
Now, it is unlikely to happen, unless somebody made a programming mistake like forgetting an `=` in an oddly constructed test: `if (undefined = foo)`.
If you include in your code base some code from an inattentive adept of Yoda conditions, you have a bigger problem than you thought... :-)
And ECMAScript 5, implemented in all major modern browsers, now prevent this, making (at least!) `undefined` immutable.
So, unless you target very old browsers, it is safe, short and explicit.

### if (v)

`if (foo)`
_or_
`if (foo.bar)`

I mention it because its usage is common. But it is generally a bad way to do the check.
First, the first form fails (with the error "ReferenceError: foo is not defined") if the variable is not defined at all. Now, the check is generally done for a property or local variable / parameters, which is safer. Note that so called global variables are, on the browser, properties of the `window` object, so instead of writing `if (foo)`, we can always write `if (window.foo)`, and it won't crash as in the first form.
Second, it is a brittle check: it will fail if `foo.bar` is undefined, as expected, but also if it is "falsey", the JavaScript term for all values evaluated as false because of type coercion. So it also fails if `foo.bar` is defined but has the value `false`, or is an empty string, or zero, or `null`, etc.
Not very trustworthy...
To be honest, this form of test is mostly used when `foo.bar` is expected to be a function, to check if we can call it or not. In this case, it is unlikely to be 0 or '' or false...
It is also OK if the variable / property must be an object. It is often used in the idiom `var x = foo && foo.bar;` to avoid getting a property on an undefined object.

### yourLibrary.isDefined() or someLibrary.isString()

Several libraries offer facilities to properly do this check.

AngularJS offers several functions for that: `isDefined()`, `isUndefined()`, but also specialized functions to check if a variable is defined and has the proper type:
- angular.isArray
- angular.isDate
- angular.isElement
- angular.isFunction
- angular.isNumber
- angular.isObject
- angular.isString

Underscore and Lodash have similar functions:
- _.isElement
- _.isArray
- _.isObject
- _.isArguments
- _.isFunction
- _.isString
- _.isNumber
- _.isBoolean
- _.isDate
- _.isRegExp
- _.isError
- _.isFinite
- _.isNaN
- _.isNull
- _.isUndefined

Lodash has some more functions:
- _.isNative
- _.isPlainObject
- _.isTypedArray

jQuery also has checks:
- jquery.isArray
- jquery.isFunction
- jquery.isNumeric
- jquery.isPlainObject
- jquery.isWindow
- jquery.isXMLDoc

And so on.

