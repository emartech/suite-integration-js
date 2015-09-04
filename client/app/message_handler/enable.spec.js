'use strict';

describe('Enable Handler', function() {

  var fakeWindow;
  var messageHandler;
  var fakeSelection = 'fake_selection';

  beforeEach(function() {
    fakeWindow = require('../mocks/fake_window').create();
    messageHandler = require('./enable').create(fakeWindow);
  });

  it('should listen to messages with event "enable"', function() {
    expect(messageHandler.MESSAGE_EVENT).to.be.eql('enable');
  });

  it('should select the element with selection passed', function() {
    messageHandler.handleMessage({
      selection: fakeSelection
    });
    expect(fakeWindow.$).to.have.been.calledWith(fakeSelection);
  });

  it('should remove the class "e-btn-disabled" from the element selected', function() {
    messageHandler.handleMessage({
      selection: fakeSelection
    });
    expect(fakeWindow.$(fakeSelection).removeClass).to.have.been.calledWith('e-btn-disabled');
  });

});
