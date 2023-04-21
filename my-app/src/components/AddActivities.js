import React, {useState}from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

function AddActivities() {

    const [selectedActivity, setSelectedActivity] = useState('');

    const handleActivityClick = (activity) => {
        setSelectedActivity(activity);
      };


    // function to send POST request to server with current date
    const postCurrentDate = () => {

        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    axios.post('http://localhost:3003/activitiesmodel', {
    //   date: getCurrentDate(currentDayIndex)
    date: currentDate,
    activity: selectedActivity
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }



    return (
        <div>
            <h1>Add Activities</h1>

    <div>
        <button onClick={() => handleActivityClick('yoga')}>Yoga</button>
        <button onClick={() => handleActivityClick('walking')}>Walking</button>
        <button onClick={() => handleActivityClick('running')}>Running</button>
        <button onClick={() => handleActivityClick('golf')}>Golf</button>
    </div>
            <div>
      {/* ... */}
      <button onClick={postCurrentDate} disabled={!selectedActivity}>Post Current Date</button>
    </div>
        </div>
    );
}

export default AddActivities