'use strict';

class AbstractMessageHandler {

  constructor(global) {
    this.window = global;

    this.window.addEventListener('message', (e) => {
      var message = e.data;
      if (typeof message === 'undefined' || Object.prototype.toString.call(message) !== '[object Object]') {
        return;
      }

      if (message.event === this.MESSAGE_EVENT) {
        this.handleMessage(message);
      }
    });
  }

  cleanMessage(text) {
    return $('<div>' + text + '</div>').text();
  }

  getIntegrationIframe(integrationInstanceId) {
    return this.window.document.getElementById('integration-' + integrationInstanceId);
  }

  getNavigationConfirmOptions(message) {
    var defaultConfirm = {
      ok: this.window.gettext('Ok'),
      cancel: this.window.gettext('Cancel'),
      title: this.window.gettext('Confirm navigation'),
      body: this.window.gettext('You have unsaved changes you will lose if you leave this page.'),
      source: {
        integration_id: 'SUITE'
      }
    };

    message.confirm = this.window.$.extend({}, defaultConfirm, message.confirm);

    return message.confirm;
  }

}

module.exports = AbstractMessageHandler;
