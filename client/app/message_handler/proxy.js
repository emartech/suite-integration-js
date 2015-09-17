'use strict';

var AbstractMessageHandler = require('./abstract_message_handler');

class MessageHandlerProxy extends AbstractMessageHandler {

  get MESSAGE_EVENT() {
    return 'proxy';
  }

  handleMessage(message) {
    message.envelope = message.envelope || {};
    this.window.SUITE.integration.messageToService(message.envelope, message.integrationInstanceId);
  }

  static create(global) {
    return new MessageHandlerProxy(global);
  }

}

module.exports = MessageHandlerProxy;
