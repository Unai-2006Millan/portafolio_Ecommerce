const db = require('../db');

exports.getProducts = async () => {
    try {

        const result = await db.query('select * from productos');
        return result.rows;

    } catch (err) {
        throw new Error('Error fetching products: ' + err.message);
    }
}

exports.getProductStock = async (id) => {
    try {
        const result = await db.query('select stock from productos where id = $1', [id]);
        return result.rows[0].stock;
    } catch (err) {
        throw new Error('Error fetching product stock: ' + err.message);
    }
}

exports.create = async (product) => {
    try {

        const { nombre, description, price, stock } = product;
        const result = await db.query(
            'insert into productos (nombre, descripcion, precio, stock) values ($1, $2, $3, $4) returning *',
            [nombre, description, price, stock]
        );
        console.log("Creating product: " + result.rows[0]);
        console.log("Successfully created product: " + result.rows[0]);
        return result.rows[0];

    } catch (err) {
        throw new Error('Error creating product: ' + err.message);
    }
}

exports.getById = async (id) => {
    try {
        const result = await db.query('select * from productos where id = $1', [id]);
        return result.rows[0];

    } catch (err) {
        throw new Error('Error fetching product by ID: ' + err.message);
    }
}

exports.getPriceById = async (id) => {
    try {
        const result = await db.query('SELECT (precio::numeric)::float8 AS precio FROM productos WHERE id = $1', [id]);
        return result.rows[0].precio;
        
    }catch (err) {
        throw new Error('Error fetching product price by ID: ' + err.message);
    }
}
exports.update = async (id, product) => {
    try {

        const { nombre, description, price, stock } = product;
        const result = await db.query(
            'update productos set nombre = $1, descripcion = $2, precio = $3, stock = $4 where id = $5 returning *',
            [nombre, description, price, stock, id]
        );
        console.log("Updating product: " + result.rows[0]);
        return result.rows[0];

    } catch (err) {
        throw new Error('Error updating product: ' + err.message);
    }
}

exports.updateStock = async (id, stock) => {
    try {
        const result = await db.query(
            'update productos set stock = $1 where id = $2 returning *',
            [stock, id]
        );
        console.log("Updating product stock: " + result.rows[0]);
        return result.rows[0];
    } catch (err) {
        throw new Error('Error updating product stock: ' + err.message);
    }
}

exports.delete = async (id) => {
    try {

        await db.query('delete from productos where id = $1', [id]);
        console.log("Deleting product with ID: " + id);

    } catch(err) { 
        throw new Error('Error deleting product: ' + err.message);
    }
}