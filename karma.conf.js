'use strict';

var tasks = require('boar-tasks');
var taskConfigs = require('./tasks.config');

function initializeTests(config) {
  config.frameworks.push('phantomjs-shim');
}

module.exports = function(config) {
  var configHash = tasks.getKarmaConfig(taskConfigs);

  configHash.reporters = ['mocha'];

  configHash.plugins = [
    'karma-mocha',
    'karma-browserify',
    'karma-sinon-chai',
    'karma-phantomjs-launcher',
    'karma-phantomjs-shim',
    'karma-mocha-reporter'
  ];

  initializeTests(configHash);

  config.set(configHash);
};
