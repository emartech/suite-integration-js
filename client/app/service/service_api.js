'use strict';

var IntegrationApi = require('./integration_api');

class ServiceApi extends IntegrationApi {

  messageToService(message, targetInstanceId) {
    this.messageToSuite(this.wrapToProxy(message, targetInstanceId));
  }

  messageToSuite(message) {
    this.window.parent.postMessage(this.setMessageSource(message), '*');
  }

  wrapToProxy(message, integrationInstanceId) {
    return {
      event: 'proxy',
      envelope: message,
      integrationInstanceId: integrationInstanceId
    };
  }

  static create(global) {
    return new ServiceApi(global);
  }

}

module.exports = ServiceApi;
