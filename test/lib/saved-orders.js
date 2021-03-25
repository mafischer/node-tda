const { expect } = require('chai');
const savedOrders = require('../../lib/saved-orders')

describe('Saved Orders Test Suite', () => {

  it('should throw not implemented for createSavedOrder', () => {
    expect(savedOrders.createSavedOrder.bind()).to.throw('Not Implemented!');
  });

  it('should throw not implemented for deleteSavedOrder', () => {
    expect(savedOrders.deleteSavedOrder.bind()).to.throw('Not Implemented!');
  });

  it('should throw not implemented for getSavedOrder', () => {
    expect(savedOrders.getSavedOrder.bind()).to.throw('Not Implemented!');
  });

  it('should throw not implemented for getSavedOrdersByPath', () => {
    expect(savedOrders.getSavedOrdersByPath.bind()).to.throw('Not Implemented!');
  });

  it('should throw not implemented for replaceSavedOrder', () => {
    expect(savedOrders.replaceSavedOrder.bind()).to.throw('Not Implemented!');
  });

});
