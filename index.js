const express = require("express");
const process = require("process");
process.on("uncaughtException", (e) => console.log(e));
const app = express();
const client = new (require("eris"))(process.env.token, {
         intents: ["guilds", "guildMembers", ]
});
client.connect();
const path = require("path");
const { get } = require("./modules/user");

console.log("Ready!");

app.listen(1876);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "pages"));
app.use((req, res, next) => {
         req.user = null;
         req.guilds = null;
         req.third_party = null;
         try {
                  req.user = get[req.headers[`x-forwarded-for`]].info;
                  req.guilds = get[req.headers[`x-forwarded-for`]].guilds;
                  req.third_party = get[req.headers[`x-forwarded-for`]].connections;
         } catch (e) {
                  console.log(e);
         }
         if (req.originalUrl != "/") {
                  next()
         } else {
                  res.render("loading.ejs", {
                           user: req.user
                  });
         }
});

app.get("/home", async(req, res) => {
         res.render(`main.ejs`, {
                  user: req.user
         });
})
.get("/login", async(req, res) => {
         require("./modules/login")(req, res, client);
});
