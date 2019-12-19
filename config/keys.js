// keys.js - figure out what set of credentials to return
if (process.env.NODE_ENV === "production") {
  //we are in production - return the prod set of keys
  console.log("-->NODE_ENV is production.");
  module.exports = require("./keys-prod");
} else {
  //we are in development - return the dev keys!!!
  console.log("-->NODE_ENV is development.");
  module.exports = require("./keys-dev");
}
