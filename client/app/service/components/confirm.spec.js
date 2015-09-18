'use strict';

var sinon = require('sinon');
var ConfirmComponent = require('./confirm');

describe('Confirm Component', function() {

  var fakeWindow;
  var confirmComponent;

  beforeEach(function() {
    fakeWindow = require('../../mocks/fake_window').create();
    confirmComponent = new ConfirmComponent(fakeWindow);

    sinon.stub(confirmComponent, 'cleanMessage', function(text) {
      return text;
    });
  });

  describe('#getModalContent', function() {
    var testCases = [
      {
        name: 'should return HTML with modal title',
        data: {
          title: 'foo'
        },
        expected: '<h2>foo</h2>'
      },
      {
        name: 'should return HTML with modal body',
        data: {
          title: 'foo',
          body: 'bar'
        },
        expected: '<p>bar</p>'
      },
      {
        name: 'should return HTML with a cancel button',
        data: {
          title: 'foo',
          ok: 'yes',
          cancel: 'no'
        },
        regexpected: new RegExp('<button type="button".*class="e-btn">no</button>')
      },
      {
        name: 'should return HTML with an ok button',
        data: {
          title: 'foo',
          ok: 'yes',
          cancel: 'no'
        },
        regexpected: new RegExp('<button type="button".*class="e-btn e-btn-primary">yes</button>')
      }
    ];

    testCases.forEach(function(test) {
      it(test.name, function() {
        test.data.source = {
          integration_id: 'foo-integration',
          integration_instance_id: 1234
        };

        var html = confirmComponent.getModalContent(test.data);
        if (test.regexpected) {
          expect(html).to.match(test.regexpected);
        } else {
          expect(html).to.have.string(test.expected);
        }
      });
    });
  });

  describe('#getButtomHtml', function() {
    beforeEach(function() {
      fakeWindow = require('../../mocks/fake_window').create();
      confirmComponent = new ConfirmComponent(fakeWindow);

      sinon.stub(confirmComponent, 'cleanMessage', function(text) {
        return text;
      });
    });

    it('should provide HTML for a button', function() {
      var buttonHtml = confirmComponent.getButtonHtml('foo', 'bar', 'text');

      var expected = '<button type="button" onClick="foo" class="bar">text</button>';
      expect(buttonHtml).to.be.eql(expected);
    });

    it('should use cleanMessage to clean button text', function() {
      confirmComponent.getButtonHtml('foo', 'bar', 'text');
      expect(confirmComponent.cleanMessage).to.have.been.calledWith('text');
    });
  });

});
