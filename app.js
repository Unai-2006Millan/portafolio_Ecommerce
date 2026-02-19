const express = require('express')
const app = express()
const port = 3000
const db = require('./db');
const passport = require('./config/passport');

app.use(passport.initialize());

app.use(express.json());

const usersRouter = require('./routes/users.routes');
app.use('/users', usersRouter);

const productsRouter = require('./routes/products.routes');
app.use('/products', productsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});