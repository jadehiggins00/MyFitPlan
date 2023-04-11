
const MongoClient = require('mongodb').MongoClient;
// document.addEventListener('DOMContentLoaded', () => {

    
//     // Rest of your code here
//     const confirmButton = document.querySelector('#insert-swim-btn');


//     confirmButton.addEventListener('click', async () => {
//         const client = new MongoClient(uri);
//         await client.connect();

//         try{
//             const result = await client.db('ActivitiesDB').collection(Activities).insertOne({
//                 DayOfWeek: 'Tuesday',
//                 Exercise: 'yoga'
//             });

//             console.log(`Inserted document with _id: ${result.insertedId}`);

//         }finally{
//             await client.close();
//         }





//     });

//   });
document.addEventListener('DOMContentLoaded', () => {
const insertDataButton = document.getElementById('insert-swim-btn');

insertDataButton.addEventListener('click', async () => {
    
  const uri = "mongodb+srv://dbJade:jade@fitplandb.uf2iwoo.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  await client.connect();

  try {
    const result = await client.db('ActivitiesDB').collection('Activities').insertOne({
      DayOfWeek: 'new',
      Exercise: 'new'
    });

    console.log(`Inserted document with _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
});
});



// async function main() {
// 	// we'll add code here soon

//     const uri = "mongodb+srv://dbJade:jade@fitplandb.uf2iwoo.mongodb.net/?retryWrites=true&w=majority";

//     // create an instance of mongoclient
//     const client = new MongoClient(uri);
//     // connecting to the cluster
// ;

//     try {
    
//         await client.connect();

//         // ready to interact with the database - listing the databses 
//         // await listDatabases(client);
    
//         //select a database
//         const db = client.db('ActivitiesDB');
    
//         //select a collection
//         const collection = db.collection('Activities')

//         //insert one doc
//         const result = await  collection.insertOne({DayOfWeek: 'Tuesday', Exercise: "Yoga"});
//         console.log('Data inserted successfully into MongoDB', result);

//     } catch (err) {
//         console.log('Error occurred while inserting data into MongoDB', err);
//       }

// }//end main

// //calling main function
// main().catch(console.error);


