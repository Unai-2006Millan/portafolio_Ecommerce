const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/carts.controller');

/**
 * @swagger
 * /users/carts:
 *   get:
 *     summary: Obtener todos los carritos
 *     description: Recupera una lista de todos los carritos del sistema
 *     tags:
 *       - Carts
 *     responses:
 *       200:
 *         description: Lista de carritos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error en el servidor
 */
router.get('/', cartsController.getCarts);

/**
 * @swagger
 * /users/carts/newCart:
 *   post:
 *     summary: Crear nuevo carrito
 *     description: Crea un nuevo carrito de compras para un usuario
 *     tags:
 *       - Carts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuarioId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Carrito creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error en el servidor
 */
router.post('/newCart', cartsController.createCart);

/**
 * @swagger
 * /users/carts/{id}:
 *   get:
 *     summary: Obtener carrito por ID
 *     description: Recupera los detalles de un carrito específico
 *     tags:
 *       - Carts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del carrito
 *     responses:
 *       200:
 *         description: Carrito encontrado
 *       404:
 *         description: Carrito no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', cartsController.getCart);

/**
 * @swagger
 * /users/carts/updateCart/{id}:
 *   put:
 *     summary: Actualizar carrito
 *     description: Actualiza la información de un carrito existente
 *     tags:
 *       - Carts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del carrito
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuarioId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Carrito actualizado exitosamente
 *       404:
 *         description: Carrito no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put('/updateCart/:id', cartsController.updateCart);

/**
 * @swagger
 * /users/carts/deleteCart/{id}:
 *   delete:
 *     summary: Eliminar carrito
 *     description: Elimina un carrito del sistema
 *     tags:
 *       - Carts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del carrito a eliminar
 *     responses:
 *       200:
 *         description: Carrito eliminado exitosamente
 *       404:
 *         description: Carrito no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete('/deleteCart/:id', cartsController.deleteCart);

/**
 * @swagger
 * /users/carts/{id}/products:
 *   get:
 *     summary: Obtener productos del carrito
 *     description: Recupera todos los productos contenidos en un carrito específico
 *     tags:
 *       - Carts - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del carrito
 *     responses:
 *       200:
 *         description: Productos del carrito obtenidos exitosamente
 *       404:
 *         description: Carrito no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id/products', cartsController.getCartProducts);

/**
 * @swagger
 * /users/carts/{id}/products/{idProducto}:
 *   get:
 *     summary: Obtener producto específico del carrito
 *     description: Recupera un producto específico contenido en un carrito
 *     tags:
 *       - Carts - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del carrito
 *       - in: path
 *         name: idProducto
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado en el carrito
 *       404:
 *         description: Carrito o producto no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id/products/:idProducto', cartsController.getCartProduct);

/**
 * @swagger
 * /users/carts/{id}/products:
 *   post:
 *     summary: Agregar producto al carrito
 *     description: Añade un nuevo producto al carrito de compras
 *     tags:
 *       - Carts - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del carrito
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
 *         description: Producto agregado al carrito exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Carrito o producto no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.post('/:id/products', cartsController.addProductToCart);

/**
 * @swagger
 * /users/carts/{id}/products/{productId}:
 *   put:
 *     summary: Actualizar producto en carrito
 *     description: Actualiza la cantidad de un producto en el carrito
 *     tags:
 *       - Carts - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del carrito
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
 *         description: Producto actualizado en el carrito
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Carrito o producto no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id/products/:productId', cartsController.updateCartProduct);

/**
 * @swagger
 * /users/carts/{id}/products/{productId}:
 *   delete:
 *     summary: Eliminar producto del carrito
 *     description: Remueve un producto del carrito de compras
 *     tags:
 *       - Carts - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del carrito
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto removido del carrito exitosamente
 *       404:
 *         description: Carrito o producto no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id/products/:productId', cartsController.removeProductFromCart);

/**
 * @swagger
 * /users/carts/{id}/orderCart:
 *   post:
 *     summary: Procesar compra (Crear orden desde carrito)
 *     description: Convierte el carrito en una orden de compra
 *     tags:
 *       - Carts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del carrito
 *     responses:
 *       201:
 *         description: Orden creada exitosamente
 *       400:
 *         description: El carrito está vacío o datos inválidos
 *       404:
 *         description: Carrito no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.post('/:id/orderCart', cartsController.orderCart);

module.exports = router;