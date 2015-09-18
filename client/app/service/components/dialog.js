'use strict';

class Dialog {

  constructor(global) {
    this.window = global;
  }

  render(options) {
    var $eModal = this.window.$(this.getHtml(options, Math.floor(Math.random() * 1000000000)));
    this.window.$('body').append($eModal);

    this.window.riot.mount($eModal[0], {
      opened: true,
      type: this.modalType,
      width: options.width
    });
  }

  getHtml(message, integrationInstanceId) {
    return [
      '<e-modal opened="true">',
      this.getModalContent(message, integrationInstanceId),
      '</e-modal>'
    ].join('\n');
  }

  cleanMessage(text) {
    return this.window.$('<div>' + text + '</div>').text();
  }

}

module.exports = Dialog;
