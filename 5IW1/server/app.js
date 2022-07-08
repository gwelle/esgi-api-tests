const express = require("express");

const app = express();
app.use(express.json());

app.use("/products", require("./routes/products.routes"));
app.use('/articles',require("./routes/articles.routes"))
app.use('/command',require("./routes/command.routes"))



module.exports = app;
