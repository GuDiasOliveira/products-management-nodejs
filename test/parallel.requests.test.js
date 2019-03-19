const request = require('supertest');
const chai = require('chai');
 
const app = require('../app');
const expect = chai.expect;

describe('Parallel requests', () => {
  it('get all categories', done => {
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