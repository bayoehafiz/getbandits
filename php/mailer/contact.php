<?php
if($_POST){
    require_once "../../vendor/autoload.php";

    //PHPMailer Object
    $mail = new PHPMailer;

    //From email address and name
    $mail->From = $_POST['email'];
    $mail->FromName = $_POST['name'];

    //To address and name
    //$mail->addAddress("recepient1@example.com", "Recepient Name");
    $mail->addAddress("admin@getbandits.com"); //Recipient name is optional

    //Address to which recipient will reply
    $mail->addReplyTo($_POST['email'], "Reply");

    //CC and BCC
    $mail->addCC("manish@colorblindlabs.com");
    $mail->addBCC("bayu@colorblindlabs.com");

    //Send HTML or Plain Text email
    $mail->isHTML(true);

    $mail->Subject = "New email from GetBandits.com visitor";
    $mail->Body = "<i>" . $_POST['message'] . "</i>";
    $mail->AltBody = "This is the plain text version of the email content";

    if(!$mail->send()) 
    {
        echo "Mailer Error: " . $mail->ErrorInfo;
    } 
    else 
    {
        echo "Message has been sent successfully";
    }
}
?>