const {Products} = require("../models");

async function fetchallProducts(id){
try{
let brands = await Products.findAll({
    where: {
      brand_id: id
    }
  });
return await brands;  
}catch(e){
return console.log(e);
}   
}

exports.getProductsByBrand =  (req, res, next) => {
id = req.params.brandId;
return fetchallProducts(id).then(values =>{
res.render("category", {title:'brands',results:values});
}).catch(e => console.log(e));
}
