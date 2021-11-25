var express = require('express');
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });
const {getHome,getCategory,getContact} = require('../controllers/pages');
const {getProductsByBrand} = require('../controllers/brand');
const {getProductsByCategory} = require('../controllers/category');
const {getProductDetails,postReviews} = require('../controllers/products');


var router = express.Router();

router.get('/', getHome);
router.get('/category', getCategory);
router.get('/contact', getContact);
router.get('/brand/:brandId',getProductsByBrand);
router.get('/category/:catId',getProductsByCategory);
router.get('/product/:productId',csrfProtection, getProductDetails);
router.post('/product/:productId',csrfProtection,postReviews);
router.post('/cart/product/add');

module.exports = router;
