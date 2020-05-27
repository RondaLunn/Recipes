<?php
    $file = '../../api.config';
    $file_lines = file($file);
    
    $apiKey = trim($file_lines[0]);
    $authDomain = trim($file_lines[1]);
    $databaseURL = trim($file_lines[2]);
    $projectId = trim($file_lines[3]);
    $storageBucket = trim($file_lines[4]);
    $messagingSenderId = trim($file_lines[5]);
    $appId = trim($file_lines[6]);
    $measurementId = trim($file_lines[7]);

    echo "{ ${apiKey}, ${authDomain}, ${databaseURL}, ${projectId}, ${storageBucket}, ${messagingSenderId}, ${appId}, ${measurementId} }";
?>