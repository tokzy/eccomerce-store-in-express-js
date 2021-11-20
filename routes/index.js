var express = require('express');
const {getHome,getCategory,getContact} = require('../controllers/pages');
const {getProductsByBrand} = require('../controllers/brand');
const {getProductsByCategory} = require('../controllers/category');
const {getProductDetails} = require('../controllers/products');


var router = express.Router();

router.get('/', getHome);
router.get('/category', getCategory);
router.get('/contact', getContact);
router.get('/brand/:brandId',getProductsByBrand);
router.get('/category/:catId',getProductsByCategory);
router.get('/product/:productId',getProductDetails);

module.exports = router;
