const request = require('supertest');
const express = require('express');
const faker = require('faker');
const chai = require('chai');
 
const app = require('../app');
const expect = chai.expect;


function givenCategory() {
  return {
    name: faker.commerce.product()
  };
}

function givenProduct(categoryId) {
  return {
    name: faker.commerce.product(),
    description: faker.lorem.text(),
    value: faker.commerce.price(100, 2000),
    categoryId,
  };
}

function withoutKeys(object, keys) {
  let newObject = {...object};
  for (let key of keys)
    delete newObject[key];
  return newObject;
}

function withIgnoredTimestamp(object) {
  return withoutKeys(object, ['createdAt', 'updatedAt']);
}

describe('Parallel requests', () => {
  it('get all (with multiple parallel requests)', done => {
    let count = 0;
    let categories;
    for (let i = 0; i < 10; i++) {
      request(app).get('/categories').expect(200).end((err, result) => {
        if (categories)
          expect(result.body).to.deep.equal(categories, 'Result must always be the same');
        else
          categories = result.body;
        if (++count >= 10)
          done();
      });
    }
  });
});

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