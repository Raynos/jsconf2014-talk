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

## Slide 11

There are a couple of modules that build on top of `xhr`.

httpify is a module that works in the browser & node, in node it
  uses mikeals request and in the browser it uses xhr, it also
  added a few more options to xhr like form encoding.

This is pretty cool because you can use the same code in node 
  and the browser.

xhr-json makes JSON the default and add promises support to `xhr`.
  This is pretty cool, because `xhr` was a small, callback based
  module it was easy for someone else to write their own thing
  that added promises support. The inverse would be harder.

And flatsheet is actually an API client that uses `xhr`. Rather
  then making direct HTTP calls it uses xhr for the json support
  and cross browser CORS support.

## Slide 12

We've just seen the collaboration and re-use benefits for a small
  module. Could we get those same benefits for an entire framework.

Can we have people use subsets of the framework and built on top of
  them. This adds a tremendous amount of value.

I tried to do this with React, I wanted to use a subset, their
  virtual DOM, however react was not modular, it was a monolith.

However you can build frameworks in a modular fashion, you start
  by de-composing your problem space into small things.

The really important part here is to de-compose it such that
  each individual part is useful on it's own without the entire
  framework.

Then we work from the group and we solve each one of these problems
  in isolation and we join them together later.

## Slide 13

I ended up writing my own set of modules for building a
  unidirectional application. I took heavy
  inspiration from FRP literature, React & OM.

The approach I generally take is README driven development, I
  write the code I want to write and then figure out how to 
  implement it.

I had a couple of goals in mind about how I wanted to handle
  representing the application state for my apps. I just needed
  something that was both immutable and had a way of being
  notified about a change.

I started with observing change and wrote the simplest possible
  module for observing changes.

I then needed to get immutability, so I wrote an observable object
  module that would create a new shallow clone every time you
  changed a property. 

Lastly I needed to be able to have state of dynamicly changing
  size, the last piece was an observable array that creates a 
  shallow clone every time any item changed and had the ability
  to add and remove items.

This seperation paid off for me because the varying length array
  was quite complex to implement where as the other two where 
  kept simple.

Another important thing is seperating your interfaces and your
  implementations, I'm working on an alternative implementation
  of these modules to see if I can get better performance out of
  it. However since the interface will be the same it's a drop in
  replacement.

This is actually a really interesting point, if you seperate your
  interfaces from your implementation and you put each implementation
  in it's own module it allows for the community to write alternatives
  with different trade offs. This way everybody wins.

## Slide 14

For the input I wanted to get a series of DOM agnostic events
  when the user interacts.

I split this problem up into dealing with the events, I wrote 
  `geval` as a single channel event emitter.

I wrote `value-event` which is a set of higher order functions
  that return event handlers, each one of these event handles
  works directly with the DOM, i.e. you can just call element
  addEventListener with them and they work. The hard part that
  they do is reading from the DOM because that's boilerplate I 
  wanted to avoid.

The final piece is a module that sets up event delegation, this
  is just a performance technique. 

## Slide 15

For the rendering I wanted to be able to write a declarative view
  in plain JavaScript.

The most important thing was writing a function that just says
  what it should look like right now, thinking in terms of 
  current state of the view rather then updates of the view is
  a lot simpler

So since i want a declarative view i need a data structure to
  represent my view, this is where vtree comes in.

The next step is we need to be able to actually render it and
  patch it into the DOM, `vdom` contains all the DOM related 
  stuff. 

Note that using vdom is optional, someone is working on a 
  a `vcanvas`. If you want to swap out the vdom backend and
  render your entire app to canvas thats pretty easy to do.

The last piece is `virtual-hyperscript`, its a bit of sugar
  that's inspired by a module dominictarr wrote 2 years ago, it
  makes it easier to create the virtual DOM data structures.

## Slide 16

show UI components

## Slide 17

Show refactoring an app.
