<?php
$file = '../../.env';
$file_lines = file($file);
$host_name = trim($file_lines[0]);
$database = trim($file_lines[1]);
$user_name = trim($file_lines[2]);
$password = trim($file_lines[3]);

$connect = mysqli_connect($host_name, $user_name, $password, $database);
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'], '/'));

if($method == 'GET') {
    if (mysqli_connect_errno()) {
        die('<p>Failed to connect to MySQL: '.mysqli_connect_error().'</p>');
    } else {
        $sql = "select * from users";
        
        $result = mysqli_query($connect, $sql);

        if(!$result) {
            die(mysqli_error($connect));
        }

        if(!$id) echo '[';
        for ($i=0; $i<mysqli_num_rows($result); $i++){
            echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
        }
        if(!$id) echo ']';
    }
    $connect->close();
}
?>