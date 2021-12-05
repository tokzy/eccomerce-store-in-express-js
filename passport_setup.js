const {Users} = require("./models");
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
       Users.findOne({
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
        Users.findOne({
            where:{
                email: email
            }
         }).then(user =>{
          if(user == null){
          req.flash("message","Incorrect Credentials")
          return done(null,false);
          }else if(user.password == null || user.password == undefined){
          req.flash("message","reset your password");
          return done(null,false);
          }else if(!validPassword(user,password)){
          req.flash("message","Incorrect Credentials")
          return done(null,false);
          }
          req.flash("message","success");
          return done(null,user);
         }).catch(err => {
          done(err, false);   
         });
      }
    ));

}