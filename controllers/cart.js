const {Cart,Products} = require("../models");
const {fetchcartCounts} = require("./pages");


async function addToCart(req){
var product_id = Number(req.body.productId);
var qty = Number(req.body.qty);
var price = Number(req.body.price);
var user;
var add;
try{
if(req.user){
user = req.user.id;
add = await Cart.create({ product_id: product_id, qty:qty, price:price,user_id: user });
}else{
user = req.cookies.cookieName;
add = await Cart.create({ product_id: product_id, qty:qty, price:price,guest_id: user });
}    
return await add;
}catch(e){
console.log(e);  
}
}

async function countCart(req){
var product_id = Number(req.body.productId);    
var user;
var count;
try{
if(req.user){
user = req.user.id;
count = await Cart.count({ where: { product_id: product_id,user_id:user}});
}else{
user = req.cookies.cookieName;
count = await Cart.count({ where: { product_id: product_id,guest_id:user }});
}        
return await count;
}catch(e){
console.log(e);   
}    
}

exports.fetchCartItems = async (itemsId) =>{
let items = [];
try{
for(const itemid of itemsId){
let item = await Products.findOne({ where: { id: itemid.product_id } });
item['qty'] = itemid.qty;
item['cartId'] = itemid.id;
items.push(item);
};
return await items;
}catch(e){
console.log(e);   
}    
}

async function removeCartitem(req){
var product_id = Number(req.body.productId);    
try{
let deleteItem = await Cart.destroy({ where: {id: product_id }  });
return await deleteItem;
}catch(e){
console.log(e);   
}    
}

async function updateCartitem(req){
const product_id = req.body.id;    
const qty = Number(req.body.qty);
try{
let updateItem = await Cart.update({qty:qty},{ where: {product_id: product_id }  });
return await updateItem;
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
return fetchcartCounts(req).then(count => {
this.fetchCartItems(count).then(items => {
res.render('cart',{authUser:req.user,cartTotal:count,cartItems:items});
}).catch(e => console.log(e));  
}).catch(e => console.log(e));
}

exports.DeleteCartItem =  (req, res, next) => {
return removeCartitem(req).then(cart => {
if(cart){
res.send('success');
}
}).catch(e => console.log(e));
}

exports.updateItem =  (req, res, next) => {
const qty = Number(req.body.qty);
const price = Number(req.body.price);
const total = qty * price;  
return updateCartitem(req).then(update => {
res.send(`${total}`);
}).catch(e => console.log(e)); 
}


