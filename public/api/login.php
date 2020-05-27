<?php
if(count($_POST)>0) {
    $file = '../../.env';
    $file_lines = file($file);
    $host_name = trim($file_lines[0]);
    $database = trim($file_lines[1]);
    $user_name = trim($file_lines[2]);
    $password = trim($file_lines[3]);
    
    $connect = mysqli_connect($host_name, $user_name, $password, $database);
    $method = $_SERVER['REQUEST_METHOD'];
    $request = explode('/', trim($_SERVER['PATH_INFO'], '/'));

    if (mysqli_connect_errno()) {
        die('<p>Failed to connect to MySQL: '.mysqli_connect_error().'</p>');
      } else {
        $username = $_POST['username'];
        $password = $_POST['password'];
        $sql = "select password from users where username='$username'";
        $result = mysqli_query($connect, $sql);
        $row = $result->fetch_assoc();
        $hash = $row['password'];
        if (password_verify($password, $hash)) {
            echo ("Authenticated");
            setcookie("loggedin", "true", time() + (30*24*60*60*1000));
        } else {
            echo ("Invalid username or password!");
    }
}
$connect->close();
}
?>