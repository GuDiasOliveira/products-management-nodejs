const request = require('supertest');
const chai = require('chai');
const faker = require('faker');
const {givenCategory, givenProduct, withIgnoredTimestamp} = require('./test.helpers');
const app = require('../app');

const expect = chai.expect;

describe('CRUD Category', () => {
  it('create', async () => {
    // Creating
    let category = givenCategory();
    let response = await request(app)
      .post('/categories')
      .send(category)
      .expect(200);
    category = response.body;
    // Checking creation
    await request(app)
      .get(`/categories/${category.id}`)
      .expect(200);
  });

  it('create product', async () => {
    // Creating category
    let category = givenCategory();
    let response = await request(app)
      .post('/categories')
      .send(category)
      .expect(200);
    category = response.body;
    // Creating product
    let product = givenProduct();
    response = await request(app)
      .post(`/categories/${category.id}/products`)
      .send(product)
      .expect(200);
    product = response.body;
    // Checking creation
    response = await request(app)
      .get(`/products/${product.id}`)
      .expect(200);
    // Checking category id
    expect(response.body.categoryId).equal(category.id, 'Correct category id');
  });

  it('get products', async () => {
    // Creating categories
    let category1 = givenCategory();
    let response = await request(app)
      .post('/categories')
      .send(category1)
      .expect(200);
    category1 = response.body;
    let category2 = givenCategory();
    response = await request(app)
      .post('/categories')
      .send(category2)
      .expect(200);
    category2 = response.body;
    // Creating products
    let products1 = [];
    let products2 = [];
    for (let i = 0; i < 5; i++) {
      let product = givenProduct(category1.id);
      let response = await request(app)
        .post('/products')
        .send(product)
        .expect(200);
      product = response.body;
      products1.push(withIgnoredTimestamp(product));
    }
    for (let i = 0; i < 4; i++) {
      let product = givenProduct(category2.id);
      let response = await request(app)
        .post('/products')
        .send(product)
        .expect(200);
      product = response.body;
      products2.push(withIgnoredTimestamp(product));
    }
    // Retrieving categories' products
    response = await request(app)
      .get(`/categories/${category1.id}/products`)
      .expect(200);
    expect(response.body.map(withIgnoredTimestamp)).to.deep.equal(products1);
    response = await request(app)
      .get(`/categories/${category2.id}/products`)
      .expect(200);
    expect(response.body.map(withIgnoredTimestamp)).to.deep.equal(products2);
  });

  it('put', async () => {
    // Creating
    let category = givenCategory();
    let response = await request(app)
      .post('/categories')
      .send(category)
      .expect(200);
    category = response.body;
    // Updating
    let name = faker.commerce.product();
    response = await request(app)
      .put(`/categories/${category.id}`)
      .send({ name })
      .expect(200, { updated: 1 });
    // Getting updated
    response = await request(app)
      .get(`/categories/${category.id}`)
      .expect(200);
    const putCategory = response.body;
    // Checking update correctely
    category.name = name;
    delete category.createdAt;
    delete category.updatedAt;
    delete putCategory.createdAt;
    delete putCategory.updatedAt;
    expect(putCategory).to.deep.equal(category, 'Category updated correctely');
  });

  it('delete', async () => {
    // Creating
    let category = givenCategory();
    let response = await request(app)
      .post('/categories')
      .send(category)
      .expect(200);
    category = response.body;
    // Checking creation
    await request(app)
      .get(`/categories/${category.id}`)
      .expect(200);
    // Deleting
    await request(app)
      .del(`/categories/${category.id}`)
      expect(200);
    // Checking deletion
    await request(app)
      .get(`/categories/${category.id}`)
      .expect(404);
  });
});
