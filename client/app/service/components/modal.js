'use strict';

var Dialog = require('./dialog');

class Modal extends Dialog {

  get modalType() {
    return 'iframe';
  }

  render() {
    super.render();

    var $eModal = $('e-modal');
    $eModal.css('opacity', 0);
    $eModal.find('iframe').load(() => {
      this.window.setTimeout(() => {
        $eModal.css('opacity', 1);
      }, 0);
    });
  }

  getAttributes(options, integrationInstanceId) {
    var attributes = [
      'frameborder="0"',
      'class="integration integration-' + options.source.integration_id + '"',
      'id="integration-' + integrationInstanceId + '"'
    ];

    ['src', 'width', 'height'].forEach((attributeName) => {
      attributes.push(attributeName + '="' + options[attributeName] + '"');
    });

    return attributes;
  }

  decorateUrl(options, integrationInstanceId) {
    var glue = options.src.indexOf('?') < 0 ? '?' : '&';

    var params = [
      'integration_id=' + options.source.integration_id,
      'integration_instance_id=' + integrationInstanceId,
      'opener_integration_instance_id=' + options.source.integration_instance_id
    ];

    return options.src + glue + params.join('&');
  }

  getModalContent(options, integrationInstanceId) {
    options.width = options.width || 650;
    options.height = options.height || 500;
    options.src = this.decorateUrl(options, integrationInstanceId);

    return '<iframe ' + this.getAttributes(options, integrationInstanceId).join(' ') + '></iframe>';
  }

}

module.exports = Modal;
