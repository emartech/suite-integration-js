'use strict';

const _extend = require('lodash/extend');
const jquery = require('jquery');

class FakeJQuery extends Array {
  constructor(sandbox) {
    super();

    this.appendTo = sandbox.stub();
    this.removeClass = sandbox.stub();

    this.removeClass = sandbox.stub();

    this.off = sandbox.stub();

    this.remove = sandbox.stub();

    this.attr = sandbox.stub();

    this.push({
      contentWindow: {
        postMessage: sandbox.stub()
      }
    });
  }

  static create(sandbox) {
    let retval = sandbox.stub().returns(new FakeJQuery(sandbox));
    retval.extend = _extend;
    retval.Deferred = jquery.Deferred;
    return retval;
  }
}

module.exports = FakeJQuery;
