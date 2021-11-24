const validator = require('validator');
const {isEmpty} = require('lodash');

const validateReviews = (errors,req) => {
if(isEmpty(req.body.name.trim())){
errors['name'] = "Name Field cannot be empty!";
}
if(isEmpty(req.body.email.trim())){
errors['email'] = "Email Field cannot be empty!";
}

if(isEmpty(req.body.number.trim())){
errors['phone'] = "Phone Number Field cannot be empty!";
}

if(isEmpty(req.body.message.trim())){
errors['message'] = "Message Field cannot be empty!";
}
if(!validator.isEmail(req.body.email.trim())){
errors['email_format'] = "Invalid Email Format!";
}
}

exports.reviewErrors = (errors,req) => {
return new Promise((resolve,reject) =>{
validateReviews(errors,req);
resolve(errors);
});
}