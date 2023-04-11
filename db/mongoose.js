const mongoose = require('mongoose');




mongoose.connect("mongodb+srv://dbJade:jade@fitplandb.uf2iwoo.mongodb.net/?retryWrites=true&w=majority");


mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB Atlas');
  });
  
  mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB Atlas: ', err);
  });