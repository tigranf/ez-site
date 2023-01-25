// * Variables & Setup * -----------------------------
const express = require("express");
const app = express();
const expressPort = 5000;
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
// todo: models should go here
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "SomeSuperDuperLongHardToGuessSecretStringForHashingCookieSessions", // used to sign the cookie
    resave: false, // updates the session even w/ no changes if true
    saveUninitialized: true, // always creates a session if true
    cookie: {
      maxAge: 2592000000, //expiration time in milliseconds (30 days usually)
      secure: false, // if true, only accepts https requests
    },
  })
);
app.listen(expressPort, (_) => {
  console.log(`Express server listening on port ${expressPort}`);
});
