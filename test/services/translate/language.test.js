var Svc = require('../../../services/translate/languages'),
assert = require('chai').assert,
expect = require('chai').expect;

describe('#language', function() {

  describe('#get()', function() {
    it('should return false if the language is not available', function(done) {
        var result = Svc.get('zw');
        expect(result).to.equal(false);
        done();
    });
  });

  describe('#get()', function() {
    it('should return the default language from sub language', function(done) {
        var result = Svc.get('ea');
        expect(result).to.equal('es');
        done();
    });
  });

  describe('#get()', function() {
    it('should return the default language from sub language', function(done) {
        var result = Svc.get('es');
        expect(result).to.equal('es');
        done();
    });
  });
})
