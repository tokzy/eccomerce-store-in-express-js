const {Category,Products,Brands} = require("../models");

async function saveCategory() {
let response = await Brands.create({ name:"brand C"});
return await response;
}

async function shopContent() {
let category = Category.findAll();
let products = Products.findAll();
let brands = Brands.findAll();
let response = await Promise.all([category,products,brands]);
return await response;
}

exports.getHome =  (req, res, next) => {
//const sess = req.session;
//sess.username = 'testing session';
//res.cookie("cookieName", 'my first cookie', {maxAge: 360000});
res.render('index', { title: "title"});
}

exports.getCategory =  (req, res, next) => {
return shopContent().then((values) => {
res.render("category",{products:values[1],categories:values[0],brands:values[2]});
}).catch(e => console.log(e));    
}

exports.getContact =  (req, res, next) => {
return saveCategory().then(save => {
res.render('contact'); 
}).catch(e => console.log(e));    
}