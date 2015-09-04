'use strict';

var sinon = require('sinon');
var fakeJQuery = require('./fake_jquery');

class FakeWindow {
  constructor() {
    this.location = {
      pathname: 'mocked',
      reload: sinon.stub()
    };

    this.addEventListener = sinon.stub();

    this.getElementById = sinon.stub().returns('fake_element');

    this.SUITE = {
      config: {
        session_id: 'SESSIONID'
      }
    };

    this.$ = fakeJQuery.create();
  }

  static create() {
    return new FakeWindow();
  }
}

module.exports = FakeWindow;
