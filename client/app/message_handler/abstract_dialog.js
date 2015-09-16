'use strict';

var AbstractMessageHandler = require('./abstract_message_handler');

class AbstractDialog extends AbstractMessageHandler {

  getHtml(message, integrationInstanceId) {
    return [
      '<e-modal opened="true">',
      this.getModalContent(message, integrationInstanceId),
      '</e-modal>'
    ].join('\n');
  }

  handleMessage(message) {
    var $eModal = this.window.$(this.getHtml(message, Math.floor(Math.random() * 1000000000)));
    this.window.$('body').append($eModal);

    this.window.riot.mount($eModal[0], {
      opened: true,
      type: (this.MESSAGE_EVENT === 'modal' ? 'iframe' : 'standard'),
      width: message.width
    });
  }

}

module.exports = AbstractDialog;
