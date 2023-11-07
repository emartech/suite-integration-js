'use strict';
const Logger = require('./logger');

var SuiteApi = require('./service/suite_api');
var DialogApi = require('./service/dialog_api');

(function(global) {

  global.SUITE = global.SUITE || {};
  global.SUITE.integration = SuiteApi.create(global);
  global.SUITE.integration.dialog = DialogApi.create(global);

  require('./message_handler/alert').create(global);
  require('./message_handler/confirm').create(global);
  require('./message_handler/enable').create(global);
  require('./message_handler/modal').create(global);
  require('./message_handler/modal_close').create(global);
  require('./message_handler/navigate').create(global);
  require('./message_handler/proxy').create(global);
  require('./message_handler/refresh').create(global);
  require('./message_handler/resize').create(global);
  require('./message_handler/unload_init').create(global);
  require('./message_handler/unload_reset').create(global);

  Logger.sendLog('integrationJs loaded');
})(window);
