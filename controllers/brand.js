const {Category,Products,Brands} = require("../models");

async function fetchallProducts(id){
let category = Category.findAll();
let brands = Brands.findAll();  
let brandfetch = Products.findAll({
where: {
brand_id: id
}
});  
try{
let response = await Promise.all([category,brands,brandfetch]);
return await response;  
}catch(e){
return console.log(e);
}   
}

exports.getProductsByBrand =  (req, res, next) => {
id = req.params.brandId;
return fetchallProducts(id).then(values =>{
res.render("category", {title:'brands',categories:values[0],brands:values[1],products:values[2]});
}).catch(e => console.log(e));
}
