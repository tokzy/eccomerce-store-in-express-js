const {User} = require("./models");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcrypt");


const validPassword = (user,password) => {
return bcrypt.compareSync(password,user.password);    
}

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
      });

      passport.deserializeUser((id, done) => {
       User.findOne({
           where:{
               id: id
           }
        }).then(user =>{
         if(user == null){
         done(new Error("wrong user id"));
         }
         done(null,user);
        });
      })

      passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      (req,email, password, done) => {
        User.findOne({
            where:{
                email: email
            }
         }).then(user =>{
          if(user == null){
          req.flash("message","Incorrect Credentials")
          return done(null,false);
          }else if(user.password || user.password == undefined){
          req.flash("message","reset your password");
          }else if(!validPassword(user,password)){
          req.flash("message","Invalid Credentials")
          return done(null,false);
          }
          return done(null,user);
         }).catch(err => {
          done(err, false);   
         });
      }
    ));

}