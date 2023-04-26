const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  food: { type: String, required: true },
  notes: String,
  meals: [String],
  photo: String,
  dateTime: String,
  dayTime: String,

});

module.exports = mongoose.model('Food', foodSchema);