const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/carts.controller');

// Rutas para manejar carritos

router.get('/', cartsController.getCarts);
router.post('/newCart', cartsController.createCart);

router.get('/:id', cartsController.getCart);
router.put('/updateCart/:id', cartsController.updateCart);
router.delete('/deleteCart/:id', cartsController.deleteCart);

// Rutas para manejar productos en el carrito

router.get('/:id/products', cartsController.getCartProducts);
router.get('/:id/products/:idProducto', cartsController.getCartProduct);
router.post('/:id/products', cartsController.addProductToCart);
router.put('/:id/products/:productId', cartsController.updateCartProduct);
router.delete('/:id/products/:productId', cartsController.removeProductFromCart);

// Ruta para manejar el proceso de compra
router.post('/:id/orderCart', cartsController.orderCart);

module.exports = router;