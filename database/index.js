const Sequelize = require('sequelize');

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: 'mysql',
  logging: false,
});

const Category = sequelize.define('category', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  value: {
    type: Sequelize.DECIMAL(12,2),
    allowNull: false,
  },
});

Product.belongsTo(Category, {
  foreignKey: {
    allowNull: false,
  },
});

module.exports = async function() {
  await sequelize.sync();
  return {
    sequelize,
    models: {
      Category, Product,
    },
  };
}