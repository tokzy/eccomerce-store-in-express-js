const {Cart} = require("../models");
const {isEmpty} = require("lodash");
const {fetchcartCounts} = require("./pages");


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

async function countCart(req){
var product_id = Number(req.body.productId);    
try{
let count = await Cart.count({ where: { product_id: product_id }});
return await count;
}catch(e){
console.log(e);   
}    
}

exports.addProductToCart =  (req, res, next) => {
countCart(req).then(total => {
if(total <= 0){
addToCart(req).then(results => {
if(results){
res.send('success');    
}
}).catch(e => console.log(e));
}else{
}
}).catch(e => console.log(e));
}

exports.CartView =  (req, res, next) => {
return fetchcartCounts(req).then(count =>{
res.render('cart',{cartTotal:count});
}).catch(e => console.log(e));  
}