'use strict';

class FakeIframe {
  constructor(sandbox) {
    this.contentWindow = {
      postMessage: sandbox.stub()
    };
  }

  static create(sandbox) {
    return new FakeIframe(sandbox);
  }
}

module.exports = FakeIframe;
