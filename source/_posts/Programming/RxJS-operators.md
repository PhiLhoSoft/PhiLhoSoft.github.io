title: RxJS distributions
description: "RxJS distributions and their operators"
categories:
- Programming
- General
tags:
- Programming
- Functional programming
- Reactive
- JavaScript
- Library
- RxJS
date: 2015-11-15
update: 2015-12-21
---
# RxJS distributions

## Introduction

RxJS has several distributions:
- The Core distribution, with two sub-modules, is a minimal implementation;
- The Main distribution is broken down between a main module and several sub-modules;
- The Lite distribution is similar to the Main one, but with different assignments: it includes a big part of the binding library, and part of the async one, so it is more usable without including other modules;
- The All distribution includes nearly everything, as the name implies.

As this is a bit confusing, I made a table out of the [official doc](https://github.com/Reactive-Extensions/RxJS/tree/master/doc), including all mistakes found in this manually generated doc, some of which I point out here, to help tracking them down.

## The distributions

Numbers are size in KB of .min.js as of 4.0.6 around October 2015. To be used only as comparison between versions.
The file names with + are not in the documentation, I found them after installing RxJS. I guess they come from v.4, and that the doc is still about v.3.

The complete library:

    rx.all.js	A	139

Lite Libraries:

    rx.lite.js	L	81
    rx.lite.aggregates.js	LAg	17
    rx.lite.async.js	LAs	4
    rx.lite.backpressure.js +		4
    rx.lite.coincidence.js	LCo	7
    rx.lite.experimental.js	LXp	8
    rx.lite.extras.js	LEx	10
    rx.lite.joinpatterns.js	LJp	5
    rx.lite.testing.js	LTe	7
    rx.lite.time.js	LTi	9
    rx.lite.virtualtime.js	LVt	4

Main Libraries:

    rx.js	R	72
    rx.aggregates.js	RAg	16
    rx.async.js	RAs (needs RBi)	7
    rx.backpressure.js +		8
    rx.binding.js	RBi	7
    rx.coincidence.js	RCo	7
    rx.experimental.js	RXp	8
    rx.joinpatterns.js	RJp	5
    rx.sorting.js +		3
    rx.testing.js	RTe (needs RVt)	7
    rx.time.js	RTi	16
    rx.virtualtime.js	RVt	4

Core Libraries:

    rx.core.js	C	15
    rx.core.binding.js	CBi	10
    rx.core.testing.js	CTe	14

## Included Observable Operators

### Observable Methods

    amb	A	LEx	R
    case	A	LXp                                     RXp
    catch	A	L                                       R
    concat	A	L                                       R
    create	A	L	R	C
    defer	A	L                                       R
    empty	A	L                                       R
    for	A	LXp                                     RXp
    forkJoin	A	LXp                                     RXp
    from	A	L                                       R
    fromArray	A	L                                       R
    fromCallback	A	L                                       RAs
    fromEvent	A	L                                       RAs
    fromEventPattern	A	L                                       RAs
    fromNodeCallback	A	L                                       RAs
    fromPromise	A	L                                       RAs (4)
    generate	A	LEx                                     R
    generateWithAbsoluteTime	A	LTi                                     RTi
    generateWithRelativeTime	A	LTi                                     RTi
    if	A	LXp                                     RXp
    interval	A	L                                       RTi
    just	A	L                                       R
    merge	A	L                                       R
    mergeDelayError	A	L                                       R
    never	A	L                                       R
    of	A	L                                       R
    ofArrayChanges	A
    ofWithScheduler	A	L                                       R
    onErrorResumeNext	A	LEx                                     R
    pairs	A	L                                       R
    range	A	L                                       R
    repeat	A	L                                       R
    return	A	L                                       R
    spawn	A	LAs                                     RAs
    start	A	LAs                                     RAs
    startAsync	A	LAs                                     RAs
    throw	A	L                                       R
    timer	A	L                                       RTi
    toAsync	A	LAs                                     RAs
    toPromise		                                        RAs
    using	A	LEx
    when	A	LJp                                     RJp
    while	A	LXp                                     RXp
    wrap	A	                                        RAs
    zip	A	L                                       R

### Observable Instance Methods (prototype) (! marks functions also on object)

    aggregate	A	LAg	RAg
    all	A	LAg                                     RAg
  ! amb	A	LEx                                     R
    and	A	LJp                                     RJp
    any	A	LAg                                     RAg
    asObservable	A	L                                       R
    average	A	LAg                                     RAg
    buffer	A	LCo                                     RCo
    bufferWithCount	A	LEx                                     R
    bufferWithTime	A	LTi                                     RTi
    bufferWithTimeOrCount	A	LTi                                     RTi
    catch !	A	L                                       R
    combineLatest	A	L                                       R
    concat !	A	L                                       R
    concatAll	A	                                        R
    concatMap	A	L                                       R
    connect	A	L	RBi	CBi
    controlled	A
    count	A	LAg                                     RAg
    debounce	A	L                                       RTi
    defaultIfEmpty	A	L                                       R
    delay	A	L                                       RTi
    delaySubscription	A	LTi                                     RTi
    dematerialize	A	L
    distinct	A	LEx                                     R
    distinctUntilChanged	A	L                                       R
    do	A	L                                       R
    doOnNext	A	L                                       R
    doOnError	A	L                                       R
    doOnCompleted	A	L                                       R
    doWhile	A	LXp                                     RXp
    elementAt	A	LAg                                     RAg
    every	A	LAg                                     RAg
    expand	A	LXp                                     RXp
    extend	A	LXp                                     RXp
    filter	A	L                                       R
    finally | ensure	A	L                                       R
    find	A	LAg                                     RAg
    findIndex	A	LAg                                     RAg
    first	A	LAg                                     RAg
    flatMap	A	L                                       R
    flatMapFirst	A	LXp                                     RXp
    flatMapLatest	A	L                                       R
    flatMapObserver	A	                                        R
    flatMapWithMaxConcurrent	A	LXp                                     RXp
    forkJoin !	A	LXp                                     RXp
    groupBy	A	LCo                                     RCo
    groupByUntil	A	LCo                                     RCo
    groupJoin	A	LCo                                     RCo
    ignoreElements	A	L                                       R
    includes	A	LAg (5)                                 RAg (3)
    indexOf		LAg                                     RAg
    isEmpty	A	LAg                                     RAg
    join	A	LCo                                     RCo
    last	A	LAg                                     RAg
    lastIndexOf	A	LAg                                     RAg
    let	A	LXp                                     RXp
    manySelect	A	LXp                                     RXp
    map	A	L                                       R
    max	A	LAg                                     RAg
    maxBy	A	LAg                                     RAg
    merge !	A	L                                       R
    mergeAll	A	L                                       R
    min	A	LAg                                     RAg
    minBy	A	LAg                                     RAg
    multicast	A	L
    observeOn	A	LEx                                     R
    onErrorResumeNext	A	LEx                                     R
    pairwise	A	LCo                                     RCo
    partition	A	LCo                                     RCo
    pausable	A	(L)
    pausableBuffered	A
    pluck	A
    publish	A	L	RBi	CBi
    publishLast	A	L	RBi	CBi
    publishValue	A	L	RBi	CBi
    refCount	A	L	RBi	CBi
    reduce	A	LAg                                     RAg
    repeat	A	L                                       R
    replay	A	L	RBi	CBi
    retry	A	L                                       R
    retryWhen	A	L                                       R
    sample	A	L & LTi                                 RTi
    scan	A	L                                       R
    select	A	L                                       R
    selectConcat	A	L                                       R
    selectMany	A	L                                       R
    selectManyObserver	A
    sequenceEqual	A	LAg                                     RAg
    selectSwitch		L                                       R
    selectSwitchFirst		LXp                                     RXp
    selectWithMaxConcurrent		LXp                                     RXp
    share	A (1)		RBi	CBi
    shareLast			RBi	CBi
    shareReplay	A (1)		RBi	CBi
    shareValue	A (1)		RBi	CBi
    single	A	LAg                                     R & RAg
    singleInstance	A	L	RBi	CBi
    skip	A	L                                       R
    skipLast	A	L                                       R
    skipLastWithTime	A	LTi                                     RTi
    skipUntil	A	L                                       R
    skipUntilWithTime	A
    skipWhile	A	L                                       R
    slice	A	LAg                                     RAg
    some	A	LAg                                     RAg
    startWith	A	L                                       R
    subscribe | forEach	A	L                                       R
    subscribeOn	A	LEx                                     R (2)
    subscribeOnNext		L                                       R
    subscribeOnError		L                                       R
    subscribeOnCompleted		L                                       R
    sum	A	LAg                                     RAg
    switch | switchLatest	A	L                                       R
    switchFirst	A
    take	A	L                                       R
    takeLast	A	L                                       R
    takeLastBuffer	A	LEx
    takeLastBufferWithTime	A	LTi                                     RTi
    takeLastWithTime	A	LTi                                     RTi
    takeUntil	A	L                                       R
    takeUntilWithTime	A
    takeWhile	A	L                                       R
    tap	A	L
    tapOnNext	A	L
    tapOnError	A	L
    tapOnCompleted	A	L
    thenDo		LJp                                     RJp
    throttle	A	L                                       RTi
    timeInterval	A	LTi                                     RTi
    timeout	A	L & LTi                                 RTi
    timeoutWithSelector		LTi
    timestamp	A	L & LTi                                 RTi
    toArray	A	L                                       R
    toMap		LAg                                     RAg
    toPromise ?		L
    toSet		LAg                                     RAg
    transduce		L                                       R
    where	A	L                                       R
    window	A	LCo                                     RCo
    windowWithCount	A	LEx                                     R
    windowWithTime	A	LTi                                     RTi
    windowWithTimeOrCount	A	LTi                                     RTi
    withLatestFrom	A	L                                       R
    zip !	A	L                                       R
    zipIterable	A	L                                       R

## Included Classes

### Core Objects

    Rx.Observer	A	L	R	C
    Rx.Observable			R	C
    Rx.Notification	A	L	R	CTe

### Subjects

    Rx.AsyncSubject	A	L	R	CBi
    Rx.BehaviorSubject		L	RBi	CBi
    Rx.ReplaySubject		L	RBi	CBi
    Rx.Subject	A	L	R	CBi

### Schedulers

    Rx.Scheduler	A	L	R	C
    Rx.TestScheduler		LTe	RTe	CTe
    Rx.VirtualTimeScheduler		LVt	RVt	CTe
    Rx.HistoricalScheduler		LVt	RVt

### Disposables

    Rx.CompositeDisposable	A	L	R	C
    Rx.Disposable	A	L	R	C
    Rx.RefCountDisposable	A	L	R
    Rx.SerialDisposable	A	L	R	C
    Rx.SingleAssignmentDisposable	A	L	R	C

### Testing classes

    Rx.ReactiveTest		LTe	RTe	CTe
    Rx.Recorded		LTe	RTe	CTe
    Rx.Subscription		LTe	RTe	CTe
    Rx.TestScheduler (see Schedulers above)


(XYz): not in the lists, but found in the description of the operator.
(1): Out of order in the list at https://github.com/Reactive-Extensions/RxJS/blob/master/doc/libraries/main/rx.complete.md
Also some methods / classes are not in All?
(2): Out of order in the list at https://github.com/Reactive-Extensions/RxJS/blob/master/doc/libraries/main/rx.md
(3): Out of order in the list at https://github.com/Reactive-Extensions/RxJS/blob/master/doc/libraries/main/rx.aggregates.md
(4): Not in https://github.com/Reactive-Extensions/RxJS/blob/master/doc/libraries/main/rx.async.md
(5): Out of order in the list at https://github.com/Reactive-Extensions/RxJS/blob/master/doc/libraries/lite/rx.lite.aggregates.md

?ts=40 if fixed width, ?ts=64 otherwise
