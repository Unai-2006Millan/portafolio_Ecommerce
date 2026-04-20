const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const usersModel = require('../models/users.model');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, contrasenia, done) => {
        try {
            const user = await usersModel.findByEmail(email);

            if(!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }

            const isMatch = await bcrypt.compare(contrasenia, user.contrasenia);

            if(!isMatch) {
                return done(null, false, { message: 'Incorrect password.' });
            };

            return done(null, user);
            
        } catch(err) {
            return done(err);
        }
    }
));

module.exports = passport;