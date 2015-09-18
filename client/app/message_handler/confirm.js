'use strict';

var AbstractMessageHandler = require('./abstract_message_handler');

class MessageHandlerConfirm extends AbstractMessageHandler {

  get MESSAGE_EVENT() {
    return 'confirm';
  }

  handleMessage(message) {
    this.window.SUITE.integration.dialog.confirm(message);
  }

  static create(global) {
    return new MessageHandlerConfirm(global);
  }

}

module.exports = MessageHandlerConfirm;
