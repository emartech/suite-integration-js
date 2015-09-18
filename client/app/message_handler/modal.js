'use strict';

var AbstractMessageHandler = require('./abstract_message_handler');

class MessageHandlerModal extends AbstractMessageHandler {

  get MESSAGE_EVENT() {
    return 'modal';
  }

  handleMessage(message) {
    this.window.SUITE.integration.dialog.modal(message);
  }

  static create(global) {
    return new MessageHandlerModal(global);
  }

}

module.exports = MessageHandlerModal;
