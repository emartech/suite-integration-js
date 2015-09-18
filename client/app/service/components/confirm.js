'use strict';

var Dialog = require('./dialog');

class Confirm extends Dialog {

  get modalType() {
    return 'standard';
  }

  render(options) {
    super.render(options);

    var $eModal = this.window.$('e-modal');
    $eModal.attr('data-params', JSON.stringify({
      integrationId: options.source.integration_id,
      integrationInstanceId: 'SUITE',
      openerIntegrationInstanceId: options.source.integration_instance_id,
      dialogId: options.dialogId
    }));
  }

  getButtonHtml(onClick, classNames, text) {
    return [
      '<button type="button" onClick="' + onClick + '" class="' + classNames + '">',
      this.cleanMessage(text),
      '</button>'
    ].join('');
  }

  getModalContent(options) {
    var retval = [
      '<h2>' + this.cleanMessage(options.title) + '</h2>'
    ];

    if (options.body) {
      retval.push('<p>' + this.cleanMessage(options.body) + '</p>');
    }

    retval.push('<div class="e-buttongroup">');
    retval.push(this.getButtonHtml(
      'window.SUITE.integration.dialog.submit(false)',
      'e-btn',
      options.cancel));
    retval.push(this.getButtonHtml(
      'window.SUITE.integration.dialog.submit(true)',
      'e-btn e-btn-primary',
      options.ok));
    retval.push('</div>');

    return retval.join('\n');
  }

}

module.exports = Confirm;
