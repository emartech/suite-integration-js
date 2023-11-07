'use strict';

var IntegrationApi = require('./integration_api');
var Logger = require('../logger');

class ServiceApi extends IntegrationApi {

  messageToService(message, targetInstanceId) {
    this.messageToSuite(this.wrapToProxy(message, targetInstanceId));
  }

  messageToSuite(message) {

    if (message.event) {
      Logger.sendLog(`ServiceApi messageToSuite-${message.event}`);
    }

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
