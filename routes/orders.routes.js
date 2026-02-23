const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders.controller');

// Rutas para manejar órdenes
router.get('/', ordersController.getOrders);
router.get('/:id', ordersController.getOrderById);
router.put('/updateOrder/:id', ordersController.updateOrder);
router.delete('/deleteOrder/:id', ordersController.deleteOrder);

// Rutas para manejar productos en órdenes
router.get('/:id/products', ordersController.getProductsByOrderId);
router.post('/:id/products/', ordersController.addProductToOrder);
router.put('/:id/products/:productId', ordersController.updateProductInOrder);
router.delete('/:id/products/:productId', ordersController.deleteProductFromOrder);


module.exports = router;