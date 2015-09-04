'use strict';

var AbstractMessageHandler = require('./abstract_message_handler');

class MessageHandlerModal extends AbstractMessageHandler {

  get MESSAGE_EVENT() {
    return 'modal';
  }

  handleMessage(message) {
    $('body').append(
      $(message.content).attr(
        Object.keys(message.source).reduce(function(memo, key) {
          memo['data-' + key] = message.source[key];
          return memo;
        }, {})
      )
    );
  }

  static create(global) {
    return new MessageHandlerModal(global);
  }

}

module.exports = MessageHandlerModal;
