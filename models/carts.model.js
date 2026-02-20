const db = require('../db');
const productsModel = require('../models/products.model');

// Métodos para manejar carritos

exports.getCarts = async () => {
    try {
        const result = await db.query('select * from carrito_usuario');
        return result.rows;
    } catch (err) {
        throw new Error('Error fetching carts: ' + err.message);
    }
}

exports.getCartTotalPrice = async (cartId) => {
    try {
        const result = await db.query(
            `SELECT COALESCE(SUM(precio_total_producto::numeric), 0)::float8 AS total_price
             FROM carrito_productos
             WHERE id_carrito = $1`,
            [cartId]
        );
        return Number(result.rows[0].total_price) || 0;
    } catch (err) {
        throw new Error('Error fetching cart total price: ' + err.message);
    }
}

exports.create = async (cart) => {
    try {

        const { id_usuario } = cart;
        const result = await db.query(
            'INSERT INTO carrito_usuario (id_usuario) VALUES ($1) RETURNING *',
            [id_usuario]
        );

        return result.rows[0];

    } catch (err) {
        throw new Error('Error creating cart: ' + err.message);
    }
}

exports.getById = async (id) => {
    try {

        const result = await db.query('SELECT * FROM carrito_usuario WHERE id_carrito = $1', [id]);
        return result.rows[0];

    } catch (err) {
        throw new Error('Error fetching cart: ' + err.message);
    }
}

exports.update = async (id, cart) => {
    try {
        const { id_usuario, precio_total } = cart;
        const result = await db.query(
            'UPDATE carrito_usuario SET id_usuario = $1, precio_total = $2 WHERE id_carrito = $3 RETURNING *',
            [id_usuario, precio_total, id]
        );
        return result.rows[0];

    } catch (err) {
        throw new Error('Error updating cart: ' + err.message);
    }  
}

exports.updateTotal_price = async (id, precio_total) => {
    try {
        const result = await db.query(
            'UPDATE carrito_usuario SET precio_total = $1 WHERE id_carrito = $2 RETURNING *',
            [precio_total, id]
        );
        return result.rows[0];
    } catch (err) {
        throw new Error('Error updating cart total price: ' + err.message);
    }
}

exports.delete = async (id) => {
    try {
        await db.query('DELETE FROM carrito_usuario WHERE id_carrito = $1', [id]);

        console.log("Successfully deleted cart with ID: " + id);

    } catch (err) {
        throw new Error('Error deleting cart: ' + err.message);
    }   
}

// Métodos para manejar productos en el carrito

exports.getCartProducts = async (cartId) => {
    try {

        const result = await db.query(
            `SELECT p.nombre, (p.precio::numeric)::float8 AS precio, cp.cantidad, (cp.precio_total_producto::numeric)::float8 AS precio_total_producto
             FROM productos p
             JOIN carrito_productos cp ON p.id = cp.id_producto
             WHERE cp.id_carrito = $1`,
            [cartId]
        );

        return result.rows;

    } catch (err) {
        throw new Error('Error fetching cart products: ' + err.message);
    }
}

exports.addProductToCart = async (cartId, product) => {
    try {

        const { id_producto, cantidad } = product;

        const stockProduct = await productsModel.getProductStock(id_producto);

        if (cantidad < 0 || cantidad > stockProduct) {
            throw new Error('Invalid quantity. Must be greater than 0 and less than or equal to available stock.');
        }

        const rawPrice = await productsModel.getPriceById(id_producto);

        const precio_total = parseFloat((rawPrice * cantidad));

        const result = await db.query(
            `INSERT INTO carrito_productos (id_carrito, id_producto, cantidad, precio_total_producto)
             VALUES ($1, $2, $3, ($4::numeric)::money) RETURNING *`,
            [cartId, id_producto, cantidad, precio_total]
        );

        return result.rows[0];

    } catch (err) {
        throw new Error('Error adding product to cart: ' + err.message);
    }
}

exports.updateCartProduct = async (cartId, productId, product) => {
    try {

        const { cantidad } = product;
        const stockProduct = await productsModel.getProductStock(productId);

        if (cantidad < 0 || cantidad > stockProduct) {
            throw new Error('Invalid quantity. Must be greater than 0 and less than or equal to available stock.');
        }

        const rawPrice = await productsModel.getPriceById(productId);
        const precio_total = parseFloat((rawPrice * cantidad));
        const result = await db.query(
            `UPDATE carrito_productos 
             SET cantidad = $1, precio_total_producto = ($2::numeric)::money 
             WHERE id_carrito = $3 AND id_producto = $4 RETURNING *`,
            [cantidad, precio_total, cartId, productId]
        );

        return result.rows[0];

    } catch (err) {
        throw new Error('Error updating cart product: ' + err.message);
    }
}

exports.removeProductFromCart = async (cartId, productId) => {
    try {
        await db.query(
            `DELETE FROM carrito_productos WHERE id_carrito = $1 AND id_producto = $2`,
            [cartId, productId]
        );

        console.log("Successfully removed product with ID " + productId + " from cart with ID " + cartId);

    } catch (err) {
        throw new Error('Error removing product from cart: ' + err.message);
    }
}