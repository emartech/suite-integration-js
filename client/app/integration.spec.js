'use strict';

describe('Integration', function() {

  var fakeWindow;
  var alertHandler;
  var refreshHandler;

  beforeEach(function() {
    fakeWindow = require('./mocks/fake_window').create(this.sandbox);
    alertHandler = require('./message_handler/alert').create(fakeWindow);
    refreshHandler = require('./message_handler/refresh').create(fakeWindow);
  });

  it('should trigger alertHandler when receiving an "alert" event', function() {
    var eventData = {
      data: {
        event: 'alert'
      }
    };

    this.sandbox.stub(alertHandler, 'handleMessage');
    fakeWindow.trigger('message', eventData);

    expect(alertHandler.handleMessage).to.have.been.calledWith(eventData.data);
  });

  it('should not trigger refreshHandler when receiving an "alert" event', function() {
    var eventData = {
      data: {
        event: 'alert'
      }
    };

    this.sandbox.stub(alertHandler, 'handleMessage');
    this.sandbox.stub(refreshHandler, 'handleMessage');
    fakeWindow.trigger('message', eventData);

    expect(refreshHandler.handleMessage).to.have.callCount(0);
  });
});
