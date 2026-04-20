const ordersModel = require('../models/orders.model');

// Controladores para manejar órdenes   

exports.getOrders = async (req, res) => {
    try {
        const orders = await ordersModel.getOrders();
        res.json(orders);
        console.log("Successfully retrieved orders: " + JSON.stringify(orders));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getOrderById = async (req, res) => {
    try {
        const order = await ordersModel.getOrdersById(req.params.id);

        if(order){
            res.json(order);
            console.log("Successfully retrieved order: " + JSON.stringify(order));
        } else{
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.updateOrder = async (req, res) => {
    try {

        const order = await ordersModel.updateOrder(req.params.id, req.body);
        res.status(200).json(order);
        console.log("Successfully updated order: " + JSON.stringify(order));

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.deleteOrder = async (req, res) => {
    try {
        await ordersModel.deleteProdsuctsFromOrder(req.params.id);

        await ordersModel.deleteOrder(req.params.id);
        res.status(204).send();
        console.log("Successfully deleted order with id: " + req.params.id);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Controladores para manejar productos en órdenes

exports.getProductsByOrderId = async (req, res) => {
    try {

        const products = await ordersModel.getProductsByOrderId(req.params.id);
        res.json(products);
        console.log("Successfully retrieved products for order id " + req.params.id + ": " + JSON.stringify(products));

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.addProductToOrder = async (req, res) => {
    try {

        const product = await ordersModel.addProductToOrder(req.params.id, req.body);
        const total = await ordersModel.getOrderTotalPrice(req.params.id);
        await ordersModel.updateOrderTotalPrice(req.params.id, total);
        res.status(201).json(product);
        console.log("Successfully added product to order id " + req.params.id + ": " + JSON.stringify(product));

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.updateProductInOrder = async (req, res) => {
    try {

        const product = await ordersModel.updateProductInOrder(req.params.id, req.params.productId, req.body);
        const total = await ordersModel.getOrderTotalPrice(req.params.id);
        await ordersModel.updateOrderTotalPrice(req.params.id, total);
        res.status(200).json(product);
        console.log("Successfully updated product id " + req.params.productId + " in order id " + req.params.id + ": " + JSON.stringify(product));

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.deleteProductFromOrder = async (req, res) => {
    try {
        await ordersModel.deleteProductFromOrder(req.params.id, req.params.productId);
        const total = await ordersModel.getOrderTotalPrice(req.params.id);
        await ordersModel.updateOrderTotalPrice(req.params.id, total);
        res.status(204).send();
        console.log("Successfully deleted product id " + req.params.productId + " from order id " + req.params.id);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}