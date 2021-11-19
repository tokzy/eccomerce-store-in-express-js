const {Category} = require("../models");

async function saveCategory() {
let response = await Category.create({ name: "Women's Accesories"});
console.log(response.id);
return await response;
}

async function findAllCategory() {
let response = await Category.findAll();
return await response;
}

exports.getHome =  function(req, res, next) {
res.render('index', { title: 'Express' });
}

exports.getCategory =  function(req, res, next) {
return findAllCategory().then((allcat) => {
res.render("category",{categories:allcat});
}).catch(e => console.log(e));    
}

exports.getContact =  function(req, res, next) {
 res.render('contact');   
}