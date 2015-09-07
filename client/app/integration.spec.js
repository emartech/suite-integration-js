'use strict';

var sinon = require('sinon');

describe('Integration', function() {

  var fakeWindow;
  var alertHandler;
  var refreshHandler;

  beforeEach(function() {
    fakeWindow = require('./mocks/fake_window').create();
    alertHandler = require('./message_handler/alert').create(fakeWindow);
    refreshHandler = require('./message_handler/refresh').create(fakeWindow);
  });

  it('should trigger alertHandler when receiving an "alert" event', function() {
    var eventData = {
      data: {
        event: 'alert'
      }
    };

    sinon.stub(alertHandler, 'handleMessage');
    fakeWindow.trigger('message', eventData);

    expect(alertHandler.handleMessage).to.have.been.calledWith(eventData.data);
  });

  it('should not trigger refreshHandler when receiving an "alert" event', function() {
    var eventData = {
      data: {
        event: 'alert'
      }
    };

    sinon.stub(alertHandler, 'handleMessage');
    sinon.stub(refreshHandler, 'handleMessage');
    fakeWindow.trigger('message', eventData);

    expect(refreshHandler.handleMessage).to.have.callCount(0);
  });
});
