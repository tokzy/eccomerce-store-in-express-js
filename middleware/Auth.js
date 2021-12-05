
exports.isLoggedin = (req,res,next) => {
if(req.user){
next()
return
}else{
res.redirect('/login');
next()
return
}   
}

exports.notLoggedin = (req,res,next) => {
if(req.user){
res.redirect('category');        
next()
return
}else{
next()
return
}   
}