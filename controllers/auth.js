const {Users,Cart} = require("../models");
const {signupErrors} = require("../validators/signupvalidate");
const {loginErrors} = require("../validators/loginvalidate");
const {isEmpty, update} = require("lodash");
const {CookiemanageAsync} = require('./pagecookie');
const {fetchcartCounts} = require('./pages');
const passport = require('passport');
const bcrypt = require('bcrypt');
const myPassport = require('../passport_setup')(passport);



const generateHash = (password) => {
return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
}

async function createUser(req){
let fullname = req.body.fname.trim();
let email = req.body.email.trim();
let phone = req.body.phone.trim();
let password = generateHash(req.body.password.trim());
try{
let create = await Users.create(
{ fullname: fullname, 
phone: phone,
email: email,
password: password 
}
);
return await create;
}catch(e){
console.log(e);   
}
}

async function checkMergeCartItems(req){
var guest = req.cookies.cookieName;    
var authuser = req.user.id;
var guestItems = await Cart.findAll({ where: { guest_id: guest }});
var checkItems;
try{
var update;
for(const guestItem of guestItems){
checkItems = await Cart.count({ where: { product_id:guestItem.product_id,user_id: authuser }});    
if(Number(checkItems) <= 0){  
//update cart guestuser to authuser
update = await Cart.update({ user_id: authuser, guest_id:null}, {
    where: {
      guest_id: guest,
      product_id: guestItem.product_id
    }
  });    
}   
}
return await update;
}catch(e){
console.log(e);
}
}

exports.Login = (req,res,next) => {
return CookiemanageAsync(req,res).then(cookie => {    
fetchcartCounts(req).then(count =>{
res.render('login',{authUser:req.user,cartTotal:count,errors:{},csrfToken:req.csrfToken()});
}).catch(e => console.log(e));
}).catch(e => console.log(e));
}

exports.Signup = (req,res,next) => {
return CookiemanageAsync(req,res).then(cookie => {    
fetchcartCounts(req).then(count => {
res.render('signup',{authUser:req.user,cartTotal:count,errors:{},formData:{},csrfToken:req.csrfToken()});
}).catch(e => console.log(e));
}).catch(e => console.log(e));
}

const rerenderSignup = (req,res,errors) => {
return CookiemanageAsync(req,res).then(cookie => {    
fetchcartCounts(req).then(count => {
res.render('signup',{authUser:req.user,cartTotal:count,errors:errors,formData:req.body,csrfToken:req.csrfToken()});
}).catch(e => console.log(e));
}).catch(e => console.log(e));
}

const rerenderLogin = (req,res,errors) => {
return CookiemanageAsync(req,res).then(cookie => {    
fetchcartCounts(req).then(count =>{
res.render('login',{authUser:req.user,cartTotal:count,errors:errors,csrfToken:req.csrfToken()});
}).catch(e => console.log(e));
}).catch(e => console.log(e));
}

exports.registerUser = (req,res,next) => {
let errors = {};
signupErrors(errors,req).then(error => {
if(!isEmpty(error)){
rerenderSignup(req,res,error);    
}else{
createUser(req).then(create => {
req.flash('registered','Your Registration Was Succesful')
res.redirect('/signup');
}).catch(e => console.log(e));
}
}).catch(e => console.log(e));    
}

exports.loginUser = (req,res,next) => {
let errors  = {};
return loginErrors(errors,req).then(error => {
if(!isEmpty(error)){
rerenderLogin(req,res,error);    
}else{
passport.authenticate('local', function(err, user, info) {
if (err) { return next(err); }
if (!user) { return res.redirect('/login'); }

req.logIn(user, (err) => {
if (err) { return next(err); }
checkMergeCartItems(req).then(merge =>{
res.clearCookie('cookieName');
return res.redirect('/category');
}).catch(e => console.log(e));
});
})(req, res, next);

}
}).catch(e => console.log(e));    
}

exports.logoutUser = (req,res,next) => {
req.logout();
req.session.destroy();
res.redirect("/login");
}