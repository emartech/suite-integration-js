'use strict';

describe('Modal:Close Handler', function() {

  var fakeWindow;
  var messageHandler;

  beforeEach(function() {
    fakeWindow = require('../mocks/fake_window').create();
    messageHandler = require('./modal_close').create(fakeWindow);
  });

  it('should listen to messages with event "modal_close"', function() {
    expect(messageHandler.MESSAGE_EVENT).to.be.eql('modal:close');
  });

});
