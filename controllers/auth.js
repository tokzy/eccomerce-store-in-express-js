const {Products,Category,Productreview,Cart} = require("../models");
const {reviewErrors} = require("../validators/productreview");
const {isEmpty} = require("lodash");
const {CookiemanageAsync} = require('./pagecookie');
const {fetchcartCounts} = require('./pages');












exports.Login = (req,res,next) => {
return CookiemanageAsync(req,res).then(cookie => {    
fetchcartCounts(req).then(count =>{
res.render('login',{cartTotal:count});
}).catch(e => console.log(e));
}).catch(e => console.log(e));
}


exports.Signup = (req,res,next) => {
    return CookiemanageAsync(req,res).then(cookie => {    
    fetchcartCounts(req).then(count =>{
    res.render('signup',{cartTotal:count});
    }).catch(e => console.log(e));
    }).catch(e => console.log(e));
    }