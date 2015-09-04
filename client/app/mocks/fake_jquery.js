'use strict';

var sinon = require('sinon');

class FakeJQuery {
  constructor() {
    this.removeClass = sinon.stub();
  }

  static create() {
    return sinon.stub().returns(new FakeJQuery());
  }
}

module.exports = FakeJQuery;
