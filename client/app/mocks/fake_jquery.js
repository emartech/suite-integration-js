'use strict';

var sinon = require('sinon');
var _ = require('lodash');

class FakeJQuery extends Array {
  constructor() {
    super();

    this.removeClass = sinon.stub();

    this.off = sinon.stub();

    this.push({
      contentWindow: {
        postMessage: sinon.stub()
      }
    });
  }

  static create() {
    var retval = sinon.stub().returns(new FakeJQuery());
    retval.extend = _.extend;
    return retval;
  }
}

module.exports = FakeJQuery;
