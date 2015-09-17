'use strict';

var IntegrationApi = require('./integration_api');

class SuiteApi extends IntegrationApi {

  sendMessage(message, integrationInstanceId) {
    console.log('Method integration.sendMessage() is deprecated. Use integration.messageToService() instead.');
    this.messageToService(message, integrationInstanceId);
  }

  messageToService(message, targetInstanceId) {
    this.window.$('#integration-' + targetInstanceId)[0].contentWindow.postMessage(message, '*');
  }

  messageToSuite(message) {
    this.window.postMessage(this.setMessageSource(message), '*');
  }

  static create(global) {
    return new SuiteApi(global);
  }

}

module.exports = SuiteApi;
