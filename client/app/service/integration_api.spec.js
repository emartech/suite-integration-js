'use strict';

var sinon = require('sinon');

describe('IntegrationApi', function() {

  var fakeWindow;
  var IntegrationApi = require('./integration_api');
  var integrationApi;

  beforeEach(function() {
    fakeWindow = require('../mocks/fake_window').create();
    integrationApi = new IntegrationApi(fakeWindow);
  });

  describe('#setMessageSource', function() {
    beforeEach(function() {
      sinon.stub(integrationApi, 'params', {
        get: function() {
          return {
            integrationId: 'integration-id',
            integrationInstanceId: 1234
          };
        }
      });
    });

    it('should extend message with source', function() {
      var result = integrationApi.setMessageSource({
        event: 'foo'
      });
      expect(result).to.eql({
        event: 'foo',
        source: {
          integration_id: 'integration-id',
          integration_instance_id: 1234
        }
      });
    });
  });

});
