'use strict';

class IntegrationApi {

  constructor(window) {
    this.window = window;
    this.unload = {
      initialized: false
    };
  }

  get params() {
    return this._getParams();
  }

  _getParams() {
    if (document.getElementsByTagName('e-modal').length) {
      return JSON.parse(document.getElementsByTagName('e-modal')[0].getAttribute('data-params'));
    } else if (document.body.hasAttribute('data-params')) {
      return JSON.parse(document.body.getAttribute('data-params'));
    }

    return {
      integrationId: 'SUITE',
      integrationInstanceId: 'SUITE'
    };
  }

  setMessageSource(message) {
    message.source = {
      integration_id: this.params.integrationId,
      integration_instance_id: this.params.integrationInstanceId
    };

    return message;
  }

}

module.exports = IntegrationApi;
