'use strict';

var AbstractMessageHandler = require('./abstract_message_handler');

class MessageHandlerEnable extends AbstractMessageHandler {

  get MESSAGE_EVENT() {
    return 'enable';
  }

  handleMessage(message) {
    this.window.$(message.selection)
      .removeClass('e-btn-disabled');
  }

  static create(global) {
    return new MessageHandlerEnable(global);
  }

}

module.exports = MessageHandlerEnable;
