var express = require('express');
const {getHome,getCategory,getContact} = require('../controllers/pages');
const {getProductsByBrand} = require('../controllers/brand');

var router = express.Router();

router.get('/', getHome);
router.get('/category', getCategory);
router.get('/contact', getContact);
router.get('/brand/:brandId',getProductsByBrand);



module.exports = router;
