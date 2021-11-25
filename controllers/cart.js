const {Cart} = require("../models");
const {isEmpty} = require("lodash");

async function addToCart(req){
    var product_id = Number(req.body.productId);
    var qty = Number(req.body.qty);
    var price = Number(req.body.price);
    var guestid = req.cookies.cookieName;
    try{
    let add = await Cart.create({ product_id: product_id, qty:qty, price:price,guest_id: guestid });
    return await add;
    }catch(e){
      console.log(e);  
    }
}


exports.addProductToCart =  (req, res, next) => {
addToCart(req).then(results => {
if(results){
res.send('success');    
}
}).catch(e => console.log(e));

}