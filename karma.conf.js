'use strict';

const tasks = require('boar-tasks-client');
const taskConfigs = require('./tasks.config');

module.exports = function(config) {
  let configHash = tasks.getKarmaConfig(taskConfigs);

  configHash.reporters = ['dots'];

  configHash.plugins = configHash.plugins.concat([
    require('karma-phantomjs-shim')
  ]);

  configHash.frameworks = configHash.frameworks.concat([
    'phantomjs-shim'
  ]);

  config.set(configHash);
};
