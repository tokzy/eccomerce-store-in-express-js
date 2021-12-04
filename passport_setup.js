const {User} = require("models/User");

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
      });

      passport.deserializeUser(function(id, done) {

      })

}