'use strict';

var AbstractMessageHandler = require('./abstract_message_handler');

class MessageHandlerUnloadInit extends AbstractMessageHandler {

  get MESSAGE_EVENT() {
    return 'unload:init';
  }

  handleMessage(message) {
    this.getNavigationConfirmOptions(message);

    $(this.window).off('beforeunload');
    $(this.window).on('beforeunload', function() {
      return message.confirm.body;
    });

    $(message.selection)
      .off('click.confirm_navigation')
      .on('click.confirm_navigation', 'a[href][target!="_blank"]:not([onclick])', (event) => {
        if (event.ctrlKey || event.metaKey || event.which === 2 || !event.target.hostname) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        this.window.SUITE.integration.dialog.confirm(message.confirm).then(() => {
          this.window.$(this.window).off('beforeunload');
          this.window.location.href = event.target.href;
        }).always(() => {
          this.window.SUITE.integration.dialog.close();
        });
      });

    this.window.SUITE.integration.unloadInitialized = true;
  }

  static create(global) {
    return new MessageHandlerUnloadInit(global);
  }

}

module.exports = MessageHandlerUnloadInit;
