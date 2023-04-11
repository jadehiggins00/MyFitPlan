const mongoose = require('../db/mongoose');

const express = require('express');
const Activity = require('./models/activities');
const bodyParser = require('body-parser');

const app = express();

//parse the incoming json requests
app.use(bodyParser.json());

app.post('/activities', (req, res) =>{

    Activity.create(req.body).then((activity) =>{
        res.status(201).send(activity);
    }).catch((error) => {
        res.status(400).send(error);
    })
})

app.listen(3000, (req, res) =>
  console.log('Example app listening on port 3000!'),

);

app.get('/', (req, res) =>{
    res.send('hello');
})

