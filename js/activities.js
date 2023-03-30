// DOM is used to ensure that the correct DOM element is being accessed and has been loaded in the page before being accessed
document.addEventListener('DOMContentLoaded', () => {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let currentDay = 0; // 0 represents Monday in the daysOfWeek array
    
    
    // adding event listeners to the navigation buttons to cycle through the days of the week
    const leftButton = document.querySelector('.btn.btn-primary.btn-custom.ml-5');
    const rightButton = document.querySelector('button.btn-custom.mr-5');
    const addButton = document.querySelector('.btn.btn-primary.btn-add.rounded-circle')
    const carousel = document.querySelector('.carousel.slide');

    leftButton.addEventListener('click', () => {
        currentDay = (currentDay === 0) ? 6 : currentDay - 1;
       
        updateDay();
        
    });
    
    rightButton.addEventListener('click', () => {
        currentDay = (currentDay === 6) ? 0 : currentDay + 1;

        updateDay();
    });

    // event listener to the add button to open the modal
    addButton.addEventListener("click", () => {
       window.location.href= 'AddActivity.html';
    });

 
   
    
    // function to update day of the week - fetching the data from the dayOfWeek array
    function updateDay() {
        const dayElement = document.querySelector('.h2-custom h2');
        dayElement.textContent = daysOfWeek[currentDay];


    }

    

    // function to add tasks to the current day of the week
    function addTask() {

        // const taskInput = document.querySelector('#taskInput')
        // const taskList = document.querySelector('.task-list')

        // const taskItem = document.createElement('li');
        // taskItem.textContent = taskInput.value;
        // taskList.appendChild(taskItem);

        // taskInput.value = '';
        // Get the modal
        // var modal = document.getElementById("myModal");

   

        // // Get the <span> element that closes the modal
        // var span = document.getElementsByClassName("close")[0];

        // //displaying the modal
        // modal.style.display = "block";

        // // When the user clicks on <span> (x), close the modal
        // span.onclick = function() {
        //     modal.style.display = "none";
        // }



    }

    //event listener for the Add button - which calls the addTask()
    // const addTaskButton = document.querySelector('#addBtn');
    // addTaskButton.addEventListener('click', addTask);


});


