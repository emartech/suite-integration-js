'use strict';

class IntegrationApi {

  constructor(window) {
    this.window = window;
    this.unload = {
      initialized: false
    };
  }

  get params() {
    if (document.getElementsByTagName('e-modal').length) {
      return JSON.parse(document.getElementsByTagName('e-modal')[0].getAttribute('data-params'));
    }

    return JSON.parse(document.body.getAttribute('data-params'));
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
