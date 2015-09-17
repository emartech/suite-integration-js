'use strict';

var sinon = require('sinon');

describe('ServiceApi', function() {

  var fakeWindow;
  var serviceApi;

  beforeEach(function() {
    fakeWindow = require('../mocks/fake_window').create();
    serviceApi = require('./service_api').create(fakeWindow);
  });

  describe('#messageToService', function() {
    beforeEach(function() {
      sinon.stub(serviceApi, 'messageToSuite');

    });

    it('should call wrapToProxy', function() {
      sinon.stub(serviceApi, 'wrapToProxy');

      serviceApi.messageToService({
        event: 'foo'
      }, 1234);
      expect(serviceApi.wrapToProxy).to.have.been.calledWith({
        event: 'foo'
      }, 1234);
    });

    it('should proxy the message via suite', function() {
      sinon.stub(serviceApi, 'wrapToProxy').returns('bar');

      serviceApi.messageToService({
        event: 'foo'
      }, 1234);
      expect(serviceApi.messageToSuite).to.have.been.calledWith('bar');
    });
  });

  describe('#messageToSuite', function() {
    it('should call window.parent.postMessage', function() {
      var testMessage = {
        event: 'foo'
      };
      sinon.stub(serviceApi, 'setMessageSource').returns(testMessage);

      serviceApi.messageToSuite(testMessage);
      expect(fakeWindow.parent.postMessage).to.have.been.calledWith(testMessage, '*');
    });
  });

  describe('#wrapToProxy', function() {
    it('should wrap message for a proxy event', function() {
      var testMessage = {
        event: 'foo'
      };
      var testIntegrationInstanceId = 1234;

      var result = serviceApi.wrapToProxy(testMessage, testIntegrationInstanceId);
      expect(result).to.eql({
        event: 'proxy',
        envelope: testMessage,
        integrationInstanceId: testIntegrationInstanceId
      });
    });
  });

});
