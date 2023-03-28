// DOM is used to ensure that the correct DOM element is being accessed and has been loaded in the page before being accessed
document.addEventListener('DOMContentLoaded', () => {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let currentDay = 0; // 0 represents Monday in the daysOfWeek array
    
    
    // adding event listeners to the navigation buttons to cycle through the days of the week
    const leftButton = document.querySelector('.btn.btn-primary.btn-custom.ml-5');
    const rightButton = document.querySelector('button.btn-custom.mr-5');
    
    leftButton.addEventListener('click', () => {
        currentDay = (currentDay === 0) ? 6 : currentDay - 1;
        updateDay();
    });
    
    rightButton.addEventListener('click', () => {
        currentDay = (currentDay === 6) ? 0 : currentDay + 1;
        updateDay();
    });
    
    // function to update day of the week - fetching the data from the dayOfWeek array
    function updateDay() {
        const dayElement = document.querySelector('.h2-custom h2');
        dayElement.textContent = daysOfWeek[currentDay];
    }

    // function to add tasks to the current day of the week
    function addTask() {

        const taskInput = document.querySelector('#taskInput')
        const taskList = document.querySelector('.task-list')

        const taskItem = document.createElement('li');
        taskItem.textContent = taskInput.ariaValueMax;
        taskList.appendChild(taskItem);

        taskInput.value = '';

    }

    //event listener for the Add button - which calls the addTask()
    const addTaskButton = document.querySelector('#addTaskButton');
    addTaskButton.addEventListener('click', addTask);

});


// // function to add tasks to the current day of the week
// function addTask() {

//     const taskInput = document.querySelector('#taskInput')
//     const taskList = document.querySelector('.task-list')

//     const taskItem = document.createElement('li');
//     taskItem.textContent = taskInput.ariaValueMax;
//     taskList.appendChild(taskItem);

//     taskInput.value = '';

// }

// //event listener for the Add button - which calls the addTask()
// const addTaskButton = document.querySelector('#addTaskButton');
// addTaskButton.addEventListener('click', addTask);

// Define an array of days of the week
// const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// // Get references to the navigation buttons and the header tag
// const leftButton = document.querySelector('button.btn-custom.ml-5');
// const rightButton = document.querySelector('button.btn-custom.mr-5');
// const header = document.querySelector('#day');

// // Set the initial day of the week to Monday
// let currentDayIndex = 1;
// header.textContent = daysOfWeek[currentDayIndex];

// // Add click event listeners to the navigation buttons
// leftButton.addEventListener('click', () => {
//   // Decrement the current day index
//   currentDayIndex--;
//   // If the index is less than zero, wrap around to the end of the array
//   if (currentDayIndex < 0) {
//     currentDayIndex = daysOfWeek.length - 1;
//   }
//   // Update the header with the new day of the week
//   header.textContent = daysOfWeek[currentDayIndex];
// });

// rightButton.addEventListener('click', () => {
//   // Increment the current day index
//   currentDayIndex++;
//   // If the index is greater than the length of the array, wrap around to the beginning
//   if (currentDayIndex >= daysOfWeek.length) {
//     currentDayIndex = 0;
//   }
//   // Update the header with the new day of the week
//   header.textContent = daysOfWeek[currentDayIndex];
// });
