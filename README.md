[![Build Status](https://travis-ci.org/arboleya/happens.svg?branch=master)](https://travis-ci.org/arboleya/happens)
[![Coverage Status](https://coveralls.io/repos/arboleya/happens/badge.svg?branch=master)](https://coveralls.io/r/arboleya/happens?branch=master)
[![NPM version](https://badge.fury.io/js/happens.svg)](http://badge.fury.io/js/happens)
[![Code Climate](https://codeclimate.com/github/arboleya/happens/badges/gpa.svg)](https://codeclimate.com/github/arboleya/happens)
[![Dependency Status](https://gemnasium.com/arboleya/happens.png)](https://gemnasium.com/arboleya/happens)

# Happens

Super simple and tiny javascript event system.

## Instalation


````shell
# node
npm install happens --save

# bower
bower install happens

# meteor
meteor add arboleya:happens
````

## API

 - `.on(event, handler)` - listening event
 - `.once(event, handler)` - listening event, once
 - `.off(event, handler)` - unlistening event
 - `.emit(event, handler)` - emitting event

### Basic

````javascript
var Happens = require('happens');

var test = happens();
test.on('init', function(letters){
  console.log('init', letters); // a, b, c
});
test.emit('init', ['a', 'b', 'c'])
````

### With objects

````javascript
var Happens = require('happens');

var obj = happens({
  play: function(){
    this.emit('play');
  }
});
obj.on('play', function(){ console.log('playing'); });
obj.play();
````

### With Classes

````javascript
var Happens = require('happens');

function MyClass() {
  Happens(this);
}

MyClass.prototype.play = function() {
  this.emit('play');
};

var tmp = new MyClass();
tmp.on('play', function(){ console.log('playing'); });
tmp.play();
````

## Meteor

As Meteor doesn't use `require`, worths mentioning that the `Happens`
constructor is directly available on the Client and Server.


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