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
          $sql = "select * from recipes";
          break;
        case 'POST':
          $recipe_id = mysqli_real_escape_string($connect, $_POST['recipe_id']);
          $timestamp = $_POST['timestamp'];
          $author = mysqli_real_escape_string($connect, $_POST['author']);
          $uid = mysqli_real_escape_string($connect, $_POST['uid']);
          $title = mysqli_real_escape_string($connect, $_POST['title']);
          $category = mysqli_real_escape_string($connect, $_POST['category']);
          $prep_time = mysqli_real_escape_string($connect, $_POST['prep_time']);
          $cook_time = mysqli_real_escape_string($connect, $_POST['cook_time']);
          $servings = $_POST['servings'];
          $ingredients = mysqli_real_escape_string($connect, $_POST['ingredients']);
          $instructions = mysqli_real_escape_string($connect, $_POST['instructions']);
          $notes = mysqli_real_escape_string($connect, $_POST['notes']);
          $tags = mysqli_real_escape_string($connect, $_POST['tags']);
          $images = mysqli_real_escape_string($connect, $_POST['images']);
          $cookbooks = mysqli_real_escape_string($connect, $_POST['cookbooks']);
          $favorites = mysqli_real_escape_string($connect, $_POST['favorites']);
          $ratings = mysqli_real_escape_string($connect, $_POST['ratings']);
          $comments = mysqli_real_escape_string($connect, $_POST['comments']);
          $update = $_POST['update'];
          if ($update == 1) {
            $sql = "update recipes set timestamp = $timestamp, author = '$author', uid = '$uid', title = '$title', category = '$category', prep_time = '$prep_time', cook_time = '$cook_time', servings = $servings, ingredients = '$ingredients', instructions = '$instructions', notes = '$notes', tags = '$tags', images = '$images', cookbooks = '$cookbooks', favorites = '$favorites', ratings = '$ratings' , comments = '$comments' where recipe_id = '$recipe_id'";
          } else {
            $sql = "insert into recipes (recipe_id, timestamp, author, uid, title, category, prep_time, cook_time, servings, ingredients, instructions, notes, tags, images, cookbooks, favorites, ratings, comments) values ('$recipe_id', $timestamp, '$author', '$uid', '$title', '$category', '$prep_time', '$cook_time', $servings, '$ingredients', '$instructions', '$notes', '$tags', '$images', '$cookbooks', '$favorites', '$ratings', '$comments')";
          }
          break;
        case 'DELETE':
          $id = $_GET['id'];
          $sql = "delete from recipes where recipe_id = '$id'";
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