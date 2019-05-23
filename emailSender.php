<?php
header('Content-Type: application/json');
$to = $_POST['to'];
$subject = $_POST['subject'];
$message = $_POST['message'];
$from = "no-reply@cloudbackup.all-kom.com";
$headers = "From:" . $from;
mail($to,$subject,$message,$headers);
echo "Mail enviado.";
?>