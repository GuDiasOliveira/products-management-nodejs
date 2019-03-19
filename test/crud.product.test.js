const request = require('supertest');
const chai = require('chai');
const faker = require('faker');
const {givenCategory, givenProduct} = require('./test.helpers');
const app = require('../app');

const expect = chai.expect;


describe('CRUD Product', () => {
  
  let category;
  
  before(async () => {
    // Creating category for products
    category = givenCategory();
    let response = await request(app)
      .post('/categories')
      .send(category)
      .expect(200);
    category = response.body;
  });

  it('create', async () => {
    // Creating
    let product = givenProduct(category.id);
    let response = await request(app)
      .post('/products')
      .send(product)
      .expect(200);
    product = response.body;
    // Checking creation
    await request(app)
      .get(`/products/${product.id}`)
      .expect(200);
  });

  it('put', async () => {
    // Creating
    let product = givenProduct(category.id);
    let response = await request(app)
      .post('/products')
      .send(product)
      .expect(200);
    product = response.body;
    // Updating
    let name = faker.commerce.product();
    let value = faker.commerce.price(100, 2000);
    response = await request(app)
      .patch(`/products/${product.id}`)
      .send({ name, value })
      .expect(200, { updated: 1 });
    // Getting updated
    response = await request(app)
      .get(`/products/${product.id}`)
      .expect(200);
    const putProduct = response.body;
    // Checking update correctely
    product.name = name;
    product.value = value;
    product.category = {...category};
    delete product.createdAt;
    delete product.updatedAt;
    delete product.category.createdAt;
    delete product.category.updatedAt;
    delete putProduct.createdAt;
    delete putProduct.updatedAt;
    delete putProduct.category.createdAt;
    delete putProduct.category.updatedAt;
    expect(putProduct).to.deep.equal(product, 'Product updated correctely');
  });

  it('delete', async () => {
    // Creating
    let product = givenProduct(category.id);
    let response = await request(app)
      .post('/products')
      .send(product)
      .expect(200);
    product = response.body;
    // Checking creation
    await request(app)
      .get(`/products/${product.id}`)
      .expect(200);
    // Deleting
    await request(app)
      .del(`/products/${product.id}`)
      expect(200);
    // Checking deletion
    await request(app)
      .get(`/products/${product.id}`)
      .expect(404);
  });
});