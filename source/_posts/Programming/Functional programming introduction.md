title: "Functional Programming: a Brief, Pragmatic Overview"
description: "Tutorial about functional programming, short and practical"
categories:
- Programming
- General
tags:
- Tutorial
- Programming
- Functional programming
date: 2015-09-20
---

# Functional Programming: a Brief, Pragmatic Overview

Functional Programming (FP) is a programming paradigm, like imperative (procedural) programming or object-oriented programming (OOP).
Some people oppose these paradigms, but actually they are not exclusive of each other: we do imperative programming inside OOP's methods, and we can mix OOP and FP: that's even a trend in modern languages (Scala, Ceylon, ...) and in older ones (JavaScript, Java 8...).

## Why functional programming?

FP exists for years, but it was rather confined to niche languages. It started to infuse in the mainstream coding practices via the above mentioned languages or libraries like Guava (Java) or Underscore / Lodash (JavaScript).
By promoting stateless functions and immutable data, it proved to be very efficient and easy to control in concurrent programming, leading to efficient processing of big data.
It is also easy to test. Its rather declarative style is also easy to read.
And reactive functional programming (FRP) is a powerful paradigm to process asynchronously big streams of data as well as user input.

Given all these qualities, why isn't more popular?

Very popular languages like C++ or Java are based on OOP, which is easy to grasp: we can relate objects to the real world. So there were a generalization of OOP thinking.
On the other hand, FP comes from lambda calculus, a "formal system in mathematical logic". Ie. it has strong mathematical roots, thus some of its concepts can be quite abstract, and it shows when most people explain its concepts. Combined with strong typing, based on type theory, like in Haskell, we quickly end with abstract concepts with specialized jargon. Plus Haskell, one of the most popular FP languages, has a syntax not intuitive for the uninitiated.

Fortunately, as said, some people extracted some core ideas from FP, and exposed them in easier to understand languages and libraries (see above). This helped in spreading these practices in mainstream programming.

<!-- more -->

## Brief? Pragmatic?

This article is rather long, but only scratches the surface. One can write a [whole book](https://drboolean.gitbooks.io/mostly-adequate-guide/content/) on the topic.
So it is only a **brief overview**. Masters and purists of FP will frown upon many omissions and perhaps inaccuracies. I am not a master and certainly not a purist, and don't plan to be one of the latter. I probably won't complete the article with finer points of FP (monads, etc.) but I will try and fix any inaccuracies that I spot or that are reported.

It is **pragmatic** because I use several FP techniques, as popularized by some libraries or languages, but I don't use the full spectrum of FP possibilities.

## Core concepts

So, what functional programming is about?
As the name implies, like OOP is all about objects, FP is all about functions.
These are first-class citizens: they can be stored in variables and collections, they can be passed as arguments to functions which can return a function. You get the idea...
Note: functions manipulating functions are called _higher-order functions_. I will spray a bit of FP jargon here, for your information; for something more complete, see [Functional programming jargon](https://github.com/hemanth/functional-programming-jargon), an accessible, work-in-progress glossary.

A central idea behind FP is to use _pure_ functions: they must not change the world outside of them. A pure function will always return the same output for a given input. It is called _idempotency_ and _referential transparency_. The later means that if a pure function is called with a constant, it can be replaced with the value it returns.
Of course, a real program has to alter its environment: to take some data, to output some results, perhaps to react to user input.
Pure FP isolates these _side-effects_ in a special concept: _monads_. Which I won't attempt to explain here!
Choosing the pragmatic approach, I tolerate functions with side-effects, but avoid them as much as possible, documenting these side-effects and, ideally, isolating them in specific modules. Which is a good practice for unit tests...

As a consequence, FP favors _immutable_ data. Functions avoid to mutate the data given as input (that would introduce side-effects), but return new data instead.
It might seem inefficient but there are techniques to optimize this practice. Among them, _lazy evaluation_ defers processing until the result is really needed. This is particularly effective when chaining several operations, which is a very common practice in FP, as we will see.

FP doesn't like loops (those made with `for`, `while`, `repeat`, etc. keywords). These are stateful constructs, with one or more loop variables. FP often uses recursion instead, thus purely relying on functions. But to be effective, the language must support _tail-call recursion_ to avoid bloating the call stack. This means that a function returning the result of calling itself can avoid to push a call reference (to return to the calling point) and can instead jump directly into the new call. Yes, that's a kind of goto...
Recursion can be hard to get right, and some languages like Java or JavaScript (up to ES6) don't support tail-call recursion, so it is rarely used outside of specialized usages like iterating on tree or graph nodes.
Fortunately FP offers a wide range of functions to process (or create) collections, which are the most common use case for loops. We will extend on this topic later.

Another important concept in FP is _closures_. When a function returns another function, the inner one (the closure) can use outer variables in its scope. In general, usage is limited to the immediate scope, ie. variables and parameters of the enclosing function. The closure keeps a reference on the content of the used variables at the time the function is returned. We say the inner function _closes_ over these values, hence the closure name.
It is a double edged sword, as these captured values might be mutated (if possible / allowed for the value), introducing state in the function, something that FP avoids...
Let's make an example for this rather abstract concept. I use JavaScript (ES6) here. I make a generic function that can return specialized variants:

```
const adder = (step) =>
{
  return (v) => v + step;
};
// The above is verbose for clarity.
// It can be written:
// adder = step => v => v + step
const plusplus = adder(1);
plusplus(5); // -> 6
const decr = adder(-1);
decr(43); // -> 42
```

Note that a function can have state that doesn't affect its idempotency. A common example in FP is _memoization_. A function with a long computation time (Fibonacci, is prime, etc.) can keep previous results. Thus, if asked again with a previously computed argument, it can just return the previous result. It is particularly effective with functions whose computing of a value is based on results for lower values. The given recursive functions above are good examples.

## Avoiding loops

Since I started to use the FP style of coding in a JavaScript project, using the Lodash library, I no longer use the for loop. Or other forms of loops, which are rarely used anyway.
If you look at the loops in your code, you will see some very common patterns of usage.
`for` loops can be used to iterate an arbitrary number of times to perform an action. Eg. creating objects to put in a collection (or the Dom, etc.).
But most of the time, they are used to iterate on a collection: entries of an array or a list, characters of a string, values of a map or set, etc. "Collection" is used here in the widest sense, data structure that can hold several items in variable number. Tree or graphs are more often explored with recursive functions, but the language / library can offer iterators flattening them with various strategies.

So why do we iterate on these collections?
Sometime, it is to find an item. It can be also to compute a value (sum, average...). Or to process each item, perhaps to transform them into something else. We might want to remove some items, or to process only some items, based on some criteria. Or to process (or extract / remove) only the n first or last items of the list, n being arbitrary on depending on a condition. Other common usage is sorting, removing duplicates, etc.

FP got us covered for all these cases, and more.
The philosophy is similar to the Unix one, which offers lot of small utilities focused on a simple task. They have all a similar interface: accept data on standard input, spit out processed data on standard output, and they are chained via pipes.
FP offers lot of small functions focused on a simple task. They generally take a collection and a function to process each item.
These small functions can be used alone, but they shine when they are chained together. For example, you can take a list, filter out some elements, keep only the unique items and transform the remaining ones, in one operation.
That leads to a rather declarative style of programming (a bit like SQL) which is generally more readable than a bunch of conditions, intermediary variables, sub-loops, etc. that re-implement the same old algorithms...

Contrived example: given an array of numbers, eliminate those below 10, keep only the first five, and sum them.
In a C-like language, that would be something like:

```
var i, v, r, c; // assume they start at zero
for (i = 0; i < values.length; i++)
{
  v = values[i];
  if (v >= 10)
  {
    if (c++ < 5) // beware of off-by-one errors!
    {
      r += v;
    }
    // I forgot else break, a too common error!
  }
}
```

In functional style:

```
var r = chainOn(values)
  .filter(v => v >= 10)
  .take(5)
  .sum();
```

A nearly literal transcription of the requirement! Much more readable: the intent appears immediately.

As said, each function returns a new collection, but a good library does lazy evaluation, deferring process until the end of the chain, building a complex function out of the bricks, generating only one final collection (or none in this example).

## Commonly used functions

Let's take a look at the most common functions (also called _operations_ or even _operators_). For clarity, I give a name to each, but these names can vary, depending on language / library. For example, `reduce` can be named `reduceLeft`, `fold`, `foldLeft`, etc. But their base idea is the same everywhere.
Note that the order of parameters can change, depending on language / library.
Nearly all these operations take a collection as input, and most of them also take a function called on each iteration on the collection, thus named _iteratee_. Or _predicate_ if it returns a boolean.
The parameters given to iteratees vary, but always include the current item. They can also include the index in the array or the key in the map, sometime a reference to the collection itself, etc.
Note: I will use either the term list or array to talk about ordered collections. In some languages they are the same, in others not, but the differences are not relevant for that article.

`forEach` (or `for`, `forAll`, `each`, etc.) is just a functional version of our old `for` loop. It has a `forEachRight` (or `eachRight`, etc.) variant iterating on reverse order.
The advantage of this function is that it can be used at the end of a filter / transform / etc. chain.
It is (should be) used only to produce side-effects for each item: create elements in the Dom, serialize the item, issue a Rest request, etc.
There is a variant, called `tap` or `do`, that can be put in the middle of the chain: it doesn't alter the data but can do side-effects at this point of the processing.

`reduce` (synomyms above) is a fundamental operation: it can be used to do all the other ones. As such, it should be used only in special cases, as more expressive and terser (simpler) operations should be preferred.
It takes three parameters: the collection, the processing function and an initial value.
The iteratee is called with a parameter (named _accumulator_) holding first the initial value, then the value returned in the previous iteration.
The second parameter is the item itself.
The function processes the item and alters the accumulator, then returns the latter.
The initial value / accumulator can be a number, a collection (often empty), etc.
For a number, the function can sum up the values in the accumulator, or store the min or max, etc. It can push or add values in a collection accumulator. Etc.
The `reduce` function returns the final value of the accumulator. It is called thusly because it _reduces_ (or _folds_) the items of a collection to a single value.

`range` allows to create a list of numbers (or characters) between two bounds. This list can be used as an entry point for other functions, thus effectively replacing the numerical `for` loop.

`find` searches the collection and returns the found item, if any (behavior if not found varies with language). The iteratee is a predicate, inspecting the item and telling if that's the right one. If so, it stops there and returns the found item.
A variant for ordered collections, `findIndex`, returns the position of the item instead.
On ordered collections, we can use `findLast` or `findRight`, iterating on the items in reverse order. These suffixes can be found on other operations for lists or similar.

`filter` returns a reduced version of the collection, keeping the items for which the predicate returns true. It has a variant, `reject`, dropping items whose predicate is true.
You might wonder why we have two functions when you just have to invert the condition in the predicate. Actually, we have a number of predefined predicates like `isNumber` or `isEmpty`. So if you want to remove empty arrays (or strings) out of a collection, you can just use `reject(coll, isEmpty)`.
You can also do `filter(coll, negate(isEmpty))`, but the intent is less clear. Still it is a good first example of a function altering the behavior of another function. We will see more later.

Variants on ordered collections allow to keep the first (or last) items, based on a predicate: `takeUntil` keeps items until the predicate is true, `takeWhile` keeps them while the predicate is true. `take` keeps the number of items given as argument.
The `Last` (or `Right`) suffix is applicable. And you can replace `take` with `drop` to keep the other part of the list.
There are specialized variants for one item, a common operation: `first`, `last`, `rest`, `initial` keep or drop the first or last item of a list.

`zip` takes a number of arrays / lists, and returns an array of arrays, where the first one groups the first items of the arrays, the second one holds the second items, etc.
For example, you can make an array of `[ x, y ]` coordinates from an array of `x`s and one of `y`s. Or you can associate items with values of a range.
There is an `unzip` operator doing the reverse operation.

`map` transforms the items of a collection into something else collected in a new collection of same kind. It can be used to transform objects of some type to another type, to extract a value from objects, etc.

`every` or `all` returns true if the iteratee returns true for all the items of the collection.
`some` or `any` returns true if the iteratee returns true for at least one item.

There are lot of other functions, to sort or shuffle an array, to randomly sample some values, to eliminate duplicates, etc.
Explore your library, get familiar with its capacities, to know the palette of tools at your disposal; you can dig more on their usage when you need them.

## Function processing

As we saw, there are functions to alter functions, to alter their signature to something expected.
It eases reusability: you have lot of simple functions, from libraries or your own. You can _compose_ (combine) these functions into more powerful functions.
But sometime, the signature of a function of your palette doesn't fit what is expected in the composition.
You can wrap manually the function to adapt it:
`filter(numbers, function (n) { return !isPrime(n); }`
But it is verbose and tiresome.
Or you can use a higher-order function automatically transforming (wrapping) the function:
`filter(numbers, negate(isPrime));`
This `negate(isPrime)` way of providing a function is called _point-free style_ (or _tacit programming_). This is because the parameters (_points_) are not visible, they are tacit, implicit.
More on this later, but let see other examples first.

Let say we have a `toNumber` function taking a base (2, 10, 16...) and a string to convert. If the base is omitted, it default to 10. We need to convert an array of strings.
We can use `map` for that. If the numbers are hexadecimal, we can write in JS:

numbers = map(hexaStrings, function (s) { return toNumber(16, s); });

A bit verbose (can be better with arrow notation), not very readable.
But we have a JS method named `bind`, or a (simpler) Lodash method named `partial`, that can preset the first parameters of a function.

```
numbers = map(hexaStrings, partial(toNumber, 16));
```

It takes a function with n parameters, and returns a function with less parameters, some of the original parameters being preset.
Such operation is called _partial application_. Or, if only one parameter remains, _currying_. The latter has a special name because it is an important process to help in _function composition_, combining functions to make a complex one.

If the array had decimal numbers in strings, we could use the default value of the base parameter. But the base being the first parameter, we cannot pass it directly to `map`. No problem, we have a function able to reorder the parameters of a function:

```
numbers = map(decimalStrings, rearg(toNumber, [ 1, 0 ]));
```

The second parameter (index 1) becomes the first one, while the first one goes to the second place.
`partial` is better there, but this contrived example aims to show a semi-realistic use case of `rearg`...
But actually, `map` calls the function with two parameters: the value and its index! So we convert the strings to bases 0, 1, 2, etc. Not what it was intended!
Fortunately, there is a function for that™... A function that reduces the number of parameters of a function. This number, BTW, is called _arity_. The function (in Lodash) is called `ary`:

```
numbers = map(decimalStrings, ary(rearg(toNumber, [ 1, 0 ]), 1);
```

Now, it is really less readable but the point was to show we can manipulate functions like we process collections.

Somehow, we can often describe a process with a list of functions / operations: filter, map, sort, uniqueItems, map, take, for example. We could put these in an array, and apply these functions successively. Some languages make an heavy usage of this scheme and have a syntax for these chains of functions.
For this kind of chaining, it is easier if all these functions take only one parameter: the result of one function is fed as argument to the next function. That's why currying is so important.

## Conclusion

As said, I only scratched the surface of the topic, yet I introduced lot of concepts that are useful and practical in daily tasks of your favorite language. Although I admit in some languages like pre-8 Java, the syntax (with anonymous classes) can be a bit heavy.

FP techniques proved to be useful enough that some languages (Java 8 again, JavaScript at ES6 / ES2015) evolved to ease their usage. And lot of new ones integrated them from the start.

I hope this article will give you the will to use (more) these techniques, and perhaps to dig more into it.
