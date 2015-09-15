<?php
if($_POST){

    $to = "manish@colorblindlabs.com";

    $full_name = $_POST['name'];
    $email_from = $_POST['email'];
    $black = $_POST['black'];
    $white = $_POST['white'];
    $from_mail = $full_name.'<'.$email_from.'>';

    $subject = "New Bandits Pre Order";
    $message = "Below is new order from " . $full_name . "(" . $email_from . ")\r\nMade on " . date("Y-m-d H:i:s") . "\r\n";
    $message .= "Pure White: " . $white . " item(s)\r\n";
    $message .= "Solid Black: " . $black . " item(s)\r\n";

    $headers = "" .
               "Reply-To:" . $from_mail . "\r\n" .
               "X-Mailer: PHP/" . phpversion();
    $headers .= 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";   
    $headers .= 'From: ' . $from_mail . "\r\n";     

	//send email
    mail($to,$subject,$message,$headers);
}
?>