<?php
if($_POST){
    require 'mailer/Mandrill.php';

    try {
        $mandrill = new Mandrill('5O8bMd9RhEd7hrcSNqFfFg');
        $message = array(
            'html' => $_POST['message'],
            'subject' => 'New message from GetBandits.com visitor',
            'from_email' => $_POST['email'],
            'from_name' => $_POST['name'],
            'to' => array(
                array(
                    'email' => 'bayu@colorblindlabs.com',
                    'name' => 'Bandits Team',
                    'type' => 'to'
                )
            ),
            'headers' => array('Reply-To' => $_POST['email']),
            'bcc_address' => 'admin@getbandits.com',
            'tracking_domain' => 'www.getbandits.com',
            'signing_domain' => 'www.getbandits.com',
            'return_path_domain' => 'www.getbandits.com'
        );
        $async = false;
        $result = $mandrill->messages->send($message, $async);
        print_r($result);

    } catch(Mandrill_Error $e) {
        // Mandrill errors are thrown as exceptions
        echo 'A mandrill error occurred: ' . get_class($e) . ' - ' . $e->getMessage();
        // A mandrill error occurred: Mandrill_Unknown_Subaccount - No subaccount exists with the id 'customer-123'
        throw $e;
    }
}
?>