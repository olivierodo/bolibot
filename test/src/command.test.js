var Svc = require('../../src/command'),
translate = require('../../src/translate');
assert = require('chai').assert,
expect = require('chai').expect,
sinon = require('sinon'),
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

  describe('#translate()', function() {

    it('Should have an error if the lang is not defined' , function(done) {
      try {
      var result = Svc.translate();
      } catch (err) {
        expect(err.message).to.equal('I can\'t define what is the language...');
        done();
      }
    });

    it('Should have an error if the message is not defined' , function(done) {
      try {
      var result = Svc.translate('fr');
      } catch (err) {
        expect(err.message).to.equal('I can\'t define what is the message...');
        done();
      }
    });

    it('Should have an error if the google api can\'t translate' , function(done) {
        var stub = sandbox.stub(translate, 'get');
        stub.rejects('error google api');
        Svc.translate('fr', 'my message')
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
        Svc.translate('fr', 'my message')
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
