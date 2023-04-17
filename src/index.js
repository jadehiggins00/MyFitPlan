const mongoose = require('../db/mongoose');

const express = require('express');
const {Activity, Day, Week} = require('./models/activities');
const bodyParser = require('body-parser');
const cors = require('cors');



const app = express();

//parse the incoming json requests
app.use(bodyParser.json());
app.use(cors());



// request to add data into the database
// app.post('/activities', (req, res) =>{

//     const { days }  = req.body;
//     console.log(days);
    
//     // Create and save activities
//     const activities = days.reduce((acc, day) => {
//     const newActivities = day.activities.map(activity => new Activity({ name: activity.name }));
//     return acc.concat(newActivities);
//     }, []);

//     Activity.insertMany(activities)
//     .then(activities => console.log('Saved activities:', activities))
//     .catch(error => console.error('Error saving activities:', error));

//     const weekDays = days.map(day => {
//         const activities = day.activities.map(activity => new Activity({name: activity.name}));
//         console.log(activities);
//         const newDay = new Day({ id: day.dayId,  name: day.name, activities });
//         return newDay;

//     });

//     Day.insertMany(weekDays)
//     .then(weekDays => console.log('Saved days:', weekDays))
//     .catch(error => console.error('Error saving days:', error));


//     const week = new Week({ days: weekDays});

//     week.save()
//     .then(week => console.log('Saved week:', week))
//     .catch(error => console.error('Error saving week:', error));

// });

// request to add data into the database
// app.post('/activities', (req, res) =>{

//     const { days }  = req.body;
//     console.log(days);
    
//     // Create and save activities
//     const activities = days.reduce((acc, day) => {
//     const newActivities = day.activities.map(activity => new Activity({ name: activity.name }));
//     return acc.concat(newActivities);
//     }, []);

//     Activity.insertMany(activities)
//     .then(activities => console.log('Saved activities:', activities))
//     .catch(error => console.error('Error saving activities:', error));

//     const weekDays = days.map(day => {
//         const activities = day.activities.map(activity => new Activity({name: activity.name}));
//         console.log(activities);
//         const newDay = new Day({ id: day.dayId,  name: day.name, activities });
//         return newDay;

//     });

//     Day.insertMany(weekDays)
//     .then(weekDays => console.log('Saved days:', weekDays))
//     .catch(error => console.error('Error saving days:', error));


//     const week = new Week({ days: weekDays});

//     week.save()
//     .then(week => console.log('Saved week:', week))
//     .catch(error => console.error('Error saving week:', error));

// });

// // post request to only insert an activty into a specific day:
app.post('/activities', (req, res) =>{
    const { dayName, activityName } = req.body;

    // define the new activity
    const newActivity = new Activity({ name: activityName });
  
    // update the specified day of the week
    Week.updateOne({ "days.name": dayName }, { $push: { "days.$.activities": newActivity }})
      .then(result => {
        console.log(result);
        res.status(200).json({ message: "Activity added successfully" });
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      });
    

});





// get all activities
app.get('/activities', (req, res) =>{

    // an array of promises to grab all the data.
    const promises = [];
    promises.push(Activity.find({}));
    promises.push(Day.find({}));
    promises.push(Week.find({}));

    // we use promise all to wait for all promises to resolve before sending the response
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


