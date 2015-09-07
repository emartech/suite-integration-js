'use strict';

var AbstractMessageHandler = require('./abstract_message_handler');

class MessageHandlerResize extends AbstractMessageHandler {

  get MESSAGE_EVENT() {
    return 'resize';
  }

  getIntegrationIframe(source) {
    if (!source || !source.integration_instance_id) {
      throw new Error('Message source is unknown');
    }

    return this.window.document.getElementById('#integration-' + source.integration_instance_id);
  }

  handleMessage(message) {
    var height = parseInt(message.height, 10);
    var $iframe = $(this.getIntegrationIframe(message.source));

    if (height) {
      $iframe
        .height(height)
        .parent()
        .height(height);
    }
  }

  static create(global) {
    return new MessageHandlerResize(global);
  }

}

module.exports = MessageHandlerResize;
