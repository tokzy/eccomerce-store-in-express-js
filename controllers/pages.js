const { isEmpty } = require("lodash");
const {Category,Products,Brands,Cart} = require("../models");
const {CookiemanageAsync} = require('./pagecookie');


async function shopContent() {
let category = Category.findAll();
let products = Products.findAll();
let brands = Brands.findAll();
let response = await Promise.all([category,products,brands]);
return await response;
}

exports.fetchcartCounts = async (req) => {
var user;    
var count;
try{
if(req.user){
user = req.user.id;
count = await Cart.findAll({ where: { user_id: user }});
}else{
user = req.cookies.cookieName;
count = await Cart.findAll({ where: { guest_id: user }});
}      
return await count;
}catch(e){
console.log(e);
}
}

exports.getHome =  (req, res, next) => {
//const sess = req.session;
//sess.username = 'testing session';
return CookiemanageAsync(req,res).then(cookie =>{
this.fetchcartCounts(req).then(count => {
res.render('index', { cartTotal: count,authUser:req.user});
}).catch(e => console.log(e));
}).catch(e => console.log(e));
}

exports.getCategory =  (req, res, next) => {
return CookiemanageAsync(req,res).then(cookie =>{
shopContent().then((values) => {
this.fetchcartCounts(req).then(count => {     
res.render("category",{authUser:req.user,cartTotal:count,products:values[1],categories:values[0],brands:values[2]});
}).catch(e => console.log(e));
}).catch(e => console.log(e));    
}).catch(e => console.log(e));
}

exports.getContact =  (req, res, next) => { 
return CookiemanageAsync(req,res).then(cookie =>{
this.fetchcartCounts(req).then(count => {
res.render('contact',{authUser:req.user,cartTotal:count}); 
}).catch(e => console.log(e));
}).catch(e => console.log(e));    
}