var Svc = require('../../services/oauth'),
assert = require('chai').assert,
expect = require('chai').expect,
Team = require('../../models/team'),
sinon = require('sinon'),
Promise = require('bluebird');

require('sinon-as-promised')(Promise);

describe('#oauth', function() {

  describe('#access()', function() {

    var sandbox;
    beforeEach(function () {
          sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
          sandbox.restore();
    });

    it('should return an error if the options is undefined', function(done) {
      try {
        var result = Svc.access();
      } catch (err) {
        expect(err.message).to.equal('Please add the code');
        done();
      }
    });

    it('should return an error if the client return an error', function(done) {
      var stub = {
        oauth : {
          access : function() {
            arguments[4].call(this, 'error access');
          }
        }
      };

      Svc.access('code', stub).then(function(response) {
        expect(false).to.equal(true);
        done();
      }, function(err) {
        expect(err).to.equal('error access');
        done();
      });
    });

    it('should return an error if the client return succed and the team model fail', function(done) {
      var TeamStub = sandbox.stub(Team, 'save');
      TeamStub.rejects('error save team model');

      var stub = {
        oauth : {
          access : function() {
            arguments[4].call(this);
          }
        }
      };

      Svc.access('code', stub).then(function(response) {
        expect(false).to.equal(true);
        done();
      }, function(err) {
        expect(err.message).to.equal('error save team model');
        done();
      });
    });

    it('Should Succes and save on team model', function(done) {

      var TeamStub = sandbox.stub(Team, 'save');
      TeamStub.resolves('save model');

      var stub = {
        oauth : {
          access : function() {
            arguments[4].call(this);
          }
        }
      };

      Svc.access('code', stub).then(function(response) {
        expect(response).to.equal('save model');
        done();
      }, function(err) {
        expect(false).to.equal(true);
        done();
      });
    });
  });
});

