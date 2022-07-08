const { DataTypes, Model } = require("sequelize");
const connection = require("./db");
const Product = require("./Product")(DataTypes, Model, connection);
const Article = require("./Article")(DataTypes, Model, connection);

const Command = require("./Command")(DataTypes, Model, connection);



module.exports = {
  connection,
  Product,
  Article,
  Command
};
