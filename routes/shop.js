const path = require('path');

const express = require('express');

const shopController = require('../controllers/shopController');

const router = express.Router();

//register routes
router.get('/', shopController.getIndex);



router.get('/products',shopController.getProducts);
//dynamic routing
router.get('/products/:productId',shopController.getProduct);//so express wont look for route but instead any string or number (/products/ID33)
//must got at end or may trigger other routes

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.get('/checkout',shopController.getCheckout);

router.get('/orders',shopController.getOrders);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);




module.exports = router;
