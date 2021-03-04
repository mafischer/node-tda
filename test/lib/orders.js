const { expect } = require('chai');
const orders = require('../../lib/orders')

describe('Orders Test Suite', () => {

  it('should throw not implemented for cancelOrder', () => {
    expect(orders.cancelOrder.bind()).to.throw();
  });

  it('should throw not implemented for getOrder', () => {
    expect(orders.getOrder.bind()).to.throw();
  });

  it('should throw not implemented for getOrdersByPath', () => {
    expect(orders.getOrdersByPath.bind()).to.throw();
  });

  it('should throw not implemented for getOrdersByQuery', () => {
    expect(orders.getOrdersByQuery.bind()).to.throw();
  });

  it('should throw not implemented for placeOrder', () => {
    expect(orders.placeOrder.bind()).to.throw();
  });

  it('should throw not implemented for replaceOrder', () => {
    expect(orders.replaceOrder.bind()).to.throw();
  });

});