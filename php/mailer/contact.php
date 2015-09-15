<?php
if($_POST){

    $to = "manish@colorblindlabs.com";

    $full_name = $_POST['name'];
    $email_from = $_POST['email'];
    $from_mail = $full_name.'<'.$email_from.'>';

    $subject = "Email from GetBandits.com visitor";
    $message = "";
    $message = $_POST['message'];

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