title: Ceylon strong selling points
description: "Some strong selling points of Ceylon"
categories:
- Programming
- Ceylon
tags:
- Ceylon
- Programming
- Language
date: 2014-10-14 18:20
updated: 2016-04-23 14:40
---

# Ceylon strong selling points

Note: this is a draft, based on a Google+ message I made years ago.

<!-- more -->

I am only a beginner with this language, so I recommend to take a look at the Quick Introduction [1] and Tour of the language [2] to have a better, less subjective and more accurate overview.

Here is my take:
- Its syntax is C-like, close of Java, without exotic operators... ;-) Likewise, interface / abstract class / classes / inheritance / generics are close of Java, remains familiar.
- Visibility rules are simpler than in Java. It allows top-level functions (at module level).
- It compiles to the JVM (bytecode) and to JavaScript, with interoperability with both universes.
- No primitives, everything is an object, the compiler can optimize integer / float / characters / etc. to their platform equivalent.
- Multiline strings with interpolation.
- Iterables and Sequences are also first-class entities, with literals.
- It has a strong yet flexible typing, with union and intersection of types, and type inference. Full support of variance (co-, contra-, in-).
- Mixins: interfaces can have implementations, but no context / state. So they have only pure functions.
- An awesome feature is null safety, enforced by the compiler itself: the language doesn't have a concept of NullPointerException, because the compiler forces you to test for nullity (existence of value, more precisely) if you told it your variable can be null. At work, we use FindBugs to check this in Java, but it goes with lot of ceremony and has holes...
- By default, values are immutable, variable identifiers must be marked as such explicitly.
- Functions are first-class entities, can be stored in variables and collections, passed as parameters and returned, etc.
- Named parameters, default values, flexible syntax allowing declarative object instantiation.
- Simplified accessors: we generally do direct access to (public / shared) members, we can override with getters and setters without breaking the API if we need to change the implementation.
- for comprehensions for generating or processing iterables.
- Range literal and processing.
- Operator overloading, with strict rules.
- Capability to rename imported classes; type aliases.
- The IDE is quite good (Eclipse plugin), with auto-completion, refactoring, etc.

[1] http://ceylon-lang.org/documentation/1.0/introduction
[2] http://ceylon-lang.org/documentation/1.0/tour
