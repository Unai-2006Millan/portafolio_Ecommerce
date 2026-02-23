const cartsModel = require('../models/carts.model');
const usersModel = require('../models/users.model');
const ordersModel = require('../models/orders.model');

// Controladores para manejar carritos

exports.getCarts = async (req, res) => {
    try {
        const carts = await cartsModel.getCarts();
        res.json(carts);
        console.log("Successfully retrieved carts: " + carts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.createCart = async (req, res) => {
    try {
        const { id_usuario } = req.body;

        // Verify user exists before creating cart to avoid FK violation
        const user = await usersModel.getById(id_usuario);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const cart = await cartsModel.create(req.body);
        res.status(201).json(cart);
        console.log("Successfully created cart: " + JSON.stringify(cart));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getCart = async (req, res) => {
    try {

        const cart = await cartsModel.getById(req.params.id);

        if(cart){
            res.json(cart);
            console.log("Successfully retrieved cart: " + JSON.stringify(cart));
        }else{
            res.status(404).json({ error: 'Cart not found' });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.updateCart = async (req, res) => {
    try {

        const cart = await cartsModel.update(req.params.id, req.body);
        res.status(200).json(cart);
        console.log("Successfully updated cart: " + JSON.stringify(cart));

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.deleteCart = async (req, res) => {
    try {

        await cartsModel.delete(req.params.id);
        res.status(204).send();
        console.log("Successfully deleted cart with id: " + req.params.id);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Manejo de productos en el carrito

exports.getCartProducts = async (req, res) => {
    try {

        const products = await cartsModel.getCartProducts(req.params.id);
        res.json(products);
        console.log("Successfully retrieved products for cart id " + req.params.id + ": " + JSON.stringify(products));

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getCartProduct = async (req, res) => {
    try {
        const product = await cartsModel.getCartProduct(req.params.id, req.params.idProducto);
        if (product) {
            res.json(product);
            console.log("Successfully retrieved product id " + req.params.idProducto + " for cart id " + req.params.id + ": " + JSON.stringify(product));
        } else {
            res.status(404).json({ error: 'Product not found in cart' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.addProductToCart = async (req, res) => {
    try {
        const addProduct = await cartsModel.addProductToCart(req.params.id, req.body);

        const total = await cartsModel.getCartTotalPrice(req.params.id);
        await cartsModel.updateTotal_price(req.params.id, total);

        res.status(201).json(addProduct);
        console.log("Successfully added product to cart id " + req.params.id + ": " + addProduct);
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.updateCartProduct = async (req, res) => {
    try {
        const updatedProduct = await cartsModel.updateCartProduct(req.params.id, req.params.productId, req.body);

        const total = await cartsModel.getCartTotalPrice(req.params.id);
        await cartsModel.updateTotal_price(req.params.id, total);
        
        res.status(200).json(updatedProduct);
        console.log("Successfully updated product id " + req.params.productId + " in cart id " + req.params.id + ": " + JSON.stringify(updatedProduct));

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.removeProductFromCart = async ( req, res) => {
    try {

        await cartsModel.removeProductFromCart(req.params.id, req.params.productId);
        const total = await cartsModel.getCartTotalPrice(req.params.id);
        await cartsModel.updateTotal_price(req.params.id, total);
        res.status(204).send();
        console.log("Successfully removed product id " + req.params.productId + " from cart id " + req.params.id);
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


// Controlador para manejar el proceso de compra

exports.orderCart = async (req, res) => {
    try {
        const cart = await cartsModel.getById(req.params.id);
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        const total_price = await cartsModel.getCartTotalPrice(req.params.id);
        
        const cart_products = await cartsModel.getCartProducts(req.params.id);

        const order = await ordersModel.createFromCart(cart, cart_products, total_price);
        res.status(201).json(order);
        console.log("Successfully created order from cart id " + req.params.id + ": " + JSON.stringify(order));

    }catch (err) {
        res.status(500).json({ error: err.message });
    }
}