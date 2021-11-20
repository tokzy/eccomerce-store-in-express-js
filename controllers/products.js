const {Products} = require("../models");

async function getProduct(pid) {
try{    
let product  =  await Products.findOne({ where: { id: pid } });
return product;
}catch(e){
console.log(e);
}
}

exports.getProductDetails =  (req, res, next) => {
 var pid = req.params.productId;   
return getProduct(pid).then(values => {
res.render('productDetails',{product:values}); 
}).catch(e => console.log(e));    
}