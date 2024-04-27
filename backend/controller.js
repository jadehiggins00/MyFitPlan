const mongoose = require('../db/mongoose');
//to use object id when passing the id from a function in model class and to its type from string to objectId

const express = require('express');
const {Activity, Day, Week} = require('./models/activities');
const {Activities} = require('./models/activitiesModel');
const Product = require('./models/products');
const {Goals} = require('./models/goalsModel');
const bodyParser = require('body-parser');
const cors = require('cors');



const app = express();

//parse the incoming json requests
app.use(bodyParser.json());
app.use(cors());


app.post('/products', (req, res) => {
  const productData = req.body;

  const product = new Product(productData);

  product.save()
      .then(savedProduct => {
          res.status(201).json({ message: "Product added successfully", data: savedProduct });
      })
      .catch(error => {
          console.error("Failed to save the product:", error);
          res.status(500).json({ error: "Internal server error", details: error.message });
      });
});



// ***************** GOALS **************************


//   get all records of goals 
app.get('/goalsmodel', (req, res) => {
  const { userName } = req.query;

  Goals.find({ userName }).sort({ goal_date: 1 })
    .then(goals => {
      res.status(200).json(goals);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
});


//  Post to database to create a new goal 
app.post('/goalsmodel', (req, res) => {
  const { userName, goal_text, goal_date, goal_status  } = req.body;

  // create a new goal record
  const newGoal = new Goals({userName, goal_text, goal_date, goal_status});

  // save the new goal to the database
  newGoal.save()
    .then(result => {
      console.log(result);
      res.status(200).json({ message: "Activity added successfully" });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
  // ...
});

//Update the goal status - if its completed or not
app.put('/goalsmodel/:userName/:taskId', (req, res) => {
  const { userName, taskId } = req.params;
  const { goalStatus } = req.body;


Goals.findOneAndUpdate({ userName, _id: taskId }, { goal_status: goalStatus }, { new: true })
    .then(result => {
      console.log(result);
      res.status(200).json({ message: "Goal updated successfully" });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

//delete goal using id
app.delete('/goalsmodel/:goalId', (req, res) => {
  const { goalId } = req.params;

  Goals.findByIdAndDelete(goalId)
    .then(result => {
      if (result) {
        console.log(`Goal with ID ${goalId} has been deleted.`);
        res.status(200).json({ message: "Goal deleted successfully" });
      } else {
        console.log(`No goal found with ID ${goalId}.`);
        res.status(404).json({ error: "Goal not found" });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
});


// *********************** ACTIVITIES **********************************



// get all activities corresponding to a date
app.get('/activitiesmodel', (req, res) =>{
  const currentDate = new Date().toISOString().slice(0, 10);
  Activities.find({ date: currentDate })
    .then((activities) => {
      res.send({ activities });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});



// function to update the actitivity status
app.put('/activitiesmodel/:id', (req, res) => {
  const id = req.params.id;
  const { activityStatus } = req.body;

  Activities.findById(id)
    .then(activity => {
      activity.activityStatus = activityStatus;
      return activity.save();
    })
    .then(() => {
      res.send('Activity updated successfully');
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
});


// get all activities
app.get('/activitiesmodels', (req, res) =>{

  // an array of promises to grab all the data.
  const promises = [];
  promises.push(Activity.find({}));


  // we use promise all to wait for all promises to resolve before sending the response
  Promise.all(promises)
  .then(([activities]) =>{
      res.send({activities});
  }).catch((error) => {
      res.status(500).send(error);
  })

 
});

// delete activity by id when the button is clicked
app.delete('/activitiesmodel/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedActivity = await Activities.deleteOne({ _id: id });
    res.status(200).json({ message: 'Activity deleted successfully', deletedActivity });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete activity from the database.' });
  }
});

// add a new activity 
app.post('/activitiesmodel', (req, res) => {
  const {dayOfWeek, date, activity, activityStatus } = req.body;

  // create a new activity record
  const newActivity = new Activities({dayOfWeek, date,
     activity, activityStatus});

  // save the new activity to the database
  newActivity.save()
    .then(result => {
      console.log(result);
      res.status(200).json({ message: "Activity added successfully" });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
  // ...
});




app.listen(3003, (req, res) =>
  console.log('Example app listening on port 3003!'),

);


