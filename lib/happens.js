module.exports = Happens;

function Happens(){};

Happens.prototype.__init = function(event) {
  var tmp = this.__listeners || (this.__listeners = []);
  return tmp[event] || (tmp[event] = []);
};

Happens.prototype.on = function(event, fn) {
  this.__init(event).push(fn);
};

Happens.prototype.off = function(event, fn) {
  var pool = this.__init(event);
  pool.splice(pool.indexOf(fn), 1);
};

Happens.prototype.once = function(event, fn) {
  var self = this, wrapper = function() {
    self.off(event, wrapper);
    fn.apply(this, arguments);
  }
  this.on(event, wrapper );
};

Happens.prototype.emit = function(event) {
  var i, pool = pool = this.__init(event).slice(0);
  for(i in pool) pool[i].apply(this, [].slice.call(arguments, 1));
};

Happens.mixin = function(target) {
  for(var prop in Happens.prototype)
    target[prop] = Happens.prototype[prop]
};