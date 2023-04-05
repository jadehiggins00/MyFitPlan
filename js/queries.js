import { MongoClient } from '/index';
document.addEventListener('DOMContentLoaded', () => {

    
    // Rest of your code here
    const confirmButton = document.querySelector('#insert-swim-btn');


    confirmButton.addEventListener('click', async () => {
        const client = new MongoClient(uri);
        await client.connect();

        try{
            const result = await client.db('ActivitiesDB').collection(Activities).insertOne({
                DayOfWeek: 'Tuesday',
                Exercise: 'yoga'
            });

            console.log(`Inserted document with _id: ${result.insertedId}`);

        }finally{
            await client.close();
        }





    });

  });


