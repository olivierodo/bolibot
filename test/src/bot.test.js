var Team = require('../../src/models/team'),
assert = require('chai').assert,
expect = require('chai').expect,
sinon = require('sinon'),
Promise = require('bluebird');

require('sinon-as-promised')(Promise);


describe('#bot', function() {

  var Svc
  beforeEach(function () {
    Svc = require('../../src/bot');
    Svc.list = [];
  });

  describe('#add()', function() {
    var sandbox;
    beforeEach(function () {
      sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
       sandbox.restore();
    });

    it('Should return an error if the team model can\'t do the query', function(done) {
      var TeamStub = sandbox.stub(Team, 'get');
      TeamStub.rejects('team error request');
      var result = Svc.start().then(
        function() {
          expect(true).to.false;
          done();
        }, function(err) {
          expect(err.message).to.equal('team error request');
          done();
        });
    });

    it('Should start all the bots', function(done) {
      var TeamStub = sandbox.stub(Team, 'get');
      TeamStub.resolves({
        zzz : {
          bot : {
            bot_access_token : 'my token'
          }
        },
        yyy : {
          bot : {
            bot_access_token : 'my token 2'
          }
        }
      });
      var result = Svc.start().then(
        function() {
          expect(Svc.list.length).to.equal(2);
          done();
        }, function(err) {
          expect(true).to.false;
          done();
        });
    });

  });

  describe('#add()', function() {

    it('Should return null if the object doesn\'t have a token', function(done) {
      var result = Svc.add({});
      expect(result).to.be.false;
      done();
    });

    it('Should start and add the bot the list', function(done) {
      var result = Svc.add({
        bot : {
          bot_access_token : 'the token'
        },
        team_name : 'cookinky'
      });
      expect(Svc.list.length).to.equal(1);
      expect(Svc.list[0].teamName).to.equal('cookinky');
      done();
    });

  });
});

