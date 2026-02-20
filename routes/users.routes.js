const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const cartsRouter = require('./carts.routes');

// Nested routes for carts
router.use('/carts', cartsRouter);


router.get('/', usersController.getUsers);
router.post('/register', usersController.createUser);

router.post('/login', usersController.loginUser);

router.get('/:id', usersController.getUser);
router.put('/updateUser/:id', usersController.updateUser);
router.delete('/deleteUser/:id', usersController.deleteUser);


module.exports = router;
