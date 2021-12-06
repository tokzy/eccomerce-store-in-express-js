const {Products,Category,Productreview,Cart} = require("../models");
const {reviewErrors} = require("../validators/productreview");
const {isEmpty} = require("lodash");
const {CookiemanageAsync} = require('./pagecookie');
const {fetchcartCounts} = require('./pages');

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

async function saveReviews(pid,req) {
var name = req.body.name.trim();
var phone = req.body.number.trim();
var email = req.body.email.trim();
var message = req.body.message.trim();    
try{    
let reviews  =  await Productreview.create({ product_id: pid, name:name, email:email,phone:phone,review_text:message,star_ratings: 5 });
return await reviews;
}catch(e){
console.log(e);
}
}

async function getallReviews(pid) {
try{    
let allreviews  =  await Productreview.findAll({ where: { product_id: pid },order:[['id', 'DESC']] });
return await allreviews;
}catch(e){
console.log(e);
}
}

exports.getProductDetails =  (req, res, next) => {
var pid = req.params.productId;   
return CookiemanageAsync(req,res).then(cookie =>{
getProduct(pid).then(values => {
var catid = values.category_id;
getProductCategory(catid).then(result =>{ 
    getallReviews(pid).then(reviews => {      
        fetchcartCounts(req).then(count => {
            res.render('productDetails',{cartTotal:count,productReviews:reviews,formData: {},formerrors:{}
            ,product:values,productCat:result.name,csrfToken:req.csrfToken(),authUser:req.user});            
        }).catch(e => console.log(e));
    }).catch(e => console.log(e));

}).catch(e => console.log(e)); 
}).catch(e => console.log(e));    
}).catch(e => console.log(e));
}

const renderProduct = (errors,req,res,next) => {
var pid = req.params.productId;   
return CookiemanageAsync(req,res).then(cookie =>{
getProduct(pid).then(values => {
var catid = values.category_id;
getProductCategory(catid).then(result =>{        
    getallReviews(pid).then(reviews =>{ 
        fetchcartCounts(req).then(count => { 
res.render('productDetails',{cartTotal:count,productReviews:reviews,formData: req.body,formerrors:errors
    ,product:values,productCat:result.name,csrfToken:req.csrfToken(),authUser:req.user});
}).catch(e => console.log(e));
}).catch(e => console.log(e));

}).catch(e => console.log(e)); 
}).catch(e => console.log(e));      
}).catch(e => console.log(e));
}

exports.postReviews =  (req, res, next) => {
errors = {};
reviewErrors(errors,req).then(errors => {
if(!isEmpty(errors)){
renderProduct(errors,req,res,next);
console.log(errors);
}else{
pid = req.params.productId;    
saveReviews(pid,req).then(results => { 
req.flash('review','review submitted successfully');
res.redirect('back');
}).catch(e => console.log(e));
}
});

}