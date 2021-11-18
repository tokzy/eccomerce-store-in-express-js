var express = require('express');
var index = require('../controllers/pages');
var router = express.Router();

/* GET home page. */
router.get('/', index.getHome);
router.get('/category', index.getCategory);
router.get('/contact', index.getContact);

module.exports = router;
