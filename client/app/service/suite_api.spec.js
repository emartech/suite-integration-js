'use strict';

describe('SuiteApi', function() {

  var fakeWindow;
  var suiteApi;

  beforeEach(function() {
    fakeWindow = require('../mocks/fake_window').create(this.sandbox);
    suiteApi = require('./suite_api').create(fakeWindow);
  });

  describe('#messageToService', function() {
    var testMessage = {
      event: 'test'
    };

    it('should look for the iframe addressed', function() {
      suiteApi.messageToService(testMessage, 1234);
      expect(fakeWindow.$).to.be.calledWith('#integration-1234');
    });

    it('should send a post message to the iframe with proper data', function() {
      suiteApi.messageToService(testMessage, 1234);
      expect(fakeWindow.$('foo')[0].contentWindow.postMessage).to.be.calledWith(testMessage, '*');
    });
  });

  describe('#messageToSuite', function() {
    it('should call window.postMessage', function() {
      var testMessage = {
        event: 'foo'
      };

      suiteApi.messageToSuite(testMessage);
      expect(fakeWindow.postMessage).to.have.been.calledWith(testMessage, '*');
    });
  });
});
