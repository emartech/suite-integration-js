'use strict';

describe('Proxy Handler', function() {

  var fakeWindow;
  var messageHandler;

  beforeEach(function() {
    fakeWindow = require('../mocks/fake_window').create(this.sandbox);
    messageHandler = require('./proxy').create(fakeWindow);
  });

  it('should listen to messages with event "proxy"', function() {
    expect(messageHandler.MESSAGE_EVENT).to.be.eql('proxy');
  });

  describe('#handleMessage', function() {
    var message = {
      envelope: {
        foo: 'bar'
      },
      integrationInstanceId: 1234
    };

    beforeEach(function() {
      messageHandler.window.SUITE.integration = {
        messageToService: this.sandbox.stub()
      };
    });

    it('should send the message the service', function() {
      messageHandler.handleMessage(message);
      expect(messageHandler.window.SUITE.integration.messageToService).to.be.calledWith(
        message.envelope,
        message.integrationInstanceId);
    });
  });
});
