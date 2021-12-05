var express = require('express');
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });
const {getHome,getCategory,getContact} = require('../controllers/pages');
const {getProductsByBrand} = require('../controllers/brand');
const {getProductsByCategory} = require('../controllers/category');
const {getProductDetails,postReviews} = require('../controllers/products');
const {addProductToCart,CartView,updateItem,DeleteCartItem} = require('../controllers/cart');
const {Login,Signup,registerUser,loginUser,logoutUser} = require('../controllers/auth');
const {isLoggedin,notLoggedin} = require('../middleware/Auth');
var router = express.Router();


router.get('/', getHome);
router.get('/category', getCategory);
router.get('/contact', getContact);
router.get('/login',notLoggedin,csrfProtection, Login);
router.post('/login',csrfProtection, loginUser);
router.get('/signup',notLoggedin,csrfProtection, Signup);
router.post('/signup',csrfProtection,registerUser);
router.get('/logout',logoutUser);
router.post('/logout', logoutUser);
router.get('/brand/:brandId',getProductsByBrand);
router.get('/category/:catId',getProductsByCategory);
router.get('/product/:productId',csrfProtection, getProductDetails);
router.post('/product/:productId',csrfProtection,postReviews);
router.post('/cart/product/add',addProductToCart);
router.get('/cart/list',CartView);
router.put('/cart/update',updateItem);
router.delete('/cart/delete',DeleteCartItem);

module.exports = router;
