const sequelize = require('../db.js');
const { DataTypes } = require('sequelize');

const User = sequelize.define(
  'user',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: 'USER' },
  },
  {
    timestamps: false,
  },
);
const Cart = sequelize.define(
  'cart',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  },
  {
    timestamps: false,
  },
);
const CartProduct = sequelize.define(
  'cartProduct',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  },
  {
    timestamps: false,
  },
);
const Product = sequelize.define(
  'product',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, defaultValue: 0 },
    img: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
    path: { type: DataTypes.STRING, unique: true, allowNull: false },
  },
  {
    timestamps: false,
  },
);
const Category = sequelize.define(
  'category',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    path: { type: DataTypes.STRING, unique: true, allowNull: false },
    img: { type: DataTypes.STRING, unique: true, allowNull: false },
  },
  {
    timestamps: false,
  },
);
const BrandLine = sequelize.define(
  'brandLine',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    path: { type: DataTypes.STRING, unique: true, allowNull: false },
    img: { type: DataTypes.STRING, unique: true, allowNull: false },
  },
  {
    timestamps: false,
  },
);
const Rating = sequelize.define(
  'rating',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: false,
  },
);
const ProductInfo = sequelize.define(
  'productInfo',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING(1234), allowNull: false },
  },
  {
    timestamps: false,
  },
);
const CategoryBrandLine = sequelize.define(
  'categoryBrandLine',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  },
  {
    timestamps: false,
  },
);

User.hasOne(Cart);
Cart.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Cart.hasMany(CartProduct);
CartProduct.belongsTo(Cart);

Product.hasOne(CartProduct);
CartProduct.belongsTo(Product);

Category.hasMany(Product);
Product.belongsTo(Category);

BrandLine.hasMany(Product);
Product.belongsTo(BrandLine);

Product.hasMany(Rating);
Rating.belongsTo(Product);

Product.hasMany(ProductInfo, { as: 'info' });
ProductInfo.belongsTo(Product);

BrandLine.belongsToMany(Category, { through: CategoryBrandLine });
Category.belongsToMany(BrandLine, { through: CategoryBrandLine });

module.exports = {
  User,
  Cart,
  Rating,
  CartProduct,
  Product,
  Category,
  BrandLine,
  ProductInfo,
  CategoryBrandLine,
};
