// * Variables & Setup * -----------------------------
const express = require("express");
const app = express();
const expressPort = 5000;
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { User } = require("./models");
const { Generation } = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "SomeSuperDuperLongHardToGuessSecretStringForHashingCookieSessions", // used to sign the cookie
    resave: false, // updates the session even w/ no changes if true
    saveUninitialized: false, // always creates a session if true
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, //expiration time in milliseconds (2592000000 = 30 days usually)
      secure: false, // if true, only accepts https requests
    },
  })
);

// PassportJS
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new LocalStrategy(async function verify(username, password, callback) {
    const user = await User.findOne({ where: { username: username } });
    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return callback(null, false, {
          message: "Incorrect username or password.",
        });
      } else return callback(null, user);
    } else return callback(null, false, { message: "User does not exist." });
  })
);
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username, genCount: user.genCount });
  });
});
passport.deserializeUser(async function (user, cb) {
  process.nextTick(async function () {
    const theUser = await User.findOne({ where: { id: user.id } });
    return cb(null, theUser);
  });
});

app.listen(expressPort, () => {
  console.log(`Express server listening on port ${expressPort}`);
});

// REGISTER USER
app.post("/api/auth/register", async (req, res) => {
  let { username, password, email } = req.body;
  let hashedPass = await bcrypt.hash(password, 10);
  let newUser = await User.create({
    username,
    email,
    password: hashedPass,
    genCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).catch((err) => {
    console.log(err);
    res.json({ message: "Error creating user", error: err });
  });
  res.json({ message: "User registered successfully", user: newUser });
});

// LOGIN AUTHENTICATION
app.post("/api/auth/login", passport.authenticate("local"), (req, res) => {
  console.log(req.session.passport.user);
  res.json({ message: "Login successful", user: req.session.passport.user });
});
