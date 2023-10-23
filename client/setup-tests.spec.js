'use strict';

require('babel-polyfill');

const sinon = global.sinon || {};
const chai = require('chai');
const sinonChai = require('sinon-chai');

before(function() {
  chai.use(sinonChai);
  global.expect = chai.expect;
});

beforeEach(function() {
  this.sandbox = sinon.sandbox.create();
});

afterEach(function() {
  this.sandbox.restore();
});

Array.prototype.runTests = function(testRunner) {
  if (typeof testRunner !== 'function') {
    throw new Error('Test runner should be a function');
  }

  this.forEach(function(test) {
    it(test.name, testRunner.bind(this, test));
  });
};
