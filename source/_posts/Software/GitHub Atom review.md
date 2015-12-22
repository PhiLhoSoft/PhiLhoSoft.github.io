title: GitHub Atom review
description: a review of the GitHub Atom editor (IDE), at version 1.3.2
categories:
- Software
- IDE
tags:
- Software
- Tool
- IDE
date: 2015-12-15 10:40:00
updated: 2015-12-19 09:16:00
---

# GitHub Atom review

"A hackable text editor for the 21st Century"

https://atom.io/

{% img /images/Atom_logo.png "'Atom logo'" "'Atom'" %}

## Disclaimer

I came to Atom with a prejudice...
The long closed-source / beta period, the fact the "hackable" editor isn't coded in JavaScript but in CoffeeScript, the need to add plugins for everything (according to some reviews), the reported slowness and memory hungriness, made me to hesitate to try it... I was also a happy user of [Adobe Brackets](/Software/Adobe%20Brackets%20review), with no compelling need to change.
But, Brackets accumulated a number of little annoyances, making me wanting to try other editors.
The test of Visual Studio Code was brief, as it didn't have the base (semi-advanced if you want) features I use all the time: drag'n'drop of code, and column selection.
So I tested Atom, with a critical eye. Spoiler: I was seduced, and it becomes my favorite Web IDE...

That's the problem with information found on Internet: it quickly becomes stale...
The Atom team improved memory consumption, have an eye on responsiveness (I was impressed by their TimeCop package, and the fact they report for each package the time they add to loading), ship lot of plugins with the base editor: delegating to packages is part of their vision of modularity, but they made official packages for the most essential features, and you don't need to hunt every package implementing base features, saving time.

I appreciate the clean interface and the attention to details they have bring to the project.

<!-- more -->

## Quick review

I downloaded the installer. It is big! Of the IDEs I tried, it is among the biggest:

| Name	|	Version	|	Size |
| ----- | --------- | ------ |
| Brackets	|	1.5	|	37 MB |
| Visual Studio Code	|	0.10.3	|	43 MB |
| Light Table	|	0.7.2	|	48 MB |
| Atom	|	1.3.1	|	88 MB |
| WebStorm	|	9	|	140MB |

I installed Atom (v. 1.3.1 on Windows 7 with 8 GB of memory).
It doesn't ask where to install, it goes arbitrarily at `C:\Users\<user name>\AppData\Local\atom`. I would prefer to install it beside my other programs, to locale it easily. And I would appreciate it asks me before installing something on the desktop (I have no icons there!) or on the start menu (I no longer care about this one, but still...).
It is a bit "all over the place", as it also has a `C:\Users\<user name>\AppData\Roaming\Atom` folder (for cache?), and a `C:\Users\<user name>\.atom folder` (settings, packages...).

I opened it, it starts rather quickly.
It has a dark UI, which I don't like, but I quickly found where to change this to the default light theme. Good point than several themes are bundled by default: no need to hunt for them, at least at start. The default light UI theme is rather nice. I also chose the _One Light_ syntax theme among four. A bit too pale (low contrast) for my taste, I will eventually see if I can tweak it.

As I feared (I searched a bit before, given the Visual Studio Code deception), drag'n'drop of code isn't available out of the box. Actually, I saw several plugins activating it. That's one of the problems with this editor: there is a plethora of plugins, which can be nice, but it is confusing to choose one... And I still think such feature should be built-in in the editor.
Same for column (rectangular) selections! Later, I found out Atom supports out of the box column selection (Ctrl+Alt+Up / Down, extend only, allows rectangular selection with Shift+Left / Right) and multiple carets (Ctrl+click).
I find a bit unsettling to have to install lot of plugins to get base editor features. I have the same issue with Brackets, but it has at least these two features built-in (but D'n'D must be activated by a setting).
That said, I found several features out of the box for which I had to install a plugin in Brackets:

- Jump to matching brace (bracket / parenthesis);
- Gutter selection of lines;
- Show whitespace / end of lines / indentation guides / right margin;
- Selection to upper / lower case; and some more.
- Change text in selection only; regular expressions for searching; limit searches to word only (something I rarely use but which is sometime useful).

Two features I mentioned in the above article are also missing from Atom:

- Auto-fill of search field with text under caret (text has to be selected; Ctrl+D selects the current word, but I assign it to duplicate line instead; at least, it memorizes the last search);
- Recall previous searches / replacements (something that SciTE (my all-purpose lightweight text editor of choice) does, which I find convenient);

OK, I switched to Atom to type this text (in Markdown format). Good surprise: it has spell checking enabled out of the box. And it can suggest words, although I am not sure of the logic of suggestions (scanning existing buffers, apparently; nice point: it is not obtrusive). Little bug (or unwanted feature ;-) -- I see a misspelled word in the text (red underline), I right-click directly on it, and choose Correct spelling. It does nothing... I found out I have to left-click first on the word to get spelling suggestions.
I see no way to add words to a user dictionary (there is an issue for that, and another for other language dictionaries).

The Welcome Guide is nice, I just saw a way to customize the styling. Although it lacks concrete examples: eg. how do I change the color of titles in Markdown? (I avoid reddish colors, reserved to mark errors). Ah, I suppose I have to study an existing style, like https://github.com/atom/atom-light-syntax/blob/master/index.less
And I can see the actual styles by showing the developer tools (View > Developer > Toggle Developer Tools) and using it like Chrome DevTools.
Also a bug: I have _Choose a Theme_ and _Customize the Styling_ opened, I can't scroll back above _Install a Package_. I have to close one to see the top!

Another bug or unwanted feature: it ensures there is an empty line at the end of a file when saving it, which can be nice (I generally want that), but if I have several lines, it removes the extra ones (which is annoying in a text file, because I want to keep my future paragraph empty lines). Will see if I can disable that.

Undo coalescing is a bit strange: when I type a word, then undo, it removes parts of the word, successively, instead of whole word.
Apparently, it coalesces when there is a pause in typing. Half a good idea, bad for slow typists (not sure if this can be tweaked), not consistent. I prefer Scintilla's coalescing, based on keys: when an move key (eg. arrow) is typed, or when clicking somewhere.

Atom lacks a nice feature of Brackets: in an HTML file, Brackets can auto-complete the path of a resource (script, CSS file, etc.). Found a plugin for that, of course... Although it is slightly less convenient.

Apparently, Atom has only "duplicate-lines", not "duplicate-selection", alas. Sometime, I want to duplicate the selection inside the same line, eg. to quickly add an additional parameter with its type.

Annoyance: I can hit Ctrl+F in the Settings > Package page (for example), but it doesn't find anything there (can be convenient to find a given package by something else than its name).

Command palette: good idea to highlight searched terms, but on light theme, I get light gray highlight, nearly unreadable on very light gray background...

Minor quibble: title and closing cross in inactive tabs are one or two pixels too low (one pixel lower than the active tab, at least). It "hurts" my sense of tidiness... :-)

## Installed packages

Good point: once a plugin / package is installed, no need to restart Atom to get it working.

- Sublime Style Column Selection
Allow column selection with mouse.
1.3.0 by bigfive
https://atom.io/packages/Sublime-Style-Column-Selection
https://github.com/bigfive/atom-sublime-select

- simple-drag-drop-text
Enable classical drag'n'drop of text, with move (by default) or copy (with Ctrl).
0.3.0 by mark-hahn
https://atom.io/packages/simple-drag-drop-text
https://github.com/mark-hahn/simple-drag-drop-text

- keyboard-localization
Must have if you have a non-US keyboard; eg. a French one: I can't type } nor ] because I have to use AltGr (ie. RightCtrl+RightAlt) to reach them, and this makes interference with some Ctrl+Alt shortcuts.
1.4.112 by andischerer
https://atom.io/packages/keyboard-localization
https://github.com/andischerer/atom-keyboard-localization

- minimap
Visual miniature representation of the content of the editor. Allows quick navigation.
4.18.0 by atom-minimap
https://atom.io/packages/minimap
https://github.com/atom-minimap/minimap

- markdown-mindmap
Shows headings of a Markdown text as a mindmap, allows to navigate.
0.2.4 by dundalek
https://atom.io/packages/markdown-mindmap
https://github.com/dundalek/atom-markdown-mindmap

- highlight-selected
When a selection is done, corresponding words (must be whole words) in the same buffer are highlighted as well.
0.11.1 by richrace
https://atom.io/packages/highlight-selected
https://github.com/richrace/highlight-selected

- minimap-highlight-selected
Shows highlights by the previous package in the minimap.
4.3.1 by atom-minimap
https://atom.io/packages/minimap-highlight-selected
https://github.com/atom-minimap/minimap-highlight-selected

- autocomplete-paths
Autocompletion for paths in the project, according to file system. With patch https://github.com/atom-community/autocomplete-paths/pull/51/files applied manually...
1.0.2 by atom-community
https://atom.io/packages/autocomplete-paths
https://github.com/atom-community/autocomplete-paths

- autoclose-html
Automatically close HTML tags.
0.19.0 by mattberkowitz
https://atom.io/packages/autoclose-html
https://github.com/mattberkowitz/autoclose-html

- toggle-quotes
Keyboard shortcut to switch between single and double quotes on the string the caret is in.
1.0.0 by atom
https://atom.io/packages/toggle-quotes
https://github.com/atom/toggle-quotes

- linter
Engine allowing to display lint information in real time in the editor. Need plugins for various languages.
1.11.3 by atom-community
https://atom.io/packages/linter
https://github.com/atom-community/linter

- linter-eslint
Linter for JavaScript.
5.2.6  by AtomLinter
https://atom.io/packages/linter-eslint
https://github.com/AtomLinter/linter-eslint

- linter-htmlhint
Linter for HTML.
0.2.1 by AtomLinter
https://atom.io/packages/linter-htmlhint
https://github.com/AtomLinter/linter-htmlhint

- linter-csslint
Linter for CSS.
1.1.0 by AtomLinter
https://atom.io/packages/linter-csslint
https://github.com/AtomLinter/linter-csslint

- linter-sass-lint
Linter for Sass.
0.4.3 by DanPurdy
https://atom.io/packages/linter-sass-lint
https://github.com/DanPurdy/linter-sass-lint

- pigments
Shows colors from various CSS notations (including named and computed colors). I prefer to display them as circles after the color definition.
0.19.3 by abe33
https://atom.io/packages/pigments
https://github.com/abe33/atom-pigments

- atom-beautify
Beaufity code, according to given rules. Not for my code (I always format as I want) but for foreign code pasted in mine...
0.28.19 by Glavin001
https://atom.io/packages/atom-beautify
https://github.com/Glavin001/atom-beautify

- file-icons
Add icons (depending on file type) in the tree view on the left.
1.6.13 by DanBrooker
https://atom.io/packages/file-icons
https://github.com/DanBrooker/file-icons

- atom-easy-jsdoc
JSDoc generation.
4.2.0 by tgandrews
https://atom.io/packages/atom-easy-jsdoc
https://github.com/tgandrews/atom-easy-jsdoc

- string-looper
Change word case, number value and loop between keywords with the arrows of your keyboard.
0.1.2 by leny
https://atom.io/packages/string-looper
https://github.com/leny/atom-string-looper

- sync-settings
Synchronization of Atom settings across computers.
0.6.0 by Hackafe
https://atom.io/packages/sync-settings
https://github.com/Hackafe/atom-sync-settings

- rest-client
Simple Rest client to generate requests to servers.  Complement of RestClient on Firefox, Postman in Chrome.
0.5.0 by ddavison
https://atom.io/packages/rest-client
https://github.com/ddavison/rest-client

- atom-perforce
Support of the Perforce VCS (I use it at work). Has [problems on Windows](https://github.com/mattsawyer77/atom-perforce/issues/46), I fixed (some of) them.
1.7.0 by mattsawyer77
https://atom.io/packages/atom-perforce
https://github.com/mattsawyer77/atom-perforce

## Not used, to see later

- test-jumper
To jump between main file and its unit test. Not used because it can't seem to fit in our project layout... Still interesting.
0.5.0 by danielcooper
https://atom.io/packages/test-jumper
https://github.com/danielcooper/test-jumper

- tree-ignore
Allows to ignore paths in the project. Installation failed silently (not mentioning an error; I see the error when going to _Packages_), I had to go to the console of the DevTools to see the errors. Apparently, an issue with node-gyp on Windows. So I just use the Ignored Names setting for all projects.
0.2.6 by leny
https://github.com/leny/atom-tree-ignore

# Themes

- gl-light-syntax
2.1.1 by gouvinb
https://atom.io/themes/gl-light-syntax
https://github.com/gouvinb/gl-light-syntax/tree/master/styles/languages

- naturerainbow-light-syntax
0.1.0 by fthiagogv
https://atom.io/themes/naturerainbow-light-syntax
https://github.com/fthiagogv/naturerainbow-light-syntax
