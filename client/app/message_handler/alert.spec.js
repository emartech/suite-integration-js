'use strict';
const FakeWindow = require('../mocks/fake_window');
const MessageHandler = require('./alert');

describe('Alert Handler', function() {

  var fakeWindow;
  var messageHandler;

  beforeEach(function() {
    fakeWindow = FakeWindow.create(this.sandbox);
    messageHandler = new MessageHandler(fakeWindow);
  });

  it('should listen to messages with event "alert"', function() {
    expect(messageHandler.MESSAGE_EVENT).to.be.eql('alert');
  });

  describe('#getClassNames', function() {
    var testCases = [
      {
        name: 'should return classNames when no special className specified',
        data: {},
        expected: [
          'e-alert'
        ]
      },
      {
        name: 'should return classNames when className is specified',
        data: {
          className: 'e-alert-foo'
        },
        expected: [
          'e-alert',
          'e-alert-foo'
        ]
      },
      {
        name: 'should return classNames when icon is specified',
        data: {
          icon: 'foo'
        },
        expected: [
          'e-alert',
          'e-alert-withicon'
        ]
      },
      {
        name: 'should return classNames when className and icon is specified',
        data: {
          className: 'e-alert-foo',
          icon: 'bar'
        },
        expected: [
          'e-alert',
          'e-alert-foo',
          'e-alert-withicon'
        ]
      }
    ];

    testCases.forEach(function(test) {
      it(test.name, function() {
        var classNames = messageHandler.getClassNames(test.data);
        expect(classNames).to.eql(test.expected);
      });
    });
  });

  describe('#getHtml', function() {
    beforeEach(function() {
      this.sandbox.stub(messageHandler, 'cleanMessage', function(text) {
        return text;
      });
    });

    var testCases = [
      {
        name: 'should return HTML with classNames',
        data: {},
        expected: 'e-alert'
      },
      {
        name: 'should return HTML with proper class when icon is set',
        data: {
          icon: 'foo'
        },
        expected: 'e-alert__icon'
      },
      {
        name: 'should return HTML with the icon referred when icon is set',
        data: {
          icon: 'foo'
        },
        expected: '#foo'
      },
      {
        name: 'should return HTML with text message',
        data: {
          text: 'lorem ipsum dolor sit amet'
        },
        expected: 'lorem ipsum dolor sit amet'
      }
    ];

    testCases.forEach(function(test) {
      it(test.name, function() {
        var html = messageHandler.getHtml(test.data);
        expect(html).to.have.string(test.expected);
      });
    });
  });
});
