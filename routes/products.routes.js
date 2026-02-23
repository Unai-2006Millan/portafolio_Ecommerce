const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener todos los productos
 *     description: Recupera una lista completa de todos los productos disponibles
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error en el servidor
 */
router.get('/', productsController.getProducts);

/**
 * @swagger
 * /products/createProduct:
 *   post:
 *     summary: Crear nuevo producto
 *     description: Añade un nuevo producto al catálogo
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *               categoria:
 *                 type: string
 *               stock:
 *                 type: integer
 *             required:
 *               - nombre
 *               - precio
 *               - stock
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Datos inválidos o incompletos
 *       500:
 *         description: Error en el servidor
 */
router.post('/createProduct', productsController.createProduct);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtener producto por ID
 *     description: Recupera los detalles de un producto específico
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', productsController.getProduct);

/**
 * @swagger
 * /products/updateProduct/{id}:
 *   put:
 *     summary: Actualizar producto
 *     description: Actualiza la información de un producto existente
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
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
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *               categoria:
 *                 type: string
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put('/updateProduct/:id', productsController.updateProduct);

/**
 * @swagger
 * /products/deleteProduct/{id}:
 *   delete:
 *     summary: Eliminar producto
 *     description: Elimina un producto del catálogo
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a eliminar
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete('/deleteProduct/:id', productsController.deleteProduct);

module.exports = router;