'use strict';

(function(global) {
  global.SUITE = global.SUITE || {};
  global.SUITE.integration = {};

  require('./message_handler/alert').create(global);
  require('./message_handler/enable').create(global);
  require('./message_handler/modal').create(global);
  require('./message_handler/modal_close').create(global);
  require('./message_handler/navigate').create(global);
  require('./message_handler/proxy').create(global);
  require('./message_handler/refresh').create(global);
  require('./message_handler/resize').create(global);
})(window);
