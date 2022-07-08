const { Product } = require("../models");
exports.ProductController = require("./products.controller")(Product);
const { Article } = require("../models/index");

const { Command } = require("../models/index");



exports.ArticleController = require("./articles.controller")(Article);

exports.CommandController = require("./command.controller")(Command);
