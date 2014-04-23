var happens = require('..');
var should = require('chai').should();

describe('[general]', function(){
  
  var Obj = null;

  before(function(){
    Obj = {};
    happens(Obj);
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