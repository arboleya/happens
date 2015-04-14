(function (global, factory) {
  "object" === typeof exports ? module.exports = factory() :
  "function" === typeof define && define.amd ? define(factory) :
  global.Happens = factory();
}(this, function () {

  'use strict'

  /**
   * Module constructor
   * @param  {Object} target Target object to extends methods and properties into
   * @return {Object}        Target after with extended methods and properties
   */
  function Happens(target){
    var nu = this instanceof Happens;
    if(target){
      if(!nu)
        for(var prop in Happens.prototype)
          target[prop] = Happens.prototype[prop];
      else
        throw new Error("You can't pass a target when instantiating with the `new` keyword");
    }
    else if(!nu)
      return new Happens
  };

  /**
   * Initializes event
   * @param  {String} event Event name to initialize
   * @return {Array}        Initialized event pool
   */
  Happens.prototype.__init = function(event) {
    var tmp = this.__listeners || (this.__listeners = []);
    return tmp[event] || (tmp[event] = []);
  };

  /**
   * Adds listener
   * @param  {String}   event Event name
   * @param  {Function} fn    Event handler
   */
  Happens.prototype.on = function(event, fn) {
    validate(fn);
    this.__init(event).push(fn);
  };

  /**
   * Removes listener
   * @param  {String}   event Event name
   * @param  {Function} fn    Event handler
   */
  Happens.prototype.off = function(event, fn) {
    var pool = this.__init(event);
    pool.splice(pool.indexOf(fn), 1);
  };

  /**
   * Add listener the fires once and auto-removes itself
   * @param  {String}   event Event name
   * @param  {Function} fn    Event handler
   */
  Happens.prototype.once = function(event, fn) {
    validate(fn);
    var self = this, wrapper = function() {
      self.off(event, wrapper);
      fn.apply(this, arguments);
    };
    this.on(event, wrapper );
  };

  /**
   * Emit some event
   * @param  {String} event Event name -- subsequent params after `event` will
   * be passed along to the event's handlers
   */
  Happens.prototype.emit = function(event /*, arg1, arg2 */ ) {
    var i, pool = this.__init(event).slice(0);
    for(i in pool)
      pool[i].apply(this, [].slice.call(arguments, 1));
  };

  /**
   * Validates if a function exists and is an instanceof Function, and throws
   * an error if needed
   * @param  {Function} fn Function to validate
   */
  function validate(fn) {
    if(!(fn && fn instanceof Function))
      throw new Error(fn + ' is not a Function');
  }

  return Happens;
}));