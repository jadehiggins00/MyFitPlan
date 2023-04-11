const mongoose = require('../db/mongoose');

const express = require('express');
const Activity = require('./models/activities');
const bodyParser = require('body-parser');
const cors = require('cors');



const app = express();

//parse the incoming json requests
app.use(bodyParser.json());
app.use(cors());

// create activity 
app.post('/activities', (req, res) =>{

    Activity.create(req.body).then((activity) =>{
        res.status(201).send(activity);
    }).catch((error) => {
        res.status(400).send(error);
    })
})

// get all activities
app.get('/activities', (req, res) =>{
    Activity.find({}).then((activities) =>{
        res.send(activities);
    }).catch((error) => {
        res.status(500).send(error);
    })
})


app.listen(3000, (req, res) =>
  console.log('Example app listening on port 3000!'),

);


