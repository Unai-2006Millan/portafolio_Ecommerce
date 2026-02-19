const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');

router.get('/', productsController.getProducts);
router.post('/createProduct', productsController.createProduct);

router.get('/:id', productsController.getProduct);
router.put('/updateProduct/:id', productsController.updateProduct);
router.delete('/deleteProduct/:id', productsController.deleteProduct);

module.exports = router;