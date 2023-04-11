const mongoose = require('../db/mongoose');

const express = require('express');

const app = express();


app.listen(3000, (req, res) =>
  console.log('Example app listening on port 3000!'),

);

app.get('/', (req, res) =>{
    res.send('hello');
})

