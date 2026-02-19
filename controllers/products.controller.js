const productsModel = require('../models/products.model');

exports.getProducts = async (req, res) => {
    try {
        const products = await productsModel.getProducts();
        res.json(products);
        console.log("Successfully retrieved products: " + products);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.createProduct = async (req, res) => {
    try {

        const product = await productsModel.create(req.body);
        res.status(201).json(product);
        console.log("Successfully created product: " + product);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getProduct = async (req, res) => {
    try {

        const product = await productsModel.getById(req.params.id);

        if(product){
            res.json(product);
            console.log("Successfully retrieved product: " + product);
        }else{
            res.status(404).json({ error: 'Product not found' });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const product = await productsModel.update(req.params.id, req.body);
        res.status(200).json(product);
        console.log("Successfully updated product: " + product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        await productsModel.delete(req.params.id);
        res.status(204).send();
        console.log("Successfully deleted product with ID: " + req.params.id);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}