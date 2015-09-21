'use strict';

var AbstractMessageHandler = require('./abstract_message_handler');

class MessageHandlerUnloadConfirm extends AbstractMessageHandler {

  get MESSAGE_EVENT() {
    return 'unload:confirmed';
  }

  handleMessage(message) {
    if (message.confirmed) {
      this.window.SUITE.integration.dialog.deferreds[message.confirmId].resolve(true);
    } else {
      var confirmComponent = this.window.SUITE.integration.dialog.confirmComponents[message.confirmId];
      confirmComponent.render();
    }
  }

  static create(global) {
    return new MessageHandlerUnloadConfirm(global);
  }

}

module.exports = MessageHandlerUnloadConfirm;
