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
                    'email' => 'manish@colorblindlabs.com',
                    'name' => 'Recipient Name',
                    'type' => 'to'
                )
            ),
            'headers' => array('Reply-To' => $_POST['email']),
            'important' => false,
            'track_opens' => null,
            'track_clicks' => null,
            'auto_text' => null,
            'auto_html' => null,
            'inline_css' => null,
            'url_strip_qs' => null,
            'preserve_recipients' => null,
            'view_content_link' => null,
            'bcc_address' => 'admin@getbandits.com',
            'tracking_domain' => null,
            'signing_domain' => null,
            'return_path_domain' => null
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