const validator = require('validator');
const {isEmpty} = require('lodash');

const validateBillingForm = (errors,req) => {
if(isEmpty(req.body.state.trim())){
errors['state'] = "State Field cannot be empty!";
}

if(isEmpty(req.body.city.trim())){
errors['city'] = "City Field cannot be empty!";
}

if(isEmpty(req.body.address.trim()) ){
errors['address'] = "Address Field Cannot Be Empty!";
}

if(!req.body.terms){
errors['terms'] = "You need to accept the terms and conditions!";
}

}

exports.BillingformErrors = (errors,req) => {
return new Promise((resolve,reject) => {
validateBillingForm(errors,req);
resolve(errors);
});
}