'use strict';

const FakeJQuery = require('./fake_jquery');
const jquery = require('jquery');

class FakeWindow {
  constructor(sandbox) {
    this.listeners = {};

    this.location = {
      host: 'mocked.tld',
      pathname: 'mocked',
      reload: sandbox.stub()
    };

    this.document = {
      getElementById: sandbox.stub().returns('fake_element')
    };

    this.SUITE = {
      config: {
        session_id: 'SESSIONID'
      },
      integration: {
        unload: {
          initialized: false
        },
        dialog: {
          modal: sandbox.stub(),
          close: sandbox.stub()
        }
      }
    };

    this.postMessage = sandbox.stub();

    this.parent = {
      postMessage: sandbox.stub()
    };

    this.analytics = {
      request: sandbox.stub()
    };

    this.e = {
      utils: {
        getFlipperService: sandbox.stub(),
        openNotification: sandbox.stub()
      }
    };

    this.$ = FakeJQuery.create(sandbox);
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

  resolved(data) {
    let deferred = jquery.Deferred(); // eslint-disable-line new-cap
    deferred.resolve(data);
    return deferred.promise();
  }

  rejected(data) {
    let deferred = jquery.Deferred(); // eslint-disable-line new-cap
    deferred.reject(data);
    return deferred.promise();
  }

  static create(sandbox) {
    return new FakeWindow(sandbox);
  }
}

module.exports = FakeWindow;
