'use strict';

var IntegrationApi = require('./integration_api');

class DialogApi extends IntegrationApi {

  submit(success, data) {
    data = data || {};
    var message = {
      event: 'modal',
      modalId: this.params.modalId,
      success: success
    };

    Object.keys(data).forEach((key) => {
      message[key] = data[key];
    });

    this.window.SUITE.integration.messageToService(message, this.params.openerIntegrationInstanceId);
  }

  resize() {
    this.window.SUITE.integration.messageToSuite({
      event: 'resize',
      height: this.window.document.getElementsByClassName('modal-container')[0].scrollHeight
    });
  }

  close() {
    var message = {
      event: 'modal:close'
    };

    this.window.SUITE.integration.messageToSuite(message);
  }

  static create(global) {
    return new DialogApi(global);
  }

}

module.exports = DialogApi;
