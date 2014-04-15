var happens = require('../lib/happens'),
    should = require('chai').should();

describe('[no-listeners]', function(){
  
  var Extended = null;

  before(function(){
    Extended = function(){
      happens(this); 
    };
  });


  it('should not raise error when emitting event with no listeners', function(){
    var tmp = new Extended;
    tmp.emit('ping');
  });

  it('should not raise error when removing unexistent listener', function(){
    var tmp = new Extended;
    tmp.off('none', function(){});
  });

  it('should not accept undefined functions as listeners', function(){
    var tmp = new Extended;

    tmp.on( 'emit', undefined );
    tmp.emit( "emit", "anything" )
  });

});