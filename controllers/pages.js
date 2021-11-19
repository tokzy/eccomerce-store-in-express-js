const {Category} = require("../models");

async function saveCategory() {
let response = await Category.create({ name: "Jane"});
return await response;
}

exports.getHome =  function(req, res, next) {
res.render('index', { title: 'Express' });
}

exports.getCategory =  function(req, res, next) {
res.render('category');
}

exports.getContact =  function(req, res, next) {
 res.render('contact');   
}