'use strict';

var sinon = require('sinon');

class FakeJQuery extends Array {
  constructor() {
    super();

    this.removeClass = sinon.stub();

    this.push({
      contentWindow: {
        postMessage: sinon.stub()
      }
    });
  }

  static create() {
    return sinon.stub().returns(new FakeJQuery());
  }
}

module.exports = FakeJQuery;
