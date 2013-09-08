## Slide 1

Hello everyone. Let's get started with some interactive questions.

Hands up, who uses node.js
Hands up, who's done error handling
Hands up, who thinks errors are hiding from them in their applications.

I think errors hide from me. I've learned some things the hard way
dealing with node.js & errors in production so we'll talk about that.

## Slide 2

Now we have all seen code like this, even I see still see it every day.
Can anyone spot the mistake here?

...

Yes, we have errors that are being ignored. i.e. those are the errors
that are hiding from us.

## Slide 3

But we can add error handling and it's pretty simple. Just always add
an `if (err)` to your callback.	The simplest thing you can do is passing
the error up to the caller. 

## Slide 4

Sometimes you need to actually do something with the error though so
in those cases you can just check for the error type, in this example we
check the code property for no such file and then create the file. Otherwise
we pass any other errors up like for example file system read permission
denied.

## Slide 5

Now we come into dealing with errors when we are writing web apps using node.js.
The examples I will be showing today will be written against barebones http.

When we have errors in a request handler we have to do something with them. Now
the issue here is that is no cb to pass the error to, so we have to something.

Fundamentally we have to do something, if we don't we just get more errors that
hide from us.

## Slide 6

One option is to just send it straight down the response. Now you could ask yourself
is this the right thing to do? I personally used to do this in production for at least
a year.

Can anyone spot the problem with this approach?

...

the main issue here is that a process should handle an error, if a process sends the error
to a client then that's not handling it.

## Slide 7

One way we can solve this is to just pass in a cb to our route handlers. We could do this
by setting up a router for our http server and calling each route with a callback.

All this does is move the problem somewhere else, this is however convenient as having
error handling in a single place like your single http server router is nice.

## Slide 8

I used to just send the errors to the client directly, and then in the client we would
log the errors. This is fine for local development but gives you zero insight in 
production, we had a lot of errors which just didn't know about.

At some point you can take if (err) cb(err) too far

## Slide 9

Sending an error outside of your process is like sending the error into space. You're 
never going to see it again and it's pretty much lost. Error handling is something
you should think about at the start when you build a new app.

We recently build a new web app and only added error handling 2 months later, that 
is all whole 2 months worth of errors going into space.

The problem only get's worse if you don't even tell your user anything in the browser
But error handling in the browser, that's a whole another story.

## Slide 10

A core thing you should do with errors is to log them, you want to log the actual error
the req meta data and a unique error id for each error.

If you have access store the session context and the name and arguments of the method
that caused the error.

## Slide 11

We have an error logger configured in production that basically does this. You actually
have to convert javascript error objects into plain objects as errors do not JSON
serialize nicely

We use bunyan in production and it has a nice serializers feature. You can tell it
you want req, res, err and args serialized in a certain way where it will basically
strip off only the properties you care about and pretty print some of them.

Bunyan is actually a pretty cool logging library, you should look into it. We also
log errors into our database because our database has a nice web querying UI. 

## Slide 12

I showed the option of adding a callback to your req, res handler earlier. If you were
to call that callback with an error it should render some kind of error page for your
user or send a correct JSON response. I would recommend centralizing that logic in your
http router and when you send an error page

One thing we found very useful was to assign every error a unique id and to show that 
id on our 500 page. This way user bug reports were directly linked to a concrete
req/res/session in our logger

## Slide 13

Sometimes you send errors back as JSON.

Hands up, if you have seen code that looks like this before
Can anyone spot the problem?

...

Strings are not errors, it took me more then a year to finally get this but now
whenever I look at a regexp checking an error message I cringe.

## Slide 14