var happens = require('../lib/happens'),
    should = require('chai').should();

describe('[mixed-class]', function(){
  
  var Mixed = null;

  before(function(){
    Mixed = function(){
      happens.mixin(this);
    };
  });


  it('should listen for `once` just one time', function(){
    var called = 0;
    var tmp = new Mixed;

    tmp.once('ping', function(){ called++; });
    tmp.emit('ping');
    tmp.emit('ping');
    called.should.be.equal(1);
  });

  it('should listen for `on` multiple times', function(){
    var fn;
    var called = 0;
    var tmp = new Mixed;

    tmp.on('ping', function(){ called++; });
    tmp.emit('ping');
    tmp.emit('ping');

    called.should.be.equal(2);
  });

  it('should not listen anything after `off`', function(){
    var fn;
    var called = 0;
    var tmp = new Mixed;

    tmp.on('ping', fn = function(){ called++; });
    tmp.off('ping', fn);
    tmp.emit('ping');
    tmp.emit('ping');

    called.should.be.equal(0);
  });
});