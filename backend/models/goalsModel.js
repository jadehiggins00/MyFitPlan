const mongoose = require('mongoose');

// activities table
const goalsSchema =  new mongoose.Schema({
    userName: String,
    goal_text: String,
    goal_date: String,
    goal_status: String,
});


//creating the model
const Goals = mongoose.model('goals', goalsSchema);


module.exports = {Goals};