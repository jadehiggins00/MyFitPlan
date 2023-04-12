const mongoose = require('mongoose');

// activities table
const activitySchema =  new mongoose.Schema({
    name: String
});

// days table
const daySchema = new mongoose.Schema({
    dayId: { type: mongoose.Schema.Types.ObjectId},
    name: String,
    activities: [activitySchema],
});

// weeks table
const weekSchema = new mongoose.Schema({
    weekId: { type: mongoose.Schema.Types.ObjectId},
    days: [daySchema]
});



//creating the model
const Activity = mongoose.model('Activity', activitySchema);
const Day = mongoose.model('Day', daySchema);
const Week = mongoose.model('Week', weekSchema);

module.exports = {Activity,Day, Week};