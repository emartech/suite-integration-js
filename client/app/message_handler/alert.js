'use strict';

var AbstractMessageHandler = require('./abstract_message_handler');

class MessageHandlerAlert extends AbstractMessageHandler {

  get MESSAGE_EVENT() {
    return 'alert';
  }

  getClassNames(message) {
    var classNames = [
      'e-alert'
    ];

    if (message.className) {
      classNames.push(message.className);
    }

    if (message.icon) {
      classNames.push('e-alert-withicon');
    }

    return classNames;
  }

  getHtml(message) {
    var markup = [
      '<div class="' + this.getClassNames(message).join(' ') + '">'
    ];

    if (message.icon) {
      markup.push('<span class="e-alert__icon">');
      markup.push('<svg class="e-icon"><use xlink:href="#' + message.icon + '"></use></svg>');
      markup.push('</span>');
    }

    markup.push('<span class="e-alert__message">' + this.cleanMessage(message.text) + '</span>');
    markup.push('<div>');

    return markup.join('\n');
  }

  handleMessage(message) {
    message.timeout = message.timeout || 5000;

    var $eAlert = $(this.getHtml(message));
    $eAlert.appendTo(this.getMessageContainerElement());

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
