var express = require('express');
var router = express.Router();


router.post('/', (req, res, next) => {
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

router.get('/:id', (req, res, next) => {
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

router.patch('/:id', (req, res, next) => {
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

router.delete('/:id', (req, res, next) => {
  const Product = req.app.locals.db.models.Product;
  const id = +req.params.id;
  const where = { id };
  Product.destroy({ where })
    .then(result => ({deleted: result}))
    .then(deleted => res.json(deleted))
    .catch(next);
});


module.exports = router;
