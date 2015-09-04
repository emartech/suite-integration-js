'use strict';

(function(global) {
  require('./message_handler/alert').create(global);
  require('./message_handler/enable').create(global);
  require('./message_handler/modal').create(global);
  require('./message_handler/navigate').create(global);
  require('./message_handler/refresh').create(global);
  require('./message_handler/resize').create(global);

  global.SUITE = global.SUITE || {};
  global.SUITE.integration = {
    sendMessage: function(message, integrationInstanceId) {
      var iframe = $('#integration-' + integrationInstanceId)[0];
      iframe.contentWindow.postMessage(message, '*');
    },

    closeModal: function(modalId) {
      $('#' + modalId).remove();
    }
  };
})(window);
