title: Functional Reactive Programming
description: "Tutorial about the functional reactive programming paradigm, using RxJS as illustration"
categories:
- Programming
- General
tags:
- Tutorial
- Programming
- Functional programming
- Reactive
- JavaScript
- Library
- RxJS
date: 2015-11-10
---

# Functional Reactive Programming

FRP is a way to deal with events and asynchronous data in a functional style.
Basically, it is an implementation of the Observer design pattern, dealing with streams of data coming on a timeline.

## Concept

We saw, in the article about [functional programming](/Programming/Functional%20programming%20introduction/), powerful ways to process iterable data, by composing functions, with lazy evaluation able to deal with infinite data, etc.
FRP does the same, but applied to streams of events, which introduces a new dimension: time.
Events can be seen as some data coming at a given point in time.
Data might come from user interaction: a keyboard key is pressed or released, the mouse moves, is pressed, dragged, released, etc.
Data can also come from a server, after an asynchronous request. File system requests (asynchronous reading of file in Node.js, for example) are similar.
It can also be a timer, delivering a timeout once or regularly.
It can even come from static data (eg. content of an array): in this case, time is "now".

<!-- more -->

<aside class="article-wip">
<img class="no-fancybox" src="/images/Work-in-Progress.svg" width=240 height=110 title="Work in Progress" alt="Work in Progress"/>
This is a work in progress: this article is unfinished and will be updated.
</aside>

In his seminal article [The introduction to Reactive Programming you've been missing](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754), Andre Staltz wrote the 'mantra': "Everything is a stream".
It looks like a golden hammer seeing the world as nails to hit... I prefer the less slogan-like "Everything can be seen as a stream", or perhaps even more accurately, "Everything can be put in a stream".
After all, a stream is just a sequential collection (succession) of items disposed along a time axis, ie. with a timestamp.
It can be applied in the real world, from trains coming to a station to persons at a <guichet>. Even the only time one person went to a concert can be seen as a stream... with only one item.

So streams are a way to model "the world" from the point of view of moments in time, ordered along the time axis.

## Implementations

### Disclaimer

Purists of the FRP concept, those having coined the term, claim that the implementations I talk about here are not really FRP.

Let's agree on that and say that what we call FRP here is just a bastadized, simplified, with pragmatic compromizes, that happens to use the same term, because it is just convenient...

### JavaScript

FRP has been implemented in various languages, particularly in functional languages like Haskell where it is a good fit to their paradigms. But it can be found also in Java, Scala, C#, etc.
It is quite popular in JavaScript, quite functional in nature, where it solves a number of hard problems: avoiding callback hell (chained asynchronous calls), easing usage of promises and timeouts, handling successions of user input, etc.
Thus we saw lot of FRP libraries to be created. RxJS is among the firsts. Bacon was created in reaction to the complexity of the former, Kefir was born because Bacon is slow and memory hungry, More.js is yet another library, etc.
The [RxJS book](http://xgrommx.github.io/rx-book/index.html) lists a number of them in its [Similar libraries](http://xgrommx.github.io/rx-book/content/resources/similar_libraries/index.html) page.

The principles explained here can be applied to different languages and libraries, but to avoid being too abstract, I will give examples in JS, using a specific library.

### RxJS

I briefly explored some of the JS libraries, but finally settled on RxJS: it is one of the most complete implementation, it is backed by a corporation instead of being an experiment from an individual, it has good docs and good tutorials.
Another advantage: its API has been defined by the [ReactiveX](http://reactivex.io/) project, and it has been implemented in lot of languages: Java, C#, C++, Ruby, Python, Swift, and many JVM languages (often via RxJava). Plus some independently developped implementations, like Rx.PHP.
So once you know the API for a language, using it in another language is rather trivial, needing mostly minor adaptations.
One downside of RxJS is its size: it is a large API, so there is lot to learn, and the library is quite big, which can be annoying if you want a lean application (eg. for using on mobile devices).
That said, a large part of the API can be ignored at first, a beginner needs to know only a few functions (called _operators_ in RxJS).
Moreover, the API has been split in various packages: the Core libraries contains only the vital minimum for Rx. The Lite libraries and the Main libraries have a base file with the objects and the essential operators, and other files splitted by theme: aggregates, async, time, etc. The difference between Main and Lite resides in the way the operators are grouped.
The point is that a project can include only a base file, and add additional ones if a specific operator is needed. This can reduce the amount of code to include in a page.
Or, for experimentations and convenience, just include the `rx.all.js` file and be done.

RxJS calls stream "sequences", and since the point is to observe them and to react on what they content, they call them "observable sequences". Older documents called them just "observables", a bit ambiguous, so they adopted the longer term. I might still use the "stream" term too.

## Creating a stream

You can create an Observable from scratch, but in most case, you just use one of the adaptors wrapping common JavaScript entities in an observable sequence.

### Wrapping in a stream



### Creating from scratch

You can create a new instance of the `Rx.Observable` object.

## Subscribing to a stream

By subscribing to a stream, you create an Observer, which is, most of the time, a Disposable, which can clean up the observed resource automatically or on demand.

### Hot and cold
