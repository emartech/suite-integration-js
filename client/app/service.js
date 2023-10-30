'use strict';

var ServiceApi = require('./service/service_api');
var DialogApi = require('./service/dialog_api');
var Logger = require('./logger');

(function(global) {

  global.SUITE = global.SUITE || {};
  global.SUITE.integration = ServiceApi.create(global);
  global.SUITE.integration.dialog = DialogApi.create(global);

  Logger.sendLog('serviceJs loaded');
})(window);
