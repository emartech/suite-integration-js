'use strict';

var AbstractDialog = require('./abstract_dialog');

class MessageHandlerConfirm extends AbstractDialog {

  get MESSAGE_EVENT() {
    return 'confirm';
  }

  getButtonHtml(onClick, classNames, text) {
    return [
      '<button type="button" onClick="' + onClick + '" class="' + classNames + '">',
      this.cleanMessage(text),
      '</button>'
    ].join('');
  }

  getModalContent(message) {
    var retval = [
      '<h2>' + this.cleanMessage(message.title) + '</h2>'
    ];

    if (message.body) {
      retval.push('<p>' + this.cleanMessage(message.body) + '</p>');
    }

    retval.push('<div class="e-buttongroup">');
    retval.push(this.getButtonHtml(
      'window.SUITE.integration.dialog.submit(false)',
      'e-btn',
      message.cancel));
    retval.push(this.getButtonHtml(
      'window.SUITE.integration.dialog.submit(true)',
      'e-btn e-btn-primary',
      message.ok));
    retval.push('</div>');

    return retval.join('\n');
  }

  handleMessage(message) {
    super.handleMessage(message);

    var $eModal = this.window.$('e-modal');
    $eModal.attr('data-params', JSON.stringify({
      integrationId: message.source.integration_id,
      integrationInstanceId: 'SUITE',
      openerIntegrationInstanceId: message.source.integration_instance_id,
      modalId: message.modalId
    }));
  }

  static create(global) {
    return new MessageHandlerConfirm(global);
  }

}

module.exports = MessageHandlerConfirm;
