// DOM is used to ensure that the correct DOM element is being accessed and has been loaded in the page before being accessed
document.addEventListener('DOMContentLoaded', () => {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let currentDay = 0; // 0 represents Monday in the daysOfWeek array
    updateDay();
    
    // adding event listeners to the navigation buttons to cycle through the days of the week
    const leftButton = document.querySelector('.btn.btn-primary.btn-custom.ml-5');
    const rightButton = document.querySelector('button.btn-custom.mr-5');
    const addButton = document.querySelector('.btn.btn-primary.btn-add.rounded-circle')
    const carousel = document.querySelector('.carousel.slide');

    leftButton.addEventListener('click', () => {
        currentDay = (currentDay === 0) ? 6 : currentDay - 1;
        console.log(currentDay);
        updateDay();
        
    });
    
    rightButton.addEventListener('click', () => {
        currentDay = (currentDay === 6) ? 0 : currentDay + 1;
        console.log(currentDay);
        updateDay();
    });

    // event listener to the add button to open the modal
    addButton.addEventListener("click", () => {
       window.location.href= 'AddActivity.html';
    });

    // jquery function to pause the carousel slider
    $(document).ready(function(){
        $('#demo').carousel('pause');
      });

    $(document).ready(function() {
        $('#leftbutton').click(function() {
          $('.carousel').carousel('prev');
        });
        
        $('#rightbutton').click(function() {
          $('.carousel').carousel('next');
        });
      });
   
    
    // function to update day of the week - fetching the data from the dayOfWeek array
    function updateDay() {
        const dayElement = document.querySelector('.h2-custom h2');
        dayElement.textContent = daysOfWeek[currentDay];
        
        //console.log(daysOfWeek);

           // Get the current date and set it to the selected day of the week
            // const currentDate = new Date();
            // currentDate.setDate(currentDate.getDate() + (currentDay + 7 - currentDate.getDay()) % 7);
            
            // // Set the datepicker to the selected day of the week
            // const datepicker = document.getElementById("datepicker");
            // datepicker.value = currentDate.toISOString().slice(0, 10);
    }

    

    // function to add tasks to the current day of the week
    function addTask() {

   



    }

    //event listener for the Add button - which calls the addTask()
    // const addTaskButton = document.querySelector('#addBtn');
    // addTaskButton.addEventListener('click', addTask);


});


