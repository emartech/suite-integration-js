'use strict';

var AbstractDialog = require('./abstract_dialog');

class MessageHandlerModal extends AbstractDialog {

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

  getModalContent(message, integrationInstanceId) {
    message.width = message.width || 650;
    message.height= message.height || 500;
    message.src = this.decorateUrl(message, integrationInstanceId);

    return '<iframe ' + this.getAttributes(message, integrationInstanceId).join(' ') + '></iframe>';
  }

  handleMessage(message) {
    super.handleMessage(message);

    var $eModal = $('e-modal');
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
