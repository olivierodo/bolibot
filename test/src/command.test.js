var Svc = require('../../src/command'),
translate = require('../../src/translate');
assert = require('chai').assert,
expect = require('chai').expect,
sinon = require('sinon'),
config = require('config'),
Promise = require('bluebird');

require('sinon-as-promised')(Promise);

describe('#command', function() {
  var sandbox;

  beforeEach(function () {
        sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
        sandbox.restore();
  });

  describe('#_verify()', function() {

    afterEach(function () {
         delete process.env.VERIFICATION_TOKEN;
    });

    it('Should return an error if the VERIFICATION_TOKEN is not set', function(done) {
      try {
        delete process.env.VERIFICATION_TOKEN;
        var result = Svc._verify();
      } catch(err) {
        expect(err.message).to.equal('Please set the VERIFICATION_TOKEN');
        done();
      }
    });

    it('Should return false if the verification key doesn\'t match', function(done) {
        process.env.VERIFICATION_TOKEN = 'FOO';
        expect(Svc._verify('BAR')).to.be.false;
        done();
    });

    it('Should return false if the verification key doesn\'t match', function(done) {
        process.env.VERIFICATION_TOKEN = 'FOO';
        expect(Svc._verify('FOO')).to.be.true;
        done();
    });
  });

  describe('#translate()', function() {

    before(function () {
       process.env.VERIFICATION_TOKEN = 'FOO';
    });

    it('Should have an error if the token  is not provide' , function(done) {
      try {
        var result = Svc.translate();
      } catch (err) {
        expect(err.message).to.equal('The token is invalid');
        done();
      }
    });

    it.skip('Should have an error if the token doesn\'t match' , function(done) {
      try {
        var result = Svc.translate('BAR');
      } catch (err) {
        expect(err.message).to.equal('The token is invalid');
        done();
      }
    });

    it('Should have an error if the lang is not defined' , function(done) {
      try {
      var result = Svc.translate('FOO');
      } catch (err) {
        expect(err.message).to.equal('I can\'t define what is the language...');
        done();
      }
    });

    it('Should have an error if the message is not defined' , function(done) {
      try {
      var result = Svc.translate('FOO','fr');
      } catch (err) {
        expect(err.message).to.equal('I can\'t define what is the message...');
        done();
      }
    });

    it('Should have an error if the google api can\'t translate' , function(done) {
        var stub = sandbox.stub(translate, 'get');
        stub.rejects('error google api');
        Svc.translate('FOO', 'fr', 'my message')
        .then( function(response) {
          done();
        }, function (err) {
          expect(err.message).to.equal('error google api');
          done();
        });
    });

    it('Should return the message with the good format' , function(done) {
        var stub = sandbox.stub(translate, 'get');
        stub.resolves('mon message');
        Svc.translate('FOO', 'fr', 'my message')
        .then( function(response) {
          expect(response).to.deep.equal({
            response_type : 'in_channel',
            attachments : [{
              text : 'mon message'
            }]
          });
          done()
        }, function (err) {
          expect(true).to.equal(false);
          done();
        });
    });
  });
});
