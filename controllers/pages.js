const {Category,Products} = require("../models");

async function saveCategory() {
let response = await Products.create({ category_id:15,status: true,name:"Men's Beaded Bracelet",
price:4600.00,cover_image:"brace.jpg",weight:5.2,descriptions:"Men's Beaded Bracelet"});
return await response;
}

async function shopContent() {
let category = Category.findAll();
let products = Products.findAll();
let response = await Promise.all([category,products]);
return await response;
}

exports.getHome =  function(req, res, next) {
res.render('index', { title: 'Express' });
}

exports.getCategory =  function(req, res, next) {
return shopContent().then((values) => {
res.render("category",{products:values[1],categories:values[0]});
}).catch(e => console.log(e));    
}

exports.getContact =  function(req, res, next) {
return saveCategory().then(save => {
res.render('contact'); 
}).catch(e => console.log(e));    
}