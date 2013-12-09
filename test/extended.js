var happens = require('../lib/happens'),
    should = require('chai').should();

var __extends = function(child, parent) {
  for (var key in parent) {
      if ({}.hasOwnProperty.call(parent, key))
        child[key] = parent[key];
  }

  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
  child.__super__ = parent.prototype;

  return child;
};

describe('[extended]', function(){

  var Extended;

  before(function() {
    Extended = function(){};
    __extends(Extended, happens)
  });

  it('should listen for `once` just one time', function(){
    var tmp, called = 0;
    tmp = new happens;
    tmp.once('ping', function(){called++;});
    tmp.emit('ping');
    tmp.emit('ping');
    called.should.be.equal(1);
  });

  it('should listen for `on` multiple times', function(){
    var called = 0, tmp = new Extended
    tmp.on('ping', function(){ called++; });
    tmp.emit('ping');
    tmp.emit('ping');
    called.should.be.equal(2);
  });

  it('should not listen anything after `off`', function(){
    
    var fn,
        called = 0,
        tmp = new Extended;

    tmp.on('ping', fn = function(){ called++; });
    tmp.off('ping', fn);
    tmp.emit('ping');
    tmp.emit('ping');
    called.should.be.equal(0);
  });

  it('should properly send params', function(){
    
    tmp = new Extended
    tmp.on('ping', function(a, b, c) {
      a.should.be.equal(1);
      b.should.be.equal(2);
      c.should.be.equal(3);
    });
    tmp.emit('ping', 1, 2, 3);

  });
});