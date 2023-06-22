const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      (email, password, done) => {
        User.findOne(
          { email: email.toLowerCase()})
            .then((user) => {
              if (!user) {
                return done(null, false, {
                  msg: "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
                });
              }
              user
                .comparePassword(password)
                .then((isMatch) => {
                  if (isMatch) {
                    return done(null, user);
                  }
                  return done(null, false, {
                    msg: "Invalid email or password.",
                  });
                })
                .catch((err) => done(err));
            })
            .catch((err) => done(err))
        
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => done(null, user))
    .catch(err => done(err, null))
  });
};
