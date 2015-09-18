'use strict';

var ConfirmHandler = require('./confirm');

class MessageHandlerUnloadInit extends ConfirmHandler {

  get MESSAGE_EVENT() {
    return 'unload:init';
  }

  handleMessage(message) {
    var defaultConfirm = {
      ok: this.window.gettext('Ok'),
      cancel: this.window.gettext('Cancel'),
      source: {
        integration_id: 'SUITE'
      }
    };

    message.confirm = $.extend({}, defaultConfirm, message.confirm);

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

        message.confirm.params = {
          url: event.target.href
        };
        message.confirm.dialogId = Math.floor(Math.random() * 10000000);

        this.window.SUITE.integration.dialog.confirm(message.confirm).then((message) => {
          $(this.window).off('beforeunload');
          window.location.href = message.url;
        }).always(() => {
          this.window.SUITE.integration.dialog.close();
        });
      });
  }

  static create(global) {
    return new MessageHandlerUnloadInit(global);
  }

}

module.exports = MessageHandlerUnloadInit;
