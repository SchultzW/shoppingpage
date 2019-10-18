const path = require('path');

const express = require('express');

const shopController = require('../controllers/shopController');

const router = express.Router();

//register routes
router.get('/', shopController.getIndex);

router.get('/products',shopController.getProducts);

router.get('/cart',shopController.getCart);

router.get('/checkout',shopController.getCheckout);

module.exports = router;
