const faker = require('faker');


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


module.exports = {
  givenCategory,
  givenProduct,
  withoutKeys,
  withIgnoredTimestamp
};