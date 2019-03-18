var express = require('express');
var router = express.Router();


router.post('/', (req, res) => {
  const category = req.body;
  // Ignore these fields
  delete category.id;
  delete category.createdAt;
  delete category.updatedAt;
  // Creating
  const Category = req.app.locals.db.models.Category;
  Category.create(category).then(result => res.json(result));
});

router.get('/', (req, res) => {
  const Category = req.app.locals.db.models.Category;
  Category.findAll().then(result => res.json(result));
});

router.get('/:id', (req, res) => {
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
  });
});

router.put('/:id', (req, res) => {
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
    .then(updated => res.json(updated));
});

router.delete('/:id', (req, res) => {
  const Category = req.app.locals.db.models.Category;
  const id = +req.params.id;
  const where = { id };
  Category.destroy({ where })
    .then(result => ({deleted: result}))
    .then(deleted => res.json(deleted));
});


module.exports = router;
