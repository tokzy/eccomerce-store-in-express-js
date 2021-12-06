const {Cart,Products} = require("../models");
const {fetchcartCounts} = require("./pages");
const {fetchCartItems} = require("./cart");



exports.cartCheckout = (req,res,next) => {
return fetchcartCounts(req).then(count => {
fetchCartItems(count).then(items => {
res.render('checkout',{csrfToken:req.csrfToken(),cartItems:items,formerrors:{},formData:{},authUser:req.user,cartTotal:count});
}).catch(e => console.log(e));  
}).catch(e => console.log(e));
}