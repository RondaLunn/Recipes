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


if (mysqli_connect_errno()) {
    die('<p>Failed to connect to MySQL: '.mysqli_connect_error().'</p>');
  } else {
    switch ($method) {
        case 'GET':
          $uid = $_GET['uid'];
          $sql = "select * from users where uid = '$uid'";
          break;
        case 'POST':
          $uid = mysqli_real_escape_string($connect, $_POST['uid']);
          $name = mysqli_real_escape_string($connect, $_POST['name']);
          $recipes = mysqli_real_escape_string($connect, $_POST['recipes']);
          $favorites = mysqli_real_escape_string($connect, $_POST['favorites']);
          $update = $_POST['update'];
          if ($update == 1) {
            $sql = "update users set name = '$name', recipes = '$recipes', favorites = '$favorites' where uid = '$uid'";
          } else {
            $sql = "insert into users (uid, name, recipes, favorites) values ('$uid', '$name', '$recipes', '$favorites')";
          }
          break;
        case 'DELETE':
          $uid = $_GET['uid'];
          $sql = "delete from users where uid = '$uid'";
          break;
    }
    
    $result = mysqli_query($connect, $sql);

    if(!$result) {
        die(mysqli_error($connect));
      }
  
      if($method == 'GET') {
        if(!$id) echo '[';
        for ($i=0; $i<mysqli_num_rows($result); $i++){
          echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
        }
        if(!$id) echo ']';
      } elseif ($method == 'POST') {
          echo mysqli_affected_rows($connect);
      } else {
          echo mysqli_affected_rows($connect);
      }
  
      $connect->close();
    }
?>