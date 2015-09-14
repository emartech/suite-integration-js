'use strict';

var AbstractMessageHandler = require('./abstract_message_handler');

class MessageHandlerModal extends AbstractMessageHandler {

  get MESSAGE_EVENT() {
    return 'modal';
  }

  getAttributes(message, integrationInstanceId) {
    var attributes = [
      'frameborder="0"',
      'class="integration integration-' + message.source.integration_id + '"',
      'id="integration-' + integrationInstanceId + '"'
    ];

    ['src', 'width', 'height'].forEach((attributeName) => {
      attributes.push(attributeName + '="' + message[attributeName] + '"');
    });

    return attributes;
  }

  decorateUrl(message, integrationInstanceId) {
    var glue = message.src.indexOf('?') < 0 ? '?' : '&';

    var params = [
      'integration_id=' + message.source.integration_id,
      'integration_instance_id=' + integrationInstanceId,
      'opener_integration_instance_id=' + message.source.integration_instance_id
    ];

    return message.src + glue + params.join('&');
  }

  getHtml(message, integrationInstanceId) {
    message.width = message.width || 650;
    message.height= message.height || 500;
    message.src = this.decorateUrl(message, integrationInstanceId);

    var markup = [
      '<e-modal>',
      '<iframe ' + this.getAttributes(message, integrationInstanceId).join(' ') + '></iframe>',
      '</e-modal>'
    ];

    return markup.join('\n');
  }

  handleMessage(message) {
    var $eModal = $(this.getHtml(message, Math.floor(Math.random() * 1000000000)));
    $('body').append($eModal);

    this.window.riot.mount($eModal[0], {
      opened: true,
      type: 'iframe',
      width: message.width
    });

    $eModal.css('opacity', 0);
    $eModal.find('iframe').load(() => {
      this.window.setTimeout(() => {
        $eModal.css('opacity', 1);
      }, 0);
    });
  }

  static create(global) {
    return new MessageHandlerModal(global);
  }

}

module.exports = MessageHandlerModal;
