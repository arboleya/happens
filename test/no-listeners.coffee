Happens = require '../lib/happens'
should = require('chai').should()

describe '[no-listeners]', ->
  
  Extended = null

  before ->
    class Extended extends Happens


  it 'should not raise error when emitting event with no listeners', ->
    tmp = new Extended
    tmp.emit 'ping'

  it 'should not raise error when removing unexistent listener', ->
    tmp = new Extended
    tmp.off 'none', ->