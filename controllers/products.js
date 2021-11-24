const {Products,Category} = require("../models");

async function getProduct(pid) {
try{    
let product  =  await Products.findOne({ where: { id: pid } });
return await product;
}catch(e){
console.log(e);
}
}

async function getProductCategory(catid) {
try{    
let category  =  await Category.findOne({ where: { id: catid } });
return await category;
}catch(e){
console.log(e);
}
}

exports.getProductDetails =  (req, res, next) => {
 var pid = req.params.productId;   
return getProduct(pid).then(values => {
var catid = values.category_id;
getProductCategory(catid).then(result =>{ 
res.render('productDetails',{product:values,productCat:result.name,csrfToken:req.csrfToken()});
}).catch(e => console.log(e)); 
}).catch(e => console.log(e));    
}

exports.postReviews =  (req, res, next) => {
console.log(req.body);
    res.redirect("back");
}