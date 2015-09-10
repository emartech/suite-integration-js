'use strict';

var sinon = require('sinon');

describe('Proxy Handler', function() {

  var fakeWindow;
  var fakeIframe;
  var messageHandler;

  beforeEach(function() {
    fakeWindow = require('../mocks/fake_window').create();
    fakeIframe = require('../mocks/fake_iframe').create();
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
      sinon.stub(messageHandler, 'getIntegrationIframe').returns(fakeIframe);
    });

    it('should look for the iframe addressed', function() {
      messageHandler.handleMessage(message);
      expect(messageHandler.getIntegrationIframe).to.be.calledWith(message.integrationInstanceId);
    });

    it('should send a post message to the iframe with proper data', function() {
      messageHandler.handleMessage(message);
      expect(fakeIframe.contentWindow.postMessage).to.be.calledWith(message.envelope, '*');
    });
  });

});
