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

  describe('#getAttributes', function() {
    var attributes;

    beforeEach(function() {
      attributes = messageHandler.getAttributes({
        src: 'http://example.com',
        width: 100,
        height: 200,
        shouldNotPass: 'really',
        source: {
          integration_id: 'foo-integration',
          integration_instance_id: 1234
        }
      }, 9876);
    });

    it('should return src attribute', function() {
      expect(attributes).to.contain('src="http://example.com"');
    });

    it('should return width attribute', function() {
      expect(attributes).to.contain('width="100"');
    });

    it('should return height attribute', function() {
      expect(attributes).to.contain('height="200"');
    });

    it('should return integration class', function() {
      expect(attributes).to.contain('class="integration integration-foo-integration"');
    });

    it('should return integration id', function() {
      expect(attributes).to.contain('id="integration-9876"');
    });

    it('should return frameborder', function() {
      expect(attributes).to.contain('frameborder="0"');
    });

    it('should not return any other attribute', function() {
      expect(attributes).to.have.length(6);
    });
  });

  describe('#getHtml', function() {
    var testCases = [
      {
        name: 'should return HTML with e-modal tag',
        data: {
          src: 'http://example.com'
        },
        expected: '<e-modal'
      },
      {
        name: 'should set width to 650 by default',
        data: {
          src: 'http://example.com'
        },
        expected: 'width="650"'
      },
      {
        name: 'should set height to 500 by default',
        data: {
          src: 'http://example.com'
        },
        expected: 'height="500"'
      },
      {
        name: 'should return HTML with iframe',
        data: {
          src: 'http://example.com'
        },
        expected: '<iframe'
      },
      {
        name: 'should return HTML with iframe with proper src',
        data: {
          src: 'http://example.com'
        },
        expected: [
          'src="http://example.com?integration_id=foo-integration',
          'integration_instance_id=9876',
          'opener_integration_instance_id=1234"'
        ].join('&')
      },
      {
        name: 'should return HTML with iframe with proper src for src with params too',
        data: {
          src: 'http://example.com?param=foo'
        },
        expected: [
          'src="http://example.com?param=foo',
          'integration_id=foo-integration',
          'integration_instance_id=9876',
          'opener_integration_instance_id=1234"'
        ].join('&')
      },
      {
        name: 'should set width to value passed',
        data: {
          src: 'http://example.com',
          width: 100
        },
        expected: 'width="100"'
      },
      {
        name: 'should set height to value passed',
        data: {
          src: 'http://example.com',
          height: 200
        },
        expected: 'height="200"'
      }
    ];

    testCases.forEach(function(test) {
      it(test.name, function() {
        test.data.source = {
          integration_id: 'foo-integration',
          integration_instance_id: 1234
        };

        var html = messageHandler.getHtml(test.data, 9876);
        expect(html).to.have.string(test.expected);
      });
    });
  });
});
