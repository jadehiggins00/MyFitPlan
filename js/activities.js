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
        taskItem.textContent = taskInput.value;
        taskList.appendChild(taskItem);

        taskInput.value = '';

    }

    //event listener for the Add button - which calls the addTask()
    const addTaskButton = document.querySelector('#addTaskButton');
    addTaskButton.addEventListener('click', addTask);

});


