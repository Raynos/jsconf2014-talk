## Slide 1

Hey guys, today's talk is about writing modular frontend apps.

It says using NPM & pals, but that's just an implementation
  detail. These techniques will work with any sane package
  manager.

A little about me, I'm Raynos, I've probably written at least a 100
  modules designed for the browser. I have a bit of an addiction
  to building lots of small modules.

## Slide 2

To start of, let's talk about some of the tools of the trade.
  Everything I'm going to show is going to be based around these
  tools but the ideas should apply to other tools as well.

First let's do a little warmup, couple of quick questions.

Put your hand up if you've heard of npm, cool.
Put your hand up if you've heard of browserify, cool.
Put your hand up if you've used browserify and npm, cool.

I'll give a quick intro to each of these tools.

## Slide 3

NPM is a package manager for JavaScript. It's a pretty cool tool.

You can write a module, create a package.json with a name,
  description, version and dependencies and then just npm publish
  it.

NPM has done great things for making it easy for anyone to 
  publish, it also has a benefit of not having dependency hell.

## Slide 4

Browserify allows you to bundle a bunch of node-style commonJS
  code into a single bundle.

This is great, you can use require to require local files or
  require files from npm modules. 

For more information check out the excellent browserify handbook

## Slide 5

The third important tool is the unix philosophy. above is the
  definition of modularity from the unix philosophy.

It recommends writing lots of small things and connecting them
  together. There are two strong advantages of this. You can
  always swap out a small thing and since each thing is small
  its far easier to maintain and debug.

## Slide 6

Now that we know about the tools and some of the unix philosophy
  we should be ready to start using modules in our apps.

But first, let's ask ourself why.

The modular approach is about freedom, you can pick exactly
  that which is the best fit for the thing your working on,
  no compromise.

You can use exactly what you need and no more, this means less
  KB and it also means less complexity, using a couple of small
  things is easier to maintain then using 20% of a big thing.

And lastly there is no lock in, you have the freedom to swap out
  a small thing if it no longer works, swapping out a large thing
  or a framework is far more difficult & painful.

## Slide 7

Ok, so modules are cool, we should use them, but where can we
  find modules. 

A few tricks are to use `npm search` or to ask a friend. A great
  way to get started is to just talk to someone and ask for 
  recommendations on either twitter or IRC or at a conference.

However there are a couple of groupings that group modules
  together other a single purpose. For example `npm-dom` is a
  github organization that contains a bunch of small modules
  that allow you to do dom stuff. 

The same applies for gl modules, which is a set of modules
  around doing 2d & 3d games, or voxelJS which is a set of 
  modules around working with voxels.

There is also the level-* modules and the streams modules. These
  groupings will help you get started if you want to do anything
  in those spaces. 

In fact if your using lots of small modules I recommend you
  contribute to a list, I actually maintain multiple lists & wikis
  about modules

## Slide 8

So we heard about modules, the tools and where to find them. 

Let's actually build a little app.

<demo>

## Slide 9

Now let's take a look at the benefits of a modular approach.

The biggest one is re-use and collaboration. There have been so
  many times where someone has used or build upon one of my
  modules because it was small and they wouldn't have if it was
  a large thing.

## Slide 10

One example of this is `xhr`. `xhr` is a module I wrote for doing
  ajax requests, specifically cross domain ajax requests in IE9
  which jQuery couldn't do and probably still can't.

It's a small callback based module at about a 120 loc, it supports
  cors and json out of the box and that's about it
