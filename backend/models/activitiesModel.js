const mongoose = require('mongoose');

// activities table
const activitiesSchema =  new mongoose.Schema({
    userName: String,
    dayOfWeek:  String,
    date: String,
    activity: String,
    activityStatus: Number,


});

//creating the model
const Activities = mongoose.model('Activities', activitiesSchema);


module.exports = {Activities};