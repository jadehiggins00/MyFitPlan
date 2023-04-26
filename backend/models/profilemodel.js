const mongoose = require('mongoose');

// Profile Schema
const profileSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId, // Use the ObjectId type for referencing user ID
    userName: String,
    image: {
        data: Buffer,
        contentType: String,
    },
});

// Creating the models
const Profile = mongoose.model('Profile', profileSchema);

module.exports = {Profile};
