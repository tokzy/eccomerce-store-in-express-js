const validator = require('validator');
const {isEmpty} = require('lodash');
const {Users} = require('../models');

async function checkEmail(req){
let email = req.body.email.trim();    
try{
let check = await Users.count({where:{email:email}});
return await check;
}catch(e){
console.log(e);
}    
}

const validateSignup = (errors,req) => {
if(isEmpty(req.body.fname.trim())){
errors['fname'] = "FullName Field cannot be empty!";
}
if(isEmpty(req.body.email.trim())){
errors['email'] = "Email Field cannot be empty!";
}

if(isEmpty(req.body.phone.trim())){
errors['phone'] = "Phone Number Field cannot be empty!";
}

if(isEmpty(req.body.password.trim())){
errors['password'] = "Password Field cannot be empty!";
}

if(isEmpty(req.body.cpassword.trim())){
errors['cpassword'] = "Confirm Password Field cannot be empty!";
}

if(req.body.cpassword.trim() != req.body.password.trim()){
errors['cpassword'] = "Confirm Password Does Not Match Password!";
}    

if(!isEmpty(req.body.email.trim()) && !validator.isEmail(req.body.email.trim())){
errors['email'] = "Invalid Email Format!";
}
}

exports.signupErrors = (errors,req) => {
return new Promise((resolve,reject) => {
validateSignup(errors,req);
checkEmail(req).then(checkemail => {
if(checkemail > 0){
errors['email'] = "Email already Exists!";   
}
resolve(errors);
})
});
}