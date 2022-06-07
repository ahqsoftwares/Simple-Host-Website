const express = require("express");
const app = express();

app.listen(1876);
app.use("ejs");
app.use("views", path.join(__dirname + "pages"));

app.get("/", async(req, res) => {
         res.render(`main.ejs`);
});