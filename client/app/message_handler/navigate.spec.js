'use strict';

describe('Navigate Handler', function() {

  var fakeWindow;
  var messageHandler;

  beforeEach(function() {
    fakeWindow = require('../mocks/fake_window').create();
    messageHandler = require('./navigate').create(fakeWindow);
  });

  it('should listen to messages with event "navigate"', function() {
    expect(messageHandler.MESSAGE_EVENT).to.be.eql('navigate');
  });

  it('should set proper location when calling handleMessage with params', function() {
    messageHandler.handleMessage({
      event: 'navigate',
      target: {
        pathname: 'email_analysis/details',
        campaign_id: 666,
        launch_id: 999
      }
    });

    expect(fakeWindow.location.href).to.eql([
      'repmanager.php?session_id=SESSIONID',
      'changed=0',
      'action=analysis',
      'camp_id=666',
      'launch_id=999',
      'page=1',
      'search=',
      'step=1',
      'save_pref=on',
      'tabdetails_length=10',
      'tabfull_length=10',
      'campaign_category=',
      'admin=n',
      'status=current',
      'type=all'
    ].join('&'));
  });

  it('should set proper location when calling handleMessage without params', function() {
    messageHandler.handleMessage({
      event: 'navigate',
      target: {
        pathname: 'email_campaigns/list'
      }
    });

    expect(fakeWindow.location.href).to.eql('campaignmanager.php?session_id=SESSIONID&action=list');
  });

  it('should throw 404 when calling getUrlByPathname with invalid pathname', function() {
    var exceptionThrown;

    try {
      messageHandler.getUrlByPathname('invalid/pathname');
    } catch (e) {
      exceptionThrown = e;
    }

    expect(exceptionThrown.message).to.eql('Error 404: Unknown pathname');
  });
});
