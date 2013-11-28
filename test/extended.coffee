Happens = require '../lib/happens'
should = require('chai').should()

describe '[extended]', ->
  
  Extended = null

  before ->
    class Extended extends Happens


  it 'should listen for `once` just one time', ->
    
    called = 0
    tmp = new Extended
    tmp.once 'ping', -> called++
    tmp.emit 'ping'
    tmp.emit 'ping'
    called.should.be.equal 1


  it 'should listen for `on` multiple times', ->

    called = 0
    tmp = new Extended
    tmp.on 'ping', t = -> called++
    tmp.emit 'ping'
    tmp.emit 'ping'
    called.should.be.equal 2


  it 'should not listen anything after `off`', ->
    called = 0
    tmp = new Extended
    tmp.on 'ping', t = -> called++
    tmp.off 'ping', t
    tmp.emit 'ping'
    tmp.emit 'ping'
    called.should.be.equal 0

  it 'should properly send params', ->
    
    tmp = new Extended
    tmp.on 'ping', (a, b, c)->
      a.should.be.equal 1
      b.should.be.equal 2
      c.should.be.equal 3
    tmp.emit 'ping', 1, 2, 3