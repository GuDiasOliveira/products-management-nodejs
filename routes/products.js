var express = require('express');
var router = express.Router();
const routeValidator = require('express-route-validator');


router.post('/', routeValidator.validate({
  body: {
    name: { isRequired: true },
    description: { isRequired: true },
    value: { isRequired: true, isFloat: true },
    categoryId: { isRequired: true, isInt: { min: 1 } },
  },
  params: {
    id: { isRequired: true, isInt: { min: 1 } }
  }
}), (req, res, next) => {
  const product = req.body;
  // Ignore these fields
  delete product.id;
  delete product.createdAt;
  delete product.updatedAt;
  // Creating
  const Product = req.app.locals.db.models.Product;
  Product.create(product)
    .then(result => res.json(result))
    .catch(next);
});

router.get('/', (req, res, next) => {
  const Product = req.app.locals.db.models.Product;
  const Category = req.app.locals.db.models.Category;
  Product.findAll({ include: [ { model: Category } ] })
    .then(result => res.json(result))
    .catch(next);
});

router.get('/:id', routeValidator.validate({
  params: {
    id: { isRequired: true, isInt: { min: 1 } }
  }
}), (req, res, next) => {
  const Product = req.app.locals.db.models.Product;
  const Category = req.app.locals.db.models.Category;
  const id = +req.params.id;
  Product.findByPk(id, { include: [ { model: Category } ] }).then(result => {
    if (result != null)
      res.json(result);
    else {
      res.status(404).json({
        error: {
          message: `No Product with id ${id} was found`,
          code: `ENTITY_NOT_FOUND`,
        }
      });
    }
  }).catch(next);
});

const interest = {
  'Informática': 0.05,
  'Automotivo': 0.025,
  'Móveis': 0.01,
};

router.get('/:id/payment', routeValidator.validate({
  params: {
    id: { isRequired: true, isInt: { min: 1 } }
  },
  query: {
    n: { isRequired: true, isInt: { min: 1 } }
  }
}), async (req, res, next) => {
  try {
    const Product = req.app.locals.db.models.Product;
    const Category = req.app.locals.db.models.Category;
    const id = +req.params.id;
    // Getting product and category
    const product = await Product.findByPk(id);
    const category = await Category.findByPk(product.categoryId);
    const catName = category.name;
    // Getting payment params
    const i = interest[catName] || 0;
    const pv = product.value;
    const n = +req.query.n;
    // Calculating
    const payment = pv * i / (1 - Math.pow(1 + i, -n));
    // Send result
    res.json({ payment });
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', routeValidator.validate({
  params: {
    id: { isRequired: true, isInt: { min: 1 } }
  }
}), (req, res, next) => {
  const product = req.body;
  // Ignore these fields
  delete product.id;
  delete product.createdAt;
  delete product.updatedAt;
  // Updating
  const Product = req.app.locals.db.models.Product;
  const id = +req.params.id;
  const where = { id };
  Product.update(product, { where })
    .then(result => ({ updated: result[0]}))
    .then(updated => res.json(updated))
    .catch(next);
});

router.delete('/:id', routeValidator.validate({
  params: {
    id: { isRequired: true, isInt: { min: 1 } }
  }
}), (req, res, next) => {
  const Product = req.app.locals.db.models.Product;
  const id = +req.params.id;
  const where = { id };
  Product.destroy({ where })
    .then(result => ({deleted: result}))
    .then(deleted => res.json(deleted))
    .catch(next);
});


module.exports = router;
