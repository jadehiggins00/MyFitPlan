const mongoose = require('mongoose');

// activities table
const activitySchema =  new mongoose.Schema({
    name: String
});

// days table
const daySchema = new mongoose.Schema({
    name: String,
    activities: [activitySchema],
});

// weeks table
const weekSchema = new mongoose.Schema({
    days: [daySchema]
});



//creating the model
const Activity = mongoose.model('Activity', activitySchema);
const Day = mongoose.model('Day', daySchema);
const Week = mongoose.model('Week', weekSchema);

module.exports = {Activity,Day, Week};