const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders.controller');

/**
 * @swagger
 * /users/orders:
 *   get:
 *     summary: Obtener todas las órdenes
 *     description: Recupera una lista completa de todas las órdenes compra del sistema
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: Lista de órdenes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error en el servidor
 */
router.get('/', ordersController.getOrders);

/**
 * @swagger
 * /users/orders/{id}:
 *   get:
 *     summary: Obtener orden por ID
 *     description: Recupera los detalles de una orden específica
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden
 *     responses:
 *       200:
 *         description: Orden encontrada
 *       404:
 *         description: Orden no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', ordersController.getOrderById);

/**
 * @swagger
 * /users/orders/updateOrder/{id}:
 *   put:
 *     summary: Actualizar orden
 *     description: Actualiza la información de una orden existente
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *               fechaActualizacion:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Orden actualizada exitosamente
 *       404:
 *         description: Orden no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put('/updateOrder/:id', ordersController.updateOrder);

/**
 * @swagger
 * /users/orders/deleteOrder/{id}:
 *   delete:
 *     summary: Eliminar orden
 *     description: Elimina una orden del sistema
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden a eliminar
 *     responses:
 *       200:
 *         description: Orden eliminada exitosamente
 *       404:
 *         description: Orden no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete('/deleteOrder/:id', ordersController.deleteOrder);

/**
 * @swagger
 * /users/orders/{id}/products:
 *   get:
 *     summary: Obtener productos de la orden
 *     description: Recupera todos los productos contenidos en una orden específica
 *     tags:
 *       - Orders - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden
 *     responses:
 *       200:
 *         description: Productos de la orden obtenidos exitosamente
 *       404:
 *         description: Orden no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id/products', ordersController.getProductsByOrderId);

/**
 * @swagger
 * /users/orders/{id}/products:
 *   post:
 *     summary: Agregar producto a la orden
 *     description: Añade un nuevo producto a una orden existente
 *     tags:
 *       - Orders - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productoId:
 *                 type: integer
 *               cantidad:
 *                 type: integer
 *             required:
 *               - productoId
 *               - cantidad
 *     responses:
 *       201:
 *         description: Producto agregado a la orden exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Orden o producto no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.post('/:id/products/', ordersController.addProductToOrder);

/**
 * @swagger
 * /users/orders/{id}/products/{productId}:
 *   put:
 *     summary: Actualizar producto en orden
 *     description: Actualiza la cantidad de un producto en una orden
 *     tags:
 *       - Orders - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cantidad:
 *                 type: integer
 *             required:
 *               - cantidad
 *     responses:
 *       200:
 *         description: Producto actualizado en la orden
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Orden o producto no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id/products/:productId', ordersController.updateProductInOrder);

/**
 * @swagger
 * /users/orders/{id}/products/{productId}:
 *   delete:
 *     summary: Eliminar producto de la orden
 *     description: Remueve un producto de una orden
 *     tags:
 *       - Orders - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto removido de la orden exitosamente
 *       404:
 *         description: Orden o producto no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id/products/:productId', ordersController.deleteProductFromOrder);


module.exports = router;