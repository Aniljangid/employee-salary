<?php
$admin_password = $_POST['admin_password']; //fethes the password from JS through Ajax call
// echo "password is: " . $admin_password;
$servername = "127.0.0.1"; //localhost
$username = "root";
$password = "";
$dbname = "empsalmgt";

$conn = new mysqli($servername, $username, $password, $dbname); //conects to Database

if (!$conn){                                                   // checks if the database is conected or Not
  die("connection failed " . mysql_error());
} else {
  // echo "connected";
}

$check = "SELECT * FROM admin WHERE admin_password like '$admin_password'"; //search the inputed password in Database
$result = $conn->query($check); //executes the check query

if ($result->num_rows > 0){  //num_rows returns the number of rows
  $flag = 1;                 // flag is set to 1 if the password is correct
  // echo "<br> logged in";
} else {
  // echo "<br> wrong password";
  $flag = 0;                // flag is set to 0 if password is incorrect
}


echo json_encode($flag) // sends the result(flag) back to JS
 ?>
