title: Git .gitignore rules
description: Exploration of some points of .gitignore rules
categories:
- Software
- Development tools
tags:
- Software
- Tool
- Command line
- Git
date: 2016-01-08 11:34:00
---

# Git .gitignore rules

{% img /images/Git_logo.png "'Git logo'" "'Git'" %}

The rules are defined in http://git-scm.com/docs/gitignore
I won't repeat them here, nor test them all. I will only explore some corner cases, not well explained in the said document...

<!-- more -->

## Test

List all candidates to tracking with `git status -u`.
x means 'shown by status', empty means 'ignored'.

|		|	`foo`	|	`/foo`	|	`foo/`	|	`f*`	|	`f*/`	|	`*.y`	|	`foo/c.x`	|	`foo/*.y`	|	`**/foo/*.y`	|
|---|---|---|---|---|---|---|---|---|---|
|	`bar/b.y`	|	x	|	x	|	x	|	x	|	x	|		|	x	|	x	|	?	|
|	`bar/foo/a.y`	|		|	x	|		|		|		|		|	x	|	x?	|		|
|	`bar/foo/c.x`	|		|	x	|		|		|		|	x	|	?	|	x	|	?	|
|	`bar/foo/d.y`	|		|	x	|		|		|		|		|	x	|	x?	|		|
|	`baz/f.y`	|	x	|	x	|	x	|		|	x	|		|	x	|	x	|	?	|
|	`baz/foo`	|		|	x	|	x	|		|	x	|	x	|	x	|	x	|	?	|
|	`baz/nf.x`	|	x	|	x	|	x	|	x	|	x	|	x	|	x	|	x	|	x	|
|	`foo/a.x`	|		|		|		|		|		|	x	|	x	|	x	|	x	|
|	`foo/b.y`	|		|		|		|		|		|		|	x	|		|		|
|	`foo/c.x`	|		|		|		|		|		|	x	|		|	x	|	x	|

A bit surprised by the `foo/c.x` and `foo/*.y` patterns, I can't see in the doc where they say that a pattern with slash and joker is anchored to top.
The last one is probably barely legal. One should keep things simple...
Now, let's see the combination of exclude and re-include.

|		|	`foo`	|	`bar `(1)	|	`bar`	|	`bar/*`	|	`bar/foo/*`	|	`bar/foo/*`	|
|---|---|---|---|---|---|---|
|		|	`!bar/foo`	|	`!bar/foo`	|	`!bar/foo/*`	|	`!bar/foo`	|	`!bar/foo/c.x`	|	`!bar/foo/*.y`	|
|	`bar/b.y`	|	x	|		|	x?	|		|	x	|	x	|
|	`bar/foo/a.y`	|		|		|	x	|	x	|		|	x	|
|	`bar/foo/c.x`	|		|		|	x	|	x	|	x	|		|
|	`bar/foo/d.y`	|		|		|	x	|	x	|		|	x	|
|	`baz/f.y`	|	x	|	x	|	x	|	x	|	x	|	x	|
|	`baz/foo`	|		|	x	|	x	|	x	|	x	|	x	|
|	`baz/nf.x`	|	x	|	x	|	x	|	x	|	x	|	x	|
|	`foo/a.x`	|		|	x	|		|	x	|	x	|	x	|
|	`foo/b.y`	|		|	x	|		|	x	|	x	|	x	|
|	`foo/c.x`	|		|	x	|		|	x	|	x	|	x	|

(1) and `/bar` and `bar/`

I was confused by the re-include behavior, the post at http://stackoverflow.com/questions/2820255/how-do-negated-patterns-work-in-gitignore clarified the issue.
We need to add a joker to the exclude path so that re-include paths are examined.
Recursively:

|		|	`bar/*`	|	`bar/foo/*`	|	`bar/foo/*`	|	`bar/*`	|	`bar/foo/*`	|
|---|---|---|---|---|---|
|		|	`!bar/foo`	|	`!bar/foo/c.x`	|	`!bar/foo/*.y` (2)	|	`!bar/foo`	|	`!bar/foo/*.y`	|
|		|		|		|		|	`bar/foo/*`	|	`!bar/foo/zab/	`|
|		|		|		|		|	`!bar/foo/zab`	|	`bar/foo/zab/*`	|
|		|		|		|		|		|	`!bar/foo/zab/*.y`	|
|	`bar/b.y`	|		|	x	|	x	|		|	x	|
|	`bar/foo/a.y`	|	x	|		|	x	|		|	x	|
|	`bar/foo/c.x`	|	x	|	x	|		|		|		|
|	`bar/foo/d.y`	|	x	|		|	x	|		|	x	|
|	`bar/foo/zab/e.x`	|	x	|	x	|		|	x	|		|
|	`bar/foo/zab/f.y`	|	x	|		|		|	x	|	x	|

(2) and `!bar/foo/**/*.y` and `!bar/foo/zab/*.y`
