'use strict';

var sinon = require('sinon');
var Q = require('q');

describe('DialogApi', function() {

  var fakeWindow;
  var dialogApi;

  beforeEach(function() {
    fakeWindow = require('../mocks/fake_window').create();
    dialogApi = require('./dialog_api').create(fakeWindow);
  });

  describe('#submit', function() {
    var fakeMessage = {
      message: 'fake-message'
    };
    var fakeDialogId = 'foo';

    beforeEach(function() {
      fakeWindow.SUITE.integration = {
        messageToService: sinon.stub()
      };

      sinon.stub(dialogApi, 'params', {
        get: function() {
          return {
            dialogId: fakeDialogId,
            openerIntegrationInstanceId: 'bar'
          };
        }
      });

      sinon.stub(dialogApi, 'generateMessage').returns(fakeMessage);
    });

    it('should generate a message', function() {
      dialogApi.submit(true);
      expect(dialogApi.generateMessage).to.be.called;
    });

    describe('submitting to a service', function() {
      it('should send the message to a service', function() {
        dialogApi.submit(true);
        expect(fakeWindow.SUITE.integration.messageToService).to.be.calledWith(fakeMessage, 'bar');
      });
    });

    describe('submitting to suite', function() {
      beforeEach(function() {
        dialogApi.deferreds[fakeDialogId] = Q.defer();
        sinon.stub(dialogApi.deferreds[fakeDialogId], 'reject');
        sinon.stub(dialogApi.deferreds[fakeDialogId], 'resolve');
      });

      it('should send message when resolving the promise', function() {
        dialogApi.submit(true);
        expect(dialogApi.deferreds[fakeDialogId].resolve).to.be.calledWith(fakeMessage);
      });

      it('should send message when rejecting the promise', function() {
        dialogApi.submit(false);
        expect(dialogApi.deferreds[fakeDialogId].reject).to.be.calledWith(fakeMessage);
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

  describe('#generateMessage', function() {
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

    describe('without confirmParams', function() {
      var testCases = [
        {
          name: 'should pass success when true',
          success: true,
          data: null,
          expected: {
            event: 'dialog:submit',
            dialogId: 'foo',
            success: true
          }
        },
        {
          name: 'should pass success when false',
          success: false,
          data: null,
          expected: {
            event: 'dialog:submit',
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
            event: 'dialog:submit',
            dialogId: 'foo',
            success: false,
            key: 'value'
          }
        }
      ];

      testCases.forEach(function(test) {
        it(test.name, function() {
          var message = dialogApi.generateMessage(test.success, test.data);
          expect(message).to.eql(test.expected);
        });
      });
    });

    describe('with confirmParams', function() {
      it('should also append options from the beginning', function() {
        dialogApi.confirmParams['foo'] = {
          test: 'option-value'
        };
        var message = dialogApi.generateMessage(true, {
          key: 'data-value'
        });
        expect(message).to.eql({
          event: 'dialog:submit',
          dialogId: 'foo',
          success: true,
          key: 'data-value',
          test: 'option-value'
        });
      });
    });
  });

});
