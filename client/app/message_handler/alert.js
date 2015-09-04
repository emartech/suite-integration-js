'use strict';

var AbstractMessageHandler = require('./abstract_message_handler');

class MessageHandlerAlert extends AbstractMessageHandler {

  get MESSAGE_EVENT() {
    return 'alert';
  }

  handleMessage(message) {
    message.timeout = message.timeout || 5000;

    var $eAlert = $('<div class="e-alert e-alert-fixed"></div>')
      .append($('<span class="e-alert__message">' + $('<div>' + message.text + '</div>').text() + '</span>'));

    if (message.className) {
      $eAlert.addClass(message.className);
    }

    if (message.icon) {
      $eAlert.addClass('e-alert-withicon')
        .prepend($('<span class="e-alert__icon"></span>')
          .append($('<svg class="e-icon"><use xlink:href="#' + message.icon + '"></use></svg>')));
    }

    $('body').append($eAlert);

    window.setTimeout(function() {
      $eAlert.fadeOut('normal', function() {
        $(this).remove();
      });
    }, message.timeout);
  }

  static create(global) {
    return new MessageHandlerAlert(global);
  }

}

module.exports = MessageHandlerAlert;
