const {Cart,Products} = require("../models");
const {fetchcartCounts} = require("./pages");
const {fetchCartItems} = require("./cart");
const { BillingformErrors } = require('../validators/billingvalidate');
const axios = require('axios');
const {isEmpty} = require('lodash');


async function initiatePayment(data,req){
try {    
let initiate  = await axios({ 
    method: 'post',
    headers: {'Authorization':'Bearer '+ process.env.SecKEY,'Content-Type': 'application/json'},
    url: 'https://api.flutterwave.com/v3/payments',
    data: JSON.stringify(data) 
});  
return await initiate;
}catch(e){
 console.log(e);   
}
}

exports.cartCheckout = (req,res,next) => {
return fetchcartCounts(req).then(count => {
fetchCartItems(count).then(items => {
res.render('checkout',{csrfToken:req.csrfToken(),cartItems:items,formerrors:{},formData:{},authUser:req.user,cartTotal:count});
}).catch(e => console.log(e));  
}).catch(e => console.log(e));
}

const rerendercartCheckout = (req,res,errors) => {
return fetchcartCounts(req).then(count => {
fetchCartItems(count).then(items => {
res.render('checkout',{csrfToken:req.csrfToken(),cartItems:items,formerrors:errors,formData:req.body,authUser:req.user,cartTotal:count});
}).catch(e => console.log(e));  
}).catch(e => console.log(e));
}

exports.saveCheckout = (req,res,next) => {
let errors = {};    
var data = {
    tx_ref: Math.random().toString()+"hooli-tx-1920bbtytty",
    amount: Number(req.body.total),
    currency: "NGN",
    redirect_url:"http://localhost:5000/completed",
    customer:{
        email:req.user.email,
        phonenumber:req.user.phone,
        name:req.user.fullname
     },
     customizations:{
        title:"Eiser Eccomerce",
        description:"Eccomerce testing"
     }
    }
return BillingformErrors(errors,req).then(error => { 
if(!isEmpty(error)){
rerendercartCheckout(req,res,error);
}else{
initiatePayment(data).then(response =>{
return res.redirect(`${response.data.data.link}`);
}).catch(e => console.log(e));    
}
}).catch(e => console.log(e));
}