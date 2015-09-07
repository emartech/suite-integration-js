'use strict';

describe('Resize Handler', function() {

  var fakeWindow;
  var messageHandler;
  var integrationInstanceId = 'fake_instance_id';

  beforeEach(function() {
    fakeWindow = require('../mocks/fake_window').create();
    messageHandler = require('./resize').create(fakeWindow);
  });

  it('should listen to messages with event "resize"', function() {
    expect(messageHandler.MESSAGE_EVENT).to.be.eql('resize');
  });

  it('should call window.document.getElementById when calling getIntegrationIframe with valid source', function() {
    messageHandler.getIntegrationIframe({
      integration_instance_id: integrationInstanceId
    });
    expect(fakeWindow.document.getElementById).to.have.been.calledWith('#integration-' + integrationInstanceId);
  });

  it('should return element when calling getIntegrationIframe with valid source', function() {
    var element = messageHandler.getIntegrationIframe({
      integration_instance_id: integrationInstanceId
    });
    expect(element).to.eql('fake_element');
  });

  it('should throw exception when calling getIntegrationIframe with invalid source', function() {
    var exceptionThrown;

    try {
      messageHandler.getIntegrationIframe('invalid_source');
    } catch (e) {
      exceptionThrown = e;
    }

    expect(exceptionThrown.message).to.eql('Message source is unknown');
  });

});
