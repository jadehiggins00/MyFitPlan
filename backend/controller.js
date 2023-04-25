const mongoose = require('../db/mongoose');
//to use object id when passing the id from a function in model class and to its type from string to objectId

const express = require('express');
const {Goals} = require('./models/goalsModel');
const bodyParser = require('body-parser');
const cors = require('cors');



const app = express();

//parse the incoming json requests
app.use(bodyParser.json());
app.use(cors());





app.post('/goalsmodel', (req, res) => {
  const { userName, goal_text, goal_date, goal_status  } = req.body;

  // create a new activity record
  const newGoal = new Goals({userName, goal_text, goal_date, goal_status});

  // save the new activity to the database
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

//insert a record for goal
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


//get all records of goals
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

//delete using id
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





app.listen(3003, (req, res) =>
  console.log('Example app listening on port 3003!'),

);


