'use strict';

var IntegrationApi = require('./integration_api');
var Logger = require('../logger');


class SuiteApi extends IntegrationApi {

  sendMessage(message, integrationInstanceId) {
    console.log('Method integration.sendMessage() is deprecated. Use integration.messageToService() instead.');
    this.messageToService(message, integrationInstanceId);
  }

  messageToService(message, targetInstanceId) {
    this.window.$('#integration-' + targetInstanceId)[0].contentWindow.postMessage(message, '*');
    Logger.sendLog(`SuiteApi messageToService ${message.event}`);
  }

  messageToSuite(message) {
    this.window.postMessage(this.setMessageSource(message), '*');
    Logger.sendLog(`SuiteApi messageToSuite ${message.event}`);
  }

  static create(global) {
    return new SuiteApi(global);
  }

}

module.exports = SuiteApi;
