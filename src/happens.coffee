module.exports = class Happens

  on:(key, callback)->
    pool = @__listeners or @__listeners = []
    (pool[key] or pool[key] = []).push callback

  off:(key, callback)->
    if (pool = @__listeners?[key])?
      pool.splice (pool.indexOf callback), 1

  once:(key, callback)->
    @on key, wrapper = =>
      @off key, wrapper
      callback.apply @, arguments

  emit:(key, args...)->
    if (pool = @__listeners?[key])?
      for listener in pool.slice 0
        listener.apply @, args

  @mixin = (target)->
    target[prop] = @::[prop] for prop of @::