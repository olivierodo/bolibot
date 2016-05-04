var Svc = require('../../src/translate'),
google = require('googleapis'),
assert = require('chai').assert,
expect = require('chai').expect,
sinon = require('sinon'),
Promise = require('bluebird');

describe('#translate', function() {

  describe('#getLanguage()', function() {
    it('should return false if the language is not available', function(done) {
        var result = Svc.getLanguage('zw');
        expect(result).to.equal(false);
        done();
    });

    it('should return the default language from sub language', function(done) {
        var result = Svc.getLanguage('ea');
        expect(result).to.equal('es');
        done();
    });

    it('should return the default language from sub language', function(done) {
        var result = Svc.getLanguage('es');
        expect(result).to.equal('es');
        done();
    });
  });

  describe('#get()', function() {
    var gstub, error, response;


    beforeEach(function () {
        //define a mock for google translate
        gstub = sinon.stub(google, 'translate', function () {
            function MockTranslations() {
                this.translations = {
                    list: sinon.stub().callsArgWith(1, error, response)
                };
            }
            return new MockTranslations();
        });
    });

    afterEach(function () {
      gstub && gstub.restore();
      error = undefined;
      response = undefined;
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
        error = 'google api error';
        Svc.get({
          q : 'Where are my donuts ?',
          target : 'fr',
        }).then(function(response) {
            done();
        }, function(err) {
          expect(err).to.equal('google api error');
          done();
        });
    });

    it('Should return an error if the response is null' , function(done) {
        Svc.get({
          q : 'Where are my donuts ?',
          target : 'fr',
        }).then(function(response) {
        }, function(err) {
          expect(err).to.equal('An error occurred. Please try again later');
          done();
        });
    });

    it('Should return an error if google api success' , function(done) {
       response = {data : {translations: [{
            translatedText : 'Où sont mes donuts ?'
       }]}};
        Svc.get({
          q : 'Where are my donuts ?',
          target : 'fr',
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

