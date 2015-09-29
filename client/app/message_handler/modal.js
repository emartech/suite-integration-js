'use strict';

var AbstractMessageHandler = require('./abstract_message_handler');

class MessageHandlerModal extends AbstractMessageHandler {

  get MESSAGE_EVENT() {
    return 'modal';
  }

  handleMessage(message) {
    if (message.src.match(/^\/{1}[^\/]+/)) {
      message.src = '//' + this.window.location.host + message.src;
      message.src = message.src.replace('{session_id}', this.window.SUITE.config.session_id);
    }

    this.window.SUITE.integration.dialog.modal(message);
  }

  static create(global) {
    return new MessageHandlerModal(global);
  }

}

module.exports = MessageHandlerModal;
