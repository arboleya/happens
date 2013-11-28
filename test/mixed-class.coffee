Happens = require '../lib/happens'
should = require('chai').should()

describe '[mixed-class]', ->
  
  Mixed = null

  before ->
    class Mixed
      constructor:->
        Happens.mixin @


  it 'should listen for `once` just one time', ->
    called = 0
    tmp = new Mixed
    tmp.once 'ping', -> called++
    tmp.emit 'ping'
    tmp.emit 'ping'
    called.should.be.equal 1


  it 'should listen for `on` multiple times', ->

    called = 0
    tmp = new Mixed
    tmp.on 'ping', t = -> called++
    tmp.emit 'ping'
    tmp.emit 'ping'
    called.should.be.equal 2


  it 'should not listen anything after `off`', ->

    called = 0
    tmp = new Mixed
    tmp.on 'ping', t = -> called++
    tmp.off 'ping', t
    tmp.emit 'ping'
    tmp.emit 'ping'
    called.should.be.equal 0