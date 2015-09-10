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

  getIntegrationIframe(integrationInstanceId) {
    return this.window.document.getElementById('integration-' + integrationInstanceId);
  }

}

module.exports = AbstractMessageHandler;
