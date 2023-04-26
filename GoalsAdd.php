<?php
	session_start();
?>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Add a goal</title>
  <link rel="stylesheet" href="General.css" media="screen">
  <link rel="stylesheet" href="GoalsAdd.css" media="screen">
  <link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
/>
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
	<?php
		$servername = "localhost";
		$username ="root";
		$password="";
		$dbname = "MyFitPlan";

		//create connection
		$conn = new mysqli($servername,$username,$password,$dbname);
		//check connection
		if($conn->connect_error) {
			die("Connection Failed: " . $conn->connect_error);
		}
		
		//$_SESSION["UserName"] = "testname";
		
		//Inserts new row into the reserve_table (ISBN, UserName and Date) 
		if ( isset($_POST['selectedDate']) && isset($_POST['goaltext']) ) {
			$uid = $_SESSION["UserName"];
			$t = $_POST['goaltext'];
			$d = $_POST['selectedDate'];
			$s = 0;
			$sql = "INSERT INTO goals (userName, goal_text, goal_date, goal_status) VALUES ('$uid','$t' ,'$d', '$s')";
			if ($conn->query($sql) === TRUE) {
				header("Location: Goals.php");
			}
			else {
				echo "Error: " . $sql . "<br>" . $conn->error;
			}
		}
		$conn->close();
		?>
    <form method="post" autocomplete="off">
      <p class="instructions1">1. Pick a day to set a goal</p>
      <div class="holder">
        <div class="calendar">
          <div class="month">
            <i class="fas fa-angle-left prev"></i>
            <div class="date">
              <h1></h1> 
              <p></p>
            </div>
            <i class="fas fa-angle-right next"></i>
          </div>
          <div class="weekdays">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div class="days"></div>
          <input type="hidden" name="selectedDate" id="selectedDate" required>
        </div>
      </div>

      <p class="instructions">2. What is your goal</p>
      <input type="text" id="gtext" name="goaltext" placeholder="" required>
      
      <div class="BottomGoalsAddButtons">
        <a href="Goals.php" class="back">&larr; Back</a>
        <button type="submit" class="confirm">&check; Confirm</button>
      </div>
    </form>
    
 
  <script src="GoalsCalander.js" ></script>
</body>

</html>