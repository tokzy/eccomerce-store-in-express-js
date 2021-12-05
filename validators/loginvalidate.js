const validator = require('validator');
const {isEmpty} = require('lodash');

const validateLogin = (errors,req) => {
if(isEmpty(req.body.email.trim())){
errors['email'] = "Email Field cannot be empty!";
}

if(isEmpty(req.body.password.trim())){
errors['password'] = "Password Field cannot be empty!";
}

if(!isEmpty(req.body.email.trim()) && !validator.isEmail(req.body.email.trim())){
errors['email'] = "Invalid Email Format!";
}
}

exports.loginErrors = (errors,req) => {
return new Promise((resolve,reject) => {
validateLogin(errors,req);
resolve(errors);
});
}