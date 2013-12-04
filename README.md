# Happens

Super simple and tiny javascript event system.

[![Stories in Ready](https://badge.waffle.io/serpentem/happens.png)](http://waffle.io/serpentem/happens)  

[![Build Status](https://travis-ci.org/serpentem/happens.png?branch=master)](https://travis-ci.org/serpentem/happens) [![Coverage Status](https://coveralls.io/repos/serpentem/happens/badge.png)](https://coveralls.io/r/serpentem/happens)

[![Dependency Status](https://gemnasium.com/serpentem/happens.png)](https://gemnasium.com/serpentem/happens) [![NPM version](https://badge.fury.io/js/happens.png)](http://badge.fury.io/js/happens)

## Usage Drafts

Simple draft demonstrating how this should work.

> Attention, is a **WIP**! Do not use it yet.

## Inheritance

````coffeescript
Event = require 'happens'

# method 1
class MyClass extends Event

# method 2
class MyClass extends OtherClass
  constructor:->
    Event.mixin @
````

In javascript you can use the `mixin`:

````javascript
var Event = require('happens');

function MyClass(){
  Event.mixin(this);
} 
````

### Objects are welcome

````coffeescript
Event = require 'happens'
Event.mixin Obj = {}
````

## API

 - Listening an event:
   - `Event.on [event-name:String], [callback:Function]`
 - Listening an event one time only:
   - `Event.once [event-name], [callback]`
 - Unlistening:
   - `Event.off [event-name], [callback]`
 - Emiting event passing params:
   - `Event.emit [event-name], [param1], [param2], [paranN]`

Whole API described in the example bellow:

````coffeescript
Music extends Event
  # something here...

# listeners
on_start = -> console.log 'music started'
on_end = -> console.log 'music ended'
on_beat = (volume, pan, eq)->
  console.log 'volume', volume
  console.log 'pan', pan
  console.log 'eq', eq

# setting up
song = new Music
song.once 'start', on_start
song.once 'end', on_end
song.on 'beat', on_beat

# emitting
song.emit 'start'
song.emit 'beat', 1, 2, 3
song.emit 'beat', 4, 5, 6
song.emit 'beat', 7, 8, 9

# unlistening heartbeat
song.off 'beat', on_beat

# this calls will have no effect since the listener was removed
song.emit 'beat', 10, 11, 12 # does nothing
song.emit 'beat', 13, 14, 15 # does nothing

song.emit 'die' # emit die event

```


# License

The MIT License (MIT)

Copyright (c) 2013 Anderson Arboleya

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/serpentem/happens/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

