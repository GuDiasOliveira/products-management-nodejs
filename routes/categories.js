var express = require('express');
var router = express.Router();


router.post('/', (req, res, next) => {
  const category = req.body;
  // Ignore these fields
  delete category.id;
  delete category.createdAt;
  delete category.updatedAt;
  // Creating
  const Category = req.app.locals.db.models.Category;
  Category.create(category)
    .then(result => res.json(result))
    .catch(next);
});

router.post('/:id/products', (req, res, next) => {
  const product = req.body;
  // Ignore these fields
  delete product.id;
  delete product.createdAt;
  delete product.updatedAt;
  // Set category id
  product.categoryId = +req.params.id;
  // Creating
  const Product = req.app.locals.db.models.Product;
  Product.create(product)
    .then(result => res.json(result))
    .catch(next);
});

router.get('/', (req, res, next) => {
  const Category = req.app.locals.db.models.Category;
  Category.findAll()
    .then(result => res.json(result))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  const Category = req.app.locals.db.models.Category;
  const id = +req.params.id;
  Category.findByPk(id).then(result => {
    if (result != null)
      res.json(result);
    else {
      res.status(404).json({
        error: {
          message: `No Category with id ${id} was found`,
          code: `ENTITY_NOT_FOUND`,
        }
      });
    }
  }).catch(next);
});

router.get('/:id/products', (req, res, next) => {
  const Product = req.app.locals.db.models.Product;
  Product.findAll({ where: { categoryId: +req.params.id } })
    .then(result => res.json(result))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  const category = req.body;
  // Ignore these fields
  delete category.id;
  delete category.createdAt;
  delete category.updatedAt;
  // Updating
  const Category = req.app.locals.db.models.Category;
  const id = +req.params.id;
  const where = { id };
  Category.update(category, { where })
    .then(result => ({ updated: result[0]}))
    .then(updated => res.json(updated))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  const Category = req.app.locals.db.models.Category;
  const id = +req.params.id;
  const where = { id };
  Category.destroy({ where })
    .then(result => ({deleted: result}))
    .then(deleted => res.json(deleted))
    .catch(next);
});


module.exports = router;
