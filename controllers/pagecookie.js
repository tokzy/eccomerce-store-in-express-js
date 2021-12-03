const {isEmpty} = require('lodash');

// set cookies if absent 
function Cookiemanage (req,res){
    var randomNumber = Math.random().toString();
    var rando = randomNumber.substring(2,randomNumber.length);     
    return new Promise((resolve,reject) => {
        if(isEmpty(req.cookies.cookieName)){   
            if(res.cookie("cookieName",rando, {maxAge: 360000000})){
              resolve('cookie set');  
            }else{
             reject('error occur');   
            }
            }else{
             resolve('already set'); 
            }
    });
    
    }
// set cookie ends

exports.CookiemanageAsync = async (req,res) => {    
try{
let response = await Cookiemanage(req,res);    
return await response;
} catch(e){
 return e;   
}
}
    