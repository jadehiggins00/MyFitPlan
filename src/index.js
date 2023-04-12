const mongoose = require('../db/mongoose');

const express = require('express');
//const Activity = require('./models/activities');
const {Activity, Day, Week} = require('./models/activities');
const bodyParser = require('body-parser');
const cors = require('cors');



const app = express();

//parse the incoming json requests
app.use(bodyParser.json());
app.use(cors());


  


// request to add data into the database
app.post('/activities', (req, res) =>{

    const { days }  = req.body;
    console.log(days);
    
    const weekDays = days.map(day => {
        const activities = day.activities.map(activity => new Activity({name: activity.name}));
        console.log(activities);
        const newDay = new Day({ name: day.name, activities });
        return newDay;

    });
    const week = new Week({ days: weekDays});

    week.save()
    .then(week => console.log('Saved week:', week))
    .catch(error => console.error('Error saving week:', error));

});



// get all activities
app.get('/activities', (req, res) =>{
    const promises = [];
    promises.push(Activity.find({}));
    promises.push(Day.find({}));
    promises.push(Week.find({}));

    Promise.all(promises)
    .then(([activities, days, weeks]) =>{
        res.send({activities, days, weeks});
    }).catch((error) => {
        res.status(500).send(error);
    })

   
});


app.listen(3003, (req, res) =>
  console.log('Example app listening on port 3003!'),

);


