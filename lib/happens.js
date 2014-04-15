module.exports = function(target) {
  for(var prop in Happens)
    target[prop] = Happens[prop];
  return target;
};

var Happens = {
  __init: function(event) {
    var tmp = this.__listeners || (this.__listeners = []);
    return tmp[event] || (tmp[event] = []);
  },

  on: function(event, fn) {
    if( !fn ) return;
    this.__init(event).push(fn);
  },

  off: function(event, fn) {
    var pool = this.__init(event);
    pool.splice(pool.indexOf(fn), 1);
  },

  once: function(event, fn) {
    var self = this, wrapper = function() {
      self.off(event, wrapper);
      fn.apply(this, arguments);
    }
    this.on(event, wrapper );
  },

  emit: function(event) {
    var i, pool = pool = this.__init(event).slice(0);
    for(i in pool) pool[i].apply(this, [].slice.call(arguments, 1));
  }
};