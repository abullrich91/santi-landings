<?php
header('Content-Type: application/json');

$aResult = array();

$to = $_POST['to'];
$subject = $_POST['subject'];
$message = $_POST['message'];
$from = "no-reply@cloudbackup.all-kom.com";
$headers = "From:" . $from;
mail($to,$subject,$message,$headers);

echo json_encode($aResult['result'] = 1);
?>