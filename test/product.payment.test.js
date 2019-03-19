const request = require('supertest');
const chai = require('chai');
const faker = require('faker');
const {givenCategory, givenProduct} = require('./test.helpers');
const app = require('../app');

const expect = chai.expect;


describe('Product payment', () => {
  it('get payment', async () => {
    // Creating category
    let category = givenCategory();
    category.name = 'Automotivo';
    let response = await request(app)
      .post('/categories')
      .send(category)
      .expect(200);
    category = response.body;
    // Creating product
    let product = givenProduct(category.id);
    response = await request(app)
      .post('/products')
      .send(product)
      expect(200);
    product = response.body;
    // Getting payment
    response = await request(app)
      .get(`/products/${product.id}/payment`)
      .query({ n: faker.random.number(9) + 1 })
      .expect(200);
    const payment = response.body;
    expect(payment.payment).to.be.a('number');
  });
});