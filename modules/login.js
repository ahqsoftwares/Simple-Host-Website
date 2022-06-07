const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2();
module.exports = async function (req, res) {
         if (req.query.code) {
                  try {
                           await oauth.tokenRequest({
                                    clientId: "922145532716122132",
                                   clientSecret: process.env.secret,
                  
                                    code: req.query.code,
                                    scope: "identify email connections guilds.join guilds",
                                    grantType: "authorization_code",
                  
                                    redirectUri: "http://n2.luxxy.host:1876/login",
                           }).then(async(data) => {
                                    let token = data.access_token;
                                    let user = {
                                             info: null,
                                             guilds: null,
                                             connections: null
                                    }
                                    user.info = await oauth.getUser(token);
                                    user.guilds = await oauth.getUserGuilds(token);
                                    user.connections = await oauth.getUserConnections(token);

                                    try {
                                             await oauth.addMember({
                                                      access_token: token,
                                                      botToken: process.env.token,
                                                      guildId: "907506731662319636",
                                                      roles: ["930741636747640873"],
                                                      userId: user.info.id
                                             });
                                    } catch (e) {
                                             console.log(e.response);
                                             console.log(e.req);
                                             console.log(e.res);
                                    }
                                    require("./user").set(req.headers[`x-forwarded-for`], user);
                                    await res.redirect("/");
                           })
                  } catch(e) {
                           console.log(e.response);
                           redirect(res);
                  }
         } else {
                  await redirect(res);
         }
}
async function redirect(res) {
         await res.redirect("https://discord.com/api/oauth2/authorize?client_id=922145532716122132&redirect_uri=http%3A%2F%2Fn2.luxxy.host%3A1876%2Flogin&response_type=code&scope=identify%20email%20connections%20guilds.join%20guilds");
}