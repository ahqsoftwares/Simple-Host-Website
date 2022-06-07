const express = require("express");
const app = express();
const path = require("path");

app.listen(1876);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "pages"));

app.get("/", async(req, res) => {
         res.render(`main.ejs`);
});