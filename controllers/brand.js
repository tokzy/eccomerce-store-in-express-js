const {Category,Products,Brands} = require("../models");
const {CookiemanageAsync} = require('./pagecookie');
const {fetchcartCounts} = require('./pages');


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
return CookiemanageAsync(req,res).then(cookie =>{
fetchallProducts(id).then(values => {
    fetchcartCounts(req).then(count => {
res.render("category", {cartTotal:count,authUser:req.user,title:'brands',categories:values[0],brands:values[1],products:values[2]});
}).catch(e => console.log(e));
}).catch(e => console.log(e));
}).catch(e => console.log(e));
}
