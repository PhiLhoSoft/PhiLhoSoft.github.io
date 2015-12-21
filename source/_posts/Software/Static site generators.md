title: Static Site Generators
description: "Making of this site"
categories:
- Software
- Tools
tags:
- Site generation
- Software
- Tool
- Web
- Blog
date: 2015-11-15
---

# Static site generator

So I want to write some new technical articles (like this one...) on my latest discoveries.
My previous host keeps [my old site](http://Phi.Lho.free.fr) but has cut my FTP access, so I cannot update or add new stuff.

<!-- more -->

<aside class="article-wip">
<img class="no-fancybox" src="/images/Work-in-Progress.svg" width=240 height=110 title="Work in Progress" alt="Work in Progress"/>
This is a work in progress: this article is unfinished and will be updated.
</aside>

## Static

I found out that GitHub Pages might be a good free host for technical content, but it won't allow a blog / CMS software (like WordPress) to run on it.
Of course, it has Jekyll, but I wasn't seduced: the syntax is so-so (for me), it is a Ruby tool (slow and I have no control over it), etc.
But it was a hint: no need for a full fledged blog software generating pages from scratch on each user request: these pages are mostly static so they can be coded once and for all, like I did in the previous century...
The most dynamic parts are the back-office, which I can live without, and managing user comments (with spam control). For the latter, I saw most solutions just use Disqus, a cross-platform comment service relying only on JS (and the related site / cloud host), so needing no server-side script or database. And I already use it (as a commenter), so it looks like the way to go.

So I need something more flexible, and / or something I could hack into my needs.

## Listings

A quick research shown, via two sites ([Top Open-Source Static Site Generators - StaticGen](https://www.staticgen.com/) and [Static Site Generators](https://staticsitegenerators.net/)) that there is literally a ton of static site generator softwares.
Note / strong hint for those making such software: if you don't have a site to show of| what your tool can do, you are doing it wrong. No need to pay for a domain name, you can host it on a free site like GitHub.io or similar.

## Hugo

I first tried [Hugo](http://gohugo.io/), which I discovered earlier: it has a nice site, which is an important point for this kind of software... And a decent doc. And native binary is a promise of speed.
But I quickly hit a limitation: the Markdown parser is quite rigid and not adapted to my needs. And since 1) I don't know Go, 2) I don't have much time for deep hacks, I want something working quickly, I looked elsewhere (it was a "no Go"...).

## Other languages

I could use a generator written in Lua, which is a language I know and appreciate, but they seem quite confidential, used by the author and a dozen of users (guestimate...), so I feared some issues... (or too much work to adapt to my needs).

There are also PHP generators: it feels odd to use this language for off-line generation... I can understand they appeal to those familiar with the language.

I can hack a Java-based generator, but I feared some heaviness.

I finally chose to explore JavaScript-based generators (via Node.js): I know well the language, and I know there is a rich ecosystem of Web-oriented tools.

## Metalsmith

Another interesting generator is [Metalsmith](http://www.metalsmith.io/): it has a very small core, and delegate all tasks to plugins which it orchestrates. It results in flexibility: it can also generate eBooks, etc.

## Build tools

But, I thought, it looked like yet another build tool, like Webpack, Brunch or Gulp, only with more specialized plugins.
I know web tools, I know how to transform Markdown to HTML, Sass to CSS, etc. I can surely leverage an existing build tool to do that, with even more flexibility. But as I haven't much time to spend on writing these tools (finding plugins, chaining the tasks into something sensible), I searched some kind of existing "glue".

### AntWar

I first tried [Antwar](http://antwarjs.github.io/) which is based on Webpack and React.
It has a good site with a tutorial, and an interesting flexibility.
But I ran into some issues, like a rigid Markdown parser, so I looked elsewhere.

### AkashaCMS

Then I tried [AkashaCMS](http://akashacms.com/), still based on Webpack. The site is less sexy, but full of good information. It uses the Markdown-it parser, which is a good choice as it is very flexible.
I have to write my own template, which is not a real problem, particularly if I use x as a starting point.
But, out of the box, it uses the quite outdated EJS template system: the code is still in Google Code! The forum hadn't a new message in months. And the syntax is ugly and heavy, reminds of JSP / ASP, and includes JS code to do its stuff.
Plus it uses Less to generate CSS, while I prefer Sass.
Again, I can replace these parts if I want, the author explains how to change a renderer, but again I wanted something faster to use.

I skip over other generators I saw, like [Waffel](http://moonwave99.github.io/waffel/) (based on Brunch), which seems promising, or [Gatsby](https://github.com/gatsbyjs/gatsby) also interesting, based also on React.js, but written in CoffeeScript.

## Hexo

Finally, I came back to [Hexo](https://hexo.io/), which I looked at several times before...
That's one of the tools with a nice site, good tutorials, and lot of support: it lists lot of plugins and themes, so it is easy to get started.

Alas, lot (if not all) of these themes are written in EJS (why is it so popular?) and Less...

These were the initial choices of Hexo. Since v.3, they moved EJS and Stylus renderers to external plugins, and there are other plugins, but unless you are willing to make your own theme from scratch, you are stuck with these technologies.

I chose the [Icarus](http://blog.zhangruipeng.me/hexo-theme-icarus/) theme, responsive, clean and nice, supporting Disqus and Google Analytics out of the box.
I made some minor changes, mostly on the CSS side, to personalize it a bit.

### Remarks

I installed Hexo-cli, then Hexo itself, globally (`npm i -g`), so that the big footprint of Hexo isn't repeated on each project. Therefore, I removed the `hexo` dependency from `package.json`.
