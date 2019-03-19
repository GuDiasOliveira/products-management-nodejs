define({ "api": [
  {
    "type": "post",
    "url": "/categories",
    "title": "Create category",
    "name": "CreateCategory",
    "group": "Category",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "created",
            "description": "<p>category</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object",
            "optional": false,
            "field": "FieldsRequired",
            "description": "<p>you must pass all required fields</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/categories.js",
    "groupTitle": "Category"
  },
  {
    "type": "post",
    "url": "/categories/:id/products",
    "title": "Create product for a category",
    "name": "CreateCategoryProduct",
    "group": "Category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Category unique ID for which the product will be created.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "created",
            "description": "<p>product</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object",
            "optional": false,
            "field": "FieldsRequired",
            "description": "<p>you must pass all required fields and params</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/categories.js",
    "groupTitle": "Category"
  },
  {
    "type": "delete",
    "url": "/categories/:id",
    "title": "Delete a category",
    "name": "DeleteCategory",
    "group": "Category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Category unique ID that will be deleted.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object",
            "optional": false,
            "field": "FieldsRequired",
            "description": "<p>you must pass all required fields and params</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/categories.js",
    "groupTitle": "Category"
  },
  {
    "type": "get",
    "url": "/categories",
    "title": "Get all categories",
    "name": "GetCategories",
    "group": "Category",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "all",
            "description": "<p>categories</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/categories.js",
    "groupTitle": "Category"
  },
  {
    "type": "get",
    "url": "/categories/:id",
    "title": "Get a category",
    "name": "GetCategory",
    "group": "Category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Category unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "the",
            "description": "<p>category</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object",
            "optional": false,
            "field": "FieldsRequired",
            "description": "<p>you must pass all required fields and params</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/categories.js",
    "groupTitle": "Category"
  },
  {
    "type": "get",
    "url": "/categories/:id/products",
    "title": "Get all products from a category",
    "name": "GetCategoryProducts",
    "group": "Category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Category unique ID whose products will be gotten.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "all",
            "description": "<p>category products</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object",
            "optional": false,
            "field": "FieldsRequired",
            "description": "<p>you must pass all required fields and params</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/categories.js",
    "groupTitle": "Category"
  },
  {
    "type": "put",
    "url": "/categories/:id",
    "title": "Update a category",
    "name": "UpdateCategory",
    "group": "Category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Category unique ID that will be updated.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object",
            "optional": false,
            "field": "FieldsRequired",
            "description": "<p>you must pass all required fields and params</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/categories.js",
    "groupTitle": "Category"
  },
  {
    "type": "post",
    "url": "/products",
    "title": "Create product",
    "name": "CreateProduct",
    "group": "Product",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "created",
            "description": "<p>product</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object",
            "optional": false,
            "field": "FieldsRequired",
            "description": "<p>you must pass all required fields</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/products.js",
    "groupTitle": "Product"
  },
  {
    "type": "delete",
    "url": "/categories/:id",
    "title": "Delete a product",
    "name": "DeleteProduct",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Product unique ID that will be deleted.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object",
            "optional": false,
            "field": "FieldsRequired",
            "description": "<p>you must pass all required fields and params</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/products.js",
    "groupTitle": "Product"
  },
  {
    "type": "get",
    "url": "/products/:id/payment",
    "title": "Get a product payment value",
    "name": "GetPayment",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Product unique ID from which to get the payment value.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "the",
            "description": "<p>payment value</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object",
            "optional": false,
            "field": "FieldsRequired",
            "description": "<p>you must pass all required fields and params</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/products.js",
    "groupTitle": "Product"
  },
  {
    "type": "get",
    "url": "/products/:id",
    "title": "Get a product",
    "name": "GetProduct",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Product unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "the",
            "description": "<p>product</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object",
            "optional": false,
            "field": "FieldsRequired",
            "description": "<p>you must pass all required fields and params</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/products.js",
    "groupTitle": "Product"
  },
  {
    "type": "get",
    "url": "/products",
    "title": "Get all products",
    "name": "GetProducts",
    "group": "Product",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "all",
            "description": "<p>products</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/products.js",
    "groupTitle": "Product"
  },
  {
    "type": "patch",
    "url": "/categories/:id",
    "title": "Update a product",
    "name": "UpdateProduct",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Product unique ID that will be updated.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object",
            "optional": false,
            "field": "FieldsRequired",
            "description": "<p>you must pass all required fields and params</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/products.js",
    "groupTitle": "Product"
  }
] });
