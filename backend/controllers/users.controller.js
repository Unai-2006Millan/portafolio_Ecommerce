const usersModel = require('../models/users.model');
const passport = require('../config/passport');

exports.getUsers = async (req, res) => {
    try {
        const users = await usersModel.getAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.createUser = async (req, res) => {
    try{

        const user = await usersModel.create(req.body);
        res.status(201).json({ email: user.email });

    }catch(err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await usersModel.getById(req.params.id);

        if(user) {
            res.json(user);
            console.log("Successfully retrieved user: " + user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.updateUser = async (req, res) => {
    try {

        const user = await usersModel.update(req.params.id, req.body);

        res.status(200).json(user);

        console.log("Successfully updated user: " + user);

    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await usersModel.delete(req.params.id);
        res.status(204).send();
        console.log("Successfully deleted user with ID: " + req.params.id);
    }catch  (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.loginUser = async (req, res) => {
    try{
        await passport.authenticate('local', { successRedirect: '/profile', failureRedirect: '/login', session: false })
        console.log("Successfully logged in user: " + req.body.email);
        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
    