'use strict';

describe('Modal Handler', function() {

  var fakeWindow;
  var messageHandler;

  beforeEach(function() {
    fakeWindow = require('../mocks/fake_window').create();
    messageHandler = require('./modal').create(fakeWindow);
  });

  it('should listen to messages with event "modal"', function() {
    expect(messageHandler.MESSAGE_EVENT).to.be.eql('modal');
  });

});
