
<!-- john2 -->
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Activities</title>
  <link rel="stylesheet" href="General.css" media="screen">
  <link rel="stylesheet" href="Goals.css" media="screen">
</head>

<body class="" data-lang="en">
  <header>
    <div  class="Header">
      <a href="Home.html" ><img src="images/Home.png" class="HomeButton" alt=""></a>
      <p class="HeaderText">Goals</p>
      <a href="Profile.html" ><img src="images/Profile.png" class="ProfileIcon" alt=""></a>
    </div>
  </header>

  <main>
  <!--  -->
    <section class="container">
	<?php
		// Establish database connection
		$servername = "localhost";
		$username ="root";
		$password="";
		$dbname = "MyFitPlan";

		$conn = new mysqli($servername, $username, $password, $dbname);

		// Check connection
		if ($conn->connect_error) {
		  die("Connection failed: " . $conn->connect_error);
		}
		
		$_SESSION["UserName"] = "testname";
			
		// Retrieve goals data for a specific user, sorted by date
		$uid = $_SESSION["UserName"]; // replace with the user's ID
		$sql = "SELECT * FROM goals WHERE userName = '$uid' ORDER BY STR_TO_DATE(goal_date, '%d %M %Y')";
		$result = $conn->query($sql);
		//echo $uid;
		// Display the goals in HTML format
		if ($result->num_rows > 0) {
		  $current_date = "";
		  while($row = $result->fetch_assoc()) {
			 //for every new date close the previous date div tag
			if($current_date != $row["goal_date"]) {
			  // Start a new GoalsList for a new date
			  if($current_date != "") {
				// Close the previous GoalsList
				echo '</div>';
			  }
			  // Start a new GoalsList for the current date
			  echo '<div class="GoalsList">';
			  echo '<h2 class="CenterText">For '.$row["goal_date"].'</h2>';
			  $current_date = $row["goal_date"];
			}
			
			// Add a button element for each goal
			//echo '<button class="goals" data-goal-id="'.$row["taskID"].'" >';
			/*if($row["goal_status"] == "completed") {
			  echo ' disabled>Completed';
			} else {
			  echo '>Complete';
			}  */
			//echo ' '.$row["goal_text"].'</button>';
			echo '<button class="goals" data-GoalStatus="'.$row["goal_status"].'" data-GoalId="'.$row["taskID"].'"';
			if($row["goal_status"] == "1") { // if goal is completed
			  echo '>Completed &check;';
			} else {
			  echo '>To Be Complete';
			}
			echo ': '.$row["goal_text"].'</button>';
		  }
		  // Close the last GoalsList
		  echo '</div>';
		} else {
		  echo "No goals found for this user.";
		}
		
		// Update the goal status when a button is clicked
		/*if(isset($_POST['goal_id'])) {
		  $goal_id = $_POST['goal_id'];
		  $sql = "UPDATE goals SET goal_status='1' WHERE taskID=$goal_id";
		  if ($conn->query($sql) === TRUE) {
			echo "Goal updated successfully";
		  } else {
			echo "Error updating goal: " . $conn->error;
		  }
		  exit(); // stop processing the rest of the code
		}*/
		
		// Close database connection
		$conn->close();
	?>

	<!--  
      <div class="GoalsList">
        <h2 class="CenterText">For Sunday, 19 March 2023</h2>
        <button class="goals">Run 10 km in Total</button>
        <button class="goals">Swim for 1 hour</button>
        <button class="goals">Swim for 1 hour</button>
        <button class="goals">Walk 20 km in Total</button>

      </div>  -->

	<!--
      <div class="GoalsList">
        <h2 class="CenterText">For Sunday, 26 March 2023</h2>
        <button class="goals">Go to Yoga</button>
        <button class="goals">Play Football</button>

      </div> 

      <div class="GoalsList">
          <h2 class="CenterText">For Sunday, 2 April 2023</h2>
          <button class="goals">Play Basketball</button>
          <button class="goals">Walk 20 km in Total</button>
          <button class="goals">Walk 20 km in Total</button>

      </div>  
      
       <div class="GoalsList">
        <h2 class="CenterText">For Sunday, 23 March 2023</h2>
        <button class="goals">Run 10 km in Total</button>
        <button class="goals">Run 10 km in Total</button>
      </div> 
      
      -->

  
    </section>
	<!--<button id="test"> test</button>-->
    <section class="AddDelete">
      <a href="GoalsAdd.php" ><img src="images/addtext.png" class="AddButton"></a>
      <a href="Profile.html" ><img src="images/deletetext.png"class="DeleteButton"></a>
      <!-- <button class="circle-btn">
        <span class="plus-icon">+</span>
      </button> -->
      
    </section>
  
    <section class="BackHome">
      <a href="Home.html" class="BackHome">&larr; Back</a>
    </section>
  </main>
  
  <script src="Goals.js" ></script>
</body>

</html>