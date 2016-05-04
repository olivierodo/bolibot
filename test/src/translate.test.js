var Svc = require('../../src/translate'),
google = require('googleapis'),
assert = require('chai').assert,
expect = require('chai').expect,
sinon = require('sinon'),
Promise = require('bluebird');
var translations = google.translate('v2').translations;

describe('#translate', function() {

  describe('#get()', function() {
    var sandbox;
    beforeEach(function () {
          sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
          sandbox.restore();
    });

    it('should return an error if the options is undefined', function(done) {
      try {
        var result = Svc.get();
      } catch (err) {
        expect(err.message).to.equal('The function needs options');
        done();
      }
    });

    it('should return an error if the query is not defined', function(done) {
      try {
        var result = Svc.get({});
      } catch (err) {
        expect(err.message).to.equal('Please add the query on the options');
        done();
      }
    });

    it('should return an error if the target is not defined', function(done) {
      try {
        var result = Svc.get({q:'query'});
      } catch (err) {
        expect(err.message).to.equal('Please add the target on the options');
        done();
      }
    });

    it('should return an error if the language is not available', function(done) {
      try {
        var result = Svc.get({q:'query', target:'zw'});
      } catch (err) {
        expect(err.message).to.equal('The \'zw\' language is not available');
        done();
      }
    });

    it('Should return an error if google api fail' , function(done) {
        var stub = {list : function(options, fn){
          fn.call(this, 'google api error', null);
        }};
        Svc.get({
          q : 'Where are my donuts ?',
          target : 'fr',
          google : stub
        }).then(function(response) {
        }, function(err) {
          expect(err).to.equal('google api error');
          done();
        });
    });

    it('Should return an error if the response is null' , function(done) {
        var stub = {list : function(options, fn){
          fn.call(this, undefined, null);
        }};
        Svc.get({
          q : 'Where are my donuts ?',
          target : 'fr',
          google : stub
        }).then(function(response) {
        }, function(err) {
          expect(err).to.equal('An error occurred. Please try again later');
          done();
        });
    });

    it('Should return an error if google api success' , function(done) {
        var stub = {list : function(options, fn){
          var response = {data : {translations: [{
            translatedText : 'Où sont mes donuts ?'
          }]}};
          fn.call(this, undefined, response);
        }};
        Svc.get({
          q : 'Where are my donuts ?',
          target : 'fr',
          google : stub
        }).then(function(response) {
          expect(response).to.equal('Où sont mes donuts ?');
          done();
        }, function(err) {
          expect(false).to.equal(true);
          done();
        });
    });

  });

});

