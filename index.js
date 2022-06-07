const express = require("express");
const app = express();
const path = require("path");
const { get } = require("./modules/user");

console.log("Ready!");

app.listen(1876);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "pages"));
app.use((req, res, next) => {
         req.user = get[req.headers[`x-forwarded-for`]];
         next()
});

app.get("/", async(req, res) => {
         res.render(`main.ejs`);
})
.get("/login", async(req, res) => {
         require("./modules/login")(req, res);
})