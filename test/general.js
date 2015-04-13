var happens = require('..');
var should = require('chai').should();

/**
 * Sample of CoffeeScript `__extends` method
 */
function coffee_extends(child, parent){
  
  for (var key in parent) {
    if (__hasProp.call(parent, key))
      child[key] = parent[key];
  }
  
  function ctor() {
    this.constructor = child;
  }

  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
  child.__super__ = parent.prototype;

  return child;
};



describe('[general]', function(){
  
  var Obj = null;

  function Klass(){}

  before(function(){
    Obj = {};
    happens(Obj);
    coffee_extends(Klass, happens);
  });

  it('should initialize without arguments', function(){
    var fn;
    var called = 0;
    var tmp = happens();

    tmp.on('ping', fn = function(){ called++; });
    tmp.off('ping', fn);
    tmp.emit('ping');
    tmp.emit('ping');

    called.should.be.equal(0);
  });

  it('should be extendable by prototype', function(){
    var called = 0;
    var tmp = new Klass;

    tmp.on('ping', fn = function(){ called++; });
    tmp.emit('ping');
    tmp.off('ping', fn);
    tmp.emit('ping');

    called.should.be.equal(1);
  });

  it('should raise an error for wront instantiations', function(){
    var error;

    try {
      var tmp = new happens({});
    } catch(e){
      error = e;
    }

    should.exist(error);
  });

  it('should listen for `once` just one time', function(){
    var called = 0;
    var tmp = Obj;

    tmp.once('ping', function(){ called++; });
    tmp.emit('ping');
    tmp.emit('ping');

    called.should.be.equal(1);
  });

  it('should listen for `on` multiple times', function(){
    var called = 0;
    var tmp = Obj;

    tmp.on('ping', function(){ called++; });
    tmp.emit('ping');
    tmp.emit('ping');

    called.should.be.equal(2);
  });

  it('should not listen anything after `off`', function(){
    var fn;
    var called = 0;
    var tmp = Obj;

    tmp.on('ping', fn = function(){ called++; });
    tmp.off('ping', fn);
    tmp.emit('ping');
    tmp.emit('ping');

    called.should.be.equal(0);
  });

});