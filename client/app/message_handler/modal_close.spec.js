'use strict';

describe('Modal:Close Handler', function() {

  var fakeWindow;
  var messageHandler;

  beforeEach(function() {
    fakeWindow = require('../mocks/fake_window').create(this.sandbox);
    messageHandler = require('./modal_close').create(fakeWindow);
  });

  it('should listen to messages with event "modal:close"', function() {
    expect(messageHandler.MESSAGE_EVENT).to.be.eql('modal:close');
  });

});
