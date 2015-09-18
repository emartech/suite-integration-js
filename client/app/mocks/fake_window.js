'use strict';

var sinon = require('sinon');
var fakeJQuery = require('./fake_jquery');

class FakeWindow {
  constructor() {
    this.listeners = {};

    this.location = {
      pathname: 'mocked',
      reload: sinon.stub()
    };

    this.document = {
      getElementById: sinon.stub().returns('fake_element')
    };

    this.SUITE = {
      config: {
        session_id: 'SESSIONID'
      }
    };

    this.postMessage = sinon.stub();

    this.parent = {
      postMessage: sinon.stub()
    };

    this.$ = fakeJQuery.create();
  }

  addEventListener(type, callback) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }

    this.listeners[type].push((data) => callback(data));
  }

  trigger(type, data) {
    if (this.listeners[type]) {
      this.listeners[type].forEach((cb) => cb(data));
    }
  }

  gettext(text) {
    return text;
  }

  static create() {
    return new FakeWindow();
  }
}

module.exports = FakeWindow;
