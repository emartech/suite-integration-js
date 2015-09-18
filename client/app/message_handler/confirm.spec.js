'use strict';

describe('Confirm Handler', function() {

  var fakeWindow;
  var messageHandler;

  beforeEach(function() {
    fakeWindow = require('../mocks/fake_window').create();
    messageHandler = require('./confirm').create(fakeWindow);
  });

  it('should listen to messages with event "confirm"', function() {
    expect(messageHandler.MESSAGE_EVENT).to.be.eql('confirm');
  });

});
