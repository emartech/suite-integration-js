'use strict';

describe('Modal Handler', function() {

  var fakeWindow;
  var messageHandler;

  beforeEach(function() {
    fakeWindow = require('../mocks/fake_window').create();
    messageHandler = require('./modal').create(fakeWindow);
  });

  it('should listen to messages with event "modal"', function() {
    expect(messageHandler.MESSAGE_EVENT).to.be.eql('modal');
  });

  describe('#handleMessage', function() {
    var testCases = [
      {
        name: 'should pass message to modal API',
        message: {
          src: '//foo.com/modal'
        },
        expected: {
          src: '//foo.com/modal'
        }
      },
      {
        name: 'should prepend host and replace session_id when the modal URL is a relative URL',
        message: {
          src: '/modal?session_id={session_id}',
          foo: 2345
        },
        expected: {
          src: '//mocked.tld/modal?session_id=SESSIONID',
          foo: 2345
        }
      },
      {
        name: 'should not replace other params of relative URLs',
        message: {
          src: '/modal?session_id={session_id}&foo={foo}',
          foo: 2345
        },
        expected: {
          src: '//mocked.tld/modal?session_id=SESSIONID&foo={foo}',
          foo: 2345
        }
      }
    ];

    testCases.forEach(function(testCase) {
      it(testCase.name, function() {
        messageHandler.handleMessage(testCase.message);
        expect(messageHandler.window.SUITE.integration.dialog.modal).to.be.calledWith(testCase.expected);
      });
    });

  });

});
