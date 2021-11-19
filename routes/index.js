var express = require('express');
const {getHome,getCategory,getContact} = require('../controllers/pages');
var router = express.Router();

/* GET home page. */
router.get('/', getHome);
router.get('/category', getCategory);
router.get('/contact', getContact);

module.exports = router;
