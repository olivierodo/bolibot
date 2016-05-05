var Svc = require('../../src/route'),
command = require('../../src/command');
oauth = require('../../src/oauth');
assert = require('chai').assert,
expect = require('chai').expect,
sinon = require('sinon'),
Promise = require('bluebird');

require('sinon-as-promised')(Promise);

describe('#route', function() {
  var sandbox;
  beforeEach(function () {
        sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
        sandbox.restore();
  });

  describe('#oauth()', function() {
    it('Should send a error message if the access fail', function (done){
      var res = {
        send : function(msg) {
          expect(msg).to.equal('Please add the code');
          done();
        }
      };
      Svc.oauth({query:{}}, res);
    });

    it('Should send a success message', function (done){
      var OauthStub = sandbox.stub(oauth, 'access');
      OauthStub.resolves('good response');
      var res = {
        send : function(msg) {
          expect(msg).to.equal('good response');
          done();
        }
      };
      Svc.oauth({query:{code:'e'}}, res);
    });
  });

  describe('#command()', function() {

    it('Should have a an error if the translation goes wrong', function(done){
      var res = {
        send : function(msg) {
          expect(msg).to.deep.equal({text:'The token is invalid'});
          done();
        }
      };
      Svc.command({params:{}, body:{}}, res);
    });

    it('Should send a success message', function (done){
      var commandStub = sandbox.stub(command, 'translate');
      commandStub.resolves('good response');
      var res = {
        send : function(msg) {
          expect(msg).to.equal('good response');
          done();
        }
      };

      var req = {
        params : {
          text: 'aa'
        },
        body : {
          text: 'aa'
        }
      };
      Svc.command(req, res);
    });

  });
});

