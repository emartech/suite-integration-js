'use strict';

var AbstractMessageHandler = require('./abstract_message_handler');

class MessageHandlerUnloadInit extends AbstractMessageHandler {

  get MESSAGE_EVENT() {
    return 'unload:init';
  }

  handleMessage(message) {
    var eventNamespace = 'confirm_navigation_' + message.source.integration_instance_id;

    message.confirm = this.getNavigationConfirmOptions(message);

    $(this.window).off('beforeunload.' + eventNamespace);
    $(this.window).on('beforeunload.' + eventNamespace, function() {
      return message.confirm.body;
    });

    $(message.selection)
      .off('click.' + eventNamespace)
      .on('click.' + eventNamespace, 'a[href][target!="_blank"]:not([onclick])', (event) => {
        if (event.ctrlKey || event.metaKey || event.which === 2 || !event.target.hostname) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        this.window.SUITE.integration.dialog.confirmNavigation(event.target.href, message.confirm);
      });

    this.window.SUITE.integration.unload.initialized = true;
    if (message.confirm.optional) {
      message.confirm.askFrom = message.source.integration_instance_id;
    }
  }

  static create(global) {
    return new MessageHandlerUnloadInit(global);
  }

}

module.exports = MessageHandlerUnloadInit;
