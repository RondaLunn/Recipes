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
        $name = $_POST['name'];
        $password = $_POST['password'];
        $recipes = '';
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $sql = "insert into users (username, name, password, recipes) values ('$username', '$name', '$hash', '$recipes')";
        $result = mysqli_query($connect, $sql);
    
        if(!$result) {
            echo("Error Registering");
        } else {
            echo ("Success");
        }
}
$connect->close();

}
?>