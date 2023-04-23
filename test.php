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
		
		
		if(isset($_POST['task_id']) && isset($_POST['goal_status'])) {
			$task_id = $_POST['task_id'];
			$goal_status = intval($_POST['goal_status']);
			$updated_status = $goal_status == 0 ? 1 : 0;
			$sql = "UPDATE goals SET goal_status=$updated_status WHERE taskID=$task_id";
			//if($gs == 0) {
				//$sql = "UPDATE goals SET goal_status=1 WHERE taskID=$task_id";
			//}
			//else {
			//	$sql = "UPDATE goals SET goal_status=0 WHERE taskID=$task_id";
			//}
			if ($conn->query($sql) === TRUE) {
			echo "Goal updated successfully";
			} else {
			echo "Error updating goal: " . $conn->error;
			}
			exit(); // stop processing the rest of the code
		}
		// Close database connection
		$conn->close();
	?>
	