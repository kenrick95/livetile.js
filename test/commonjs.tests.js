var expect = require('chai').expect;
var liveTile = require('../dist/LiveTile.min.js');
 
describe('MainClass', function () {
  it('is contained within LiveTile as CommonJS', function () {
    expect(liveTile).to.be.an('object');
    expect(liveTile.MainClass).to.not.be.null;
  });
 
  it('can be instantiated', function () {
    var t = new liveTile.MainClass('foo');
    expect(t).to.be.defined;
  });
});