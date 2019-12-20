<?php
  $emailTo = "general@staffmaritime.com";

  $subject = 'Feedback';
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: text/html; charset=utf8\r\n";

  $message = "Name: <b>" . $_POST['formName'] . "</b><br>";
  $message .= "Phone: <b>" . $_POST['formPhone'] . "</b><br>";
  $message .= "Email: <b>" . $_POST['formEmail'] . "</b><br>";
  $message .= "Comment: <b>" . $_POST['formComment'] . "</b><br>";
  $message .= "Policy: <b>" . $_POST['policy'] . "</b><br>";

  mail($emailTo, $subject, $message, $headers);

  echo '{"error_number":"1","error_message":"Спасибо, ваше сообщение отправлено!\n"}';
?>
