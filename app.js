const express = require('express')
const app = express()
const port = 3000
const db = require('./db');
const router = express.Router();


app.use('/api', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})