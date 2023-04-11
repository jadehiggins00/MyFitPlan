const mongoose = require('mongoose');

const activitySchema =  new mongoose.Schema({
    DayOfWeek: String,
    Exercise: String
});

//creating the model
const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;