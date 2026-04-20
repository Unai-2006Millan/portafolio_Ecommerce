const db = require('../db');
const productsModel = require('../models/products.model');

// Métodos para manejar órdenes

exports.getOrders = async () => {
    try {
        const result = await db.query('SELECT * FROM pedidos');
        return result.rows;
    } catch (err) {
        throw new Error('Error fetching orders: ' + err.message);
    }
}

exports.getOrderTotalPrice = async (cartId) => {
    try {
        const result = await db.query(
            `SELECT COALESCE(SUM(precio_total_producto::numeric), 0)::float8 AS total_price
             FROM pedidos_productos
             WHERE id_pedido = $1`,
            [cartId]
        );
        return Number(result.rows[0].total_price) || 0;
    } catch (err) {
        throw new Error('Error fetching cart total price: ' + err.message);
    }
}

exports.updateOrderTotalPrice = async (orderId, total) => {
    try {
        await db.query(
            'UPDATE pedidos SET precio_total = ($1::numeric)::money WHERE id_pedido = $2',
            [total, orderId]
        );
    } catch (err) {
        throw new Error('Error updating order total price: ' + err.message);
    }
}



exports.createFromCart = async (cart, cart_products, precio_total) => {
    try {
        const { id_usuario } = cart;
        
        const result = await db.query(
            'INSERT INTO pedidos (id_usuario, precio_total) VALUES ($1, ($2::numeric)::money) RETURNING *',
            [id_usuario, precio_total]
        );

        const id_pedido = result.rows[0].id_pedido;
        const order_products = [];

        // Bucle para insertar cada producto del carrito en la tabla pedidos_productos
        for (const product of cart_products) {
            const { id_producto, cantidad, precio_total_producto } = product;

            let stock = await productsModel.getProductStock(id_producto);
            if (stock < cantidad) {
                throw new Error(`Insufficient stock for product ID ${id_producto}`);
            }
            stock -= cantidad;
            await productsModel.updateStock(id_producto, stock);

            const productResult = await db.query(
                'INSERT INTO pedidos_productos (id_pedido, id_producto, cantidad, precio_total_producto) VALUES ($1, $2, $3, ($4::numeric)::money) RETURNING *',
                [id_pedido, id_producto, cantidad, precio_total_producto]
            );
            order_products.push(productResult.rows[0]);
        }

        return { ...result.rows[0], products: order_products };

    }  catch (err) {
        throw new Error('Error creating order from cart: ' + err.message);
    }
}

exports.getOrdersById = async (id_order) => {
    try {
        const result = await db.query('SELECT * FROM pedidos WHERE id_pedido = $1', [id_order]);
        return result.rows[0];
    } catch (err) {
        throw new Error('Error fetching order: ' + err.message);
    }
} 

exports.updateOrder = async (id_order, orderData) => {
    try {
        const { id_usuario, precio_total } = orderData;
        
        const result = await db.query(
            'UPDATE pedidos SET id_usuario = $1, precio_total = ($2::numeric)::money WHERE id_pedido = $3 RETURNING *',
            [id_usuario, precio_total, id_order]
        );
        return result.rows[0];
    } catch (err) {
        throw new Error('Error updating order: ' + err.message);
    }
}

exports.deleteProdsuctsFromOrder = async (id_order) => {
    try {
        await db.query('DELETE FROM pedidos_productos WHERE id_pedido = $1', [id_order]);
    } catch (err) {
        throw new Error('Error deleting products from order: ' + err.message);
    }
}

exports.deleteOrder = async (id_order) => {
    try {
        await db.query('DELETE FROM pedidos WHERE id_pedido = $1', [id_order]);
    } catch (err) {
        throw new Error('Error deleting order: ' + err.message);
    }
}

// Métodos para manejar productos en órdenes

exports.getProductsByOrderId = async (orderId) => {
    try {

        const result = await db.query(
            `SELECT cp.id_producto, p.nombre, (p.precio::numeric)::float8 AS precio, cp.cantidad, (cp.precio_total_producto::numeric)::float8 AS precio_total_producto
             FROM productos p
             JOIN pedidos_productos cp ON p.id = cp.id_producto
             WHERE cp.id_pedido = $1`,
            [orderId]
        );

        return result.rows;

    } catch (err) {
        throw new Error('Error fetching order products: ' + err.message);
    }
}

exports.addProductToOrder = async (orderId, productData) => {
    try {
        const { id_producto, cantidad } = productData;

        let stock = await productsModel.getProductStock(id_producto);
        if (stock < cantidad) {
            throw new Error(`Insufficient stock for product ID ${id_producto}`);
        }

        stock -= cantidad;
        await productsModel.updateStock(id_producto, stock);

        const precio_total_producto = await productsModel.getPriceById(id_producto) * cantidad;

        const result = await db.query(
            'INSERT INTO pedidos_productos (id_pedido, id_producto, cantidad, precio_total_producto) VALUES ($1, $2, $3, ($4::numeric)::money) RETURNING *',
            [orderId, id_producto, cantidad, precio_total_producto]
        );

        return result.rows[0];
    } catch (err) {
        throw new Error('Error adding product to order: ' + err.message);
    }
}

exports.updateProductInOrder = async (orderId, productId, productData) => {
    try {
        const { cantidad } = productData;

        let stock = await productsModel.getProductStock(productId);
        if (stock < cantidad) {
            throw new Error(`Insufficient stock for product ID ${productId}`);
        }   
        stock -= cantidad;
        await productsModel.updateStock(productId, stock);

        const precio_total_producto = await productsModel.getPriceById(productId) * cantidad;
        const result = await db.query(
            'UPDATE pedidos_productos SET cantidad = $1, precio_total_producto = ($2::numeric)::money WHERE id_pedido = $3 AND id_producto = $4 RETURNING *',
            [cantidad, precio_total_producto, orderId, productId]
        );
        return result.rows[0];
     
    } catch (err) {
        throw new Error('Error updating product in order: ' + err.message);
    }
}

exports.deleteProductFromOrder = async (orderId, productId) => {
    try {
        await db.query(
            'DELETE FROM pedidos_productos WHERE id_pedido = $1 AND id_producto = $2',
            [orderId, productId]
        );
    } catch (err) {
        throw new Error('Error deleting product from order: ' + err.message);
    }
}