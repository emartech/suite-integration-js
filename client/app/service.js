'use strict';

var ServiceApi = require('./service/service_api');
var DialogApi = require('./service/dialog_api');

(function(global) {

  global.SUITE = global.SUITE || {};
  global.SUITE.integration = ServiceApi.create(global);
  global.SUITE.integration.dialog = DialogApi.create(global);

})(window);
