const {Category,Products,Brands} = require("../models");

async function fetchallProducts(id){
let category = Category.findAll();
let brands = Brands.findAll();  
let catfetch = Products.findAll({
where: {
category_id: id
}
});  
try{
let response = await Promise.all([category,brands,catfetch]);
return await response;  
}catch(e){
return console.log(e);
}   
}

exports.getProductsByCategory =  (req, res, next) => {
id = req.params.catId;
return fetchallProducts(id).then(values =>{
res.render("category", {title:'category',categories:values[0],brands:values[1],products:values[2]});
}).catch(e => console.log(e));
}
