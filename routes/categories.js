var express = require('express');
var router = express.Router();
const routeValidator = require('express-route-validator');


/**
 * @api {post} /categories Create category
 * @apiName CreateCategory
 * @apiGroup Category
 *
 * @apiSuccess {Object} created category
 * @apiError (400) {Object} FieldsRequired you must pass all required fields
 */
router.post('/', routeValidator.validate({
  body: {
    name: { isRequired: true }
  }
}), (req, res, next) => {
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

/**
 * @api {post} /categories/:id/products Create product for a category
 * @apiName CreateCategoryProduct
 * @apiGroup Category
 * 
 * @apiParam {Number} id Category unique ID for which the product will be created.
 *
 * @apiSuccess {Object} created product
 * @apiError (400) {Object} FieldsRequired you must pass all required fields and params
 */
router.post('/:id/products', routeValidator.validate({
  body: {
    name: { isRequired: true },
    description: { isRequired: true },
    value: { isRequired: true, isFloat: true }
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
  // Set category id
  product.categoryId = +req.params.id;
  // Creating
  const Product = req.app.locals.db.models.Product;
  Product.create(product)
    .then(result => res.json(result))
    .catch(next);
});

/**
 * @api {get} /categories Get all categories
 * @apiName GetCategories
 * @apiGroup Category
 *
 * @apiSuccess {Object[]} all categories
 */
router.get('/', (req, res, next) => {
  const Category = req.app.locals.db.models.Category;
  Category.findAll()
    .then(result => res.json(result))
    .catch(next);
});

/**
 * @api {get} /categories/:id Get a category
 * @apiName GetCategory
 * @apiGroup Category
 * 
 * @apiParam {Number} id Category unique ID.
 *
 * @apiSuccess {Object} the category
 * @apiError (400) {Object} FieldsRequired you must pass all required fields and params
 */
router.get('/:id', routeValidator.validate({
  params: {
    id: { isRequired: true, isInt: { min: 1 } }
  }
}), (req, res, next) => {
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

/**
 * @api {get} /categories/:id/products Get all products from a category
 * @apiName GetCategoryProducts
 * @apiGroup Category
 * 
 * @apiParam {Number} id Category unique ID whose products will be gotten.
 *
 * @apiSuccess {Object[]} all category products
 * @apiError (400) {Object} FieldsRequired you must pass all required fields and params
 */
router.get('/:id/products', routeValidator.validate({
  params: {
    id: { isRequired: true, isInt: { min: 1 } }
  }
}), (req, res, next) => {
  const Product = req.app.locals.db.models.Product;
  Product.findAll({ where: { categoryId: +req.params.id } })
    .then(result => res.json(result))
    .catch(next);
});

/**
 * @api {put} /categories/:id Update a category
 * @apiName UpdateCategory
 * @apiGroup Category
 * 
 * @apiParam {Number} id Category unique ID that will be updated.
 * @apiError (400) {Object} FieldsRequired you must pass all required fields and params
 */
router.put('/:id', routeValidator.validate({
  params: {
    id: { isRequired: true, isInt: { min: 1 } }
  }
}), (req, res, next) => {
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

/**
 * @api {delete} /categories/:id Delete a category
 * @apiName DeleteCategory
 * @apiGroup Category
 * 
 * @apiParam {Number} id Category unique ID that will be deleted.
 * @apiError (400) {Object} FieldsRequired you must pass all required fields and params
 */
router.delete('/:id', routeValidator.validate({
  params: {
    id: { isRequired: true, isInt: { min: 1 } }
  }
}), (req, res, next) => {
  const Category = req.app.locals.db.models.Category;
  const id = +req.params.id;
  const where = { id };
  Category.destroy({ where })
    .then(result => ({deleted: result}))
    .then(deleted => res.json(deleted))
    .catch(next);
});


module.exports = router;
