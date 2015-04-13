var happens = require('..');
var should = require('chai').should();

describe('[no-listeners]', function(){
  
  var Extended = null;

  before(function(){
    Extended = function(){
      happens(this); 
    };
  });


  it('should not raise error when emitting event with no listeners', function(){
    var tmp = new Extended();
    tmp.emit('ping');
  });

  it('should not raise error when removing inexistent listener', function(){
    var tmp = new Extended();
    tmp.off('none', function(){});
  });

  it('should not accept undefined functions as listeners', function(){
    var tmp = new Extended();

    (function(){
      tmp.on( 'emit', undefined );
    }).should.throw(/is not a Function/);

    (function(){
      tmp.on( 'emit', null);
    }).should.throw(/is not a Function/);

    (function(){
      tmp.on( 'emit' );
    }).should.throw(/is not a Function/);

    (function(){
      tmp.on( 'emit', 1 );
    }).should.throw(/is not a Function/);

    (function(){
      tmp.on( 'emit', {} );
    }).should.throw(/is not a Function/);

    (function(){
      tmp.on( 'emit', [] );
    }).should.throw(/is not a Function/);

    (function(){
      tmp.on( 'emit', '' );
    }).should.throw(/is not a Function/);

    (function(){
      tmp.on( 'emit', new Date() );
    }).should.throw(/is not a Function/);

    tmp.emit( "emit", "anything" );
  });
});