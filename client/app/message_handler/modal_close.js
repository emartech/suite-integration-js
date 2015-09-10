'use strict';

var AbstractMessageHandler = require('./abstract_message_handler');

class MessageHandlerModalClose extends AbstractMessageHandler {

  get MESSAGE_EVENT() {
    return 'modal:close';
  }

  handleMessage() {
    $('e-modal').remove();
  }

  static create(global) {
    return new MessageHandlerModalClose(global);
  }

}

module.exports = MessageHandlerModalClose;
