const validator = require('validator');
const {isEmpty} = require('lodash');

const validateReviews = (errors,req) => {
if(isEmpty(req.body.name)){
errors['name'] = "Name Field cannot be empty!";
}
if(isEmpty(req.body.email)){
errors['email'] = "Email Field cannot be empty!";
}

if(isEmpty(req.body.number)){
errors['name'] = "Phone Number Field cannot be empty!";
}

if(isEmpty(req.body.message)){
errors['name'] = "Message Field cannot be empty!";
}
if(!validator.isEmail(req.body.email)){
    errors['email'] = "Invalid Email Format!";
    }
}

exports.reviewErrors = (errors,req) => {
return new Promise((resolve,reject) =>{
validateReviews(errors,req);
resolve(errors);
});
}