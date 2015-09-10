'use strict';

var AbstractMessageHandler = require('./abstract_message_handler');

class MessageHandlerProxy extends AbstractMessageHandler {

  get MESSAGE_EVENT() {
    return 'proxy';
  }

  handleMessage(message) {
    message.envelope = message.envelope || {};

    this.getIntegrationIframe(message.integrationInstanceId)
      .contentWindow.postMessage(message.envelope, '*');
  }

  static create(global) {
    return new MessageHandlerProxy(global);
  }

}

module.exports = MessageHandlerProxy;
