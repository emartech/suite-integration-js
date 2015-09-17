'use strict';

var sinon = require('sinon');

describe('DialogApi', function() {

  var fakeWindow;
  var dialogApi;

  beforeEach(function() {
    fakeWindow = require('../mocks/fake_window').create();
    dialogApi = require('./dialog_api').create(fakeWindow);
  });

  describe('#submit', function() {
    beforeEach(function() {
      fakeWindow.SUITE.integration = {
        messageToService: sinon.stub()
      };

      sinon.stub(dialogApi, 'params', {
        get: function() {
          return {
            dialogId: 'foo',
            openerIntegrationInstanceId: 'bar'
          };
        }
      });
    });

    var testCases = [
      {
        name: 'should pass success when true',
        success: true,
        data: {},
        expected: {
          event: 'modal',
          dialogId: 'foo',
          success: true
        }
      },
      {
        name: 'should pass success when false',
        success: false,
        data: {},
        expected: {
          event: 'modal',
          dialogId: 'foo',
          success: false
        }
      },
      {
        name: 'should pass data too',
        success: false,
        data: {
          key: 'value'
        },
        expected: {
          event: 'modal',
          dialogId: 'foo',
          success: false,
          key: 'value'
        }
      }
    ];

    testCases.forEach(function(test) {
      it(test.name, function() {
        dialogApi.submit(test.success, test.data);
        expect(fakeWindow.SUITE.integration.messageToService).to.be.calledWith(test.expected, 'bar');
      });
    });
  });

  describe('#close', function() {
    beforeEach(function() {
      fakeWindow.SUITE.integration = {
        messageToSuite: sinon.stub()
      };
    });

    it('should send a message to close the dialog', function() {
      dialogApi.close();
      expect(fakeWindow.SUITE.integration.messageToSuite).to.be.calledWith({
        event: 'modal:close'
      });
    });
  });

});
