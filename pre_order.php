<?php
if($_POST){
    require 'mailer/Mandrill.php';

    $totWhite = intval($_POST['white']) * 22;
    $totBlack = intval($_POST['black']) * 22;

    try {
        $mandrill = new Mandrill('5O8bMd9RhEd7hrcSNqFfFg');
        $template_name = 'get-bandits-po';
        $template_content = array(
            array(
                'name' => 'name',
                'content' => $_POST['name']
            ),
            array(
                'name' => 'email',
                'content' => $_POST['email']
            ),
            array(
                'name' => 'city',
                'content' => $_POST['city']
            ),
            array(
                'name' => 'white',
                'content' => $_POST['white']
            ),
            array(
                'name' => 'black',
                'content' => $_POST['black']
            ),
            array(
                'name' => 'white-total',
                'content' => $totWhite
            ),
            array(
                'name' => 'black-total',
                'content' => $totBlack
            ),
            array(
                'name' => 'date',
                'content' => date("Y-m-d H:i:s")
            )
        );
        $message = array(
            'subject' => 'Thank you for your pre-order',
            'from_email' => 'contact@getbandits.com',
            'from_name' => 'Bandits Team',
            'to' => array(
                array(
                    'email' => $_POST['email'],
                    'name' => $_POST['name'],
                    'type' => 'to'
                )
            ),
            'headers' => array('Reply-To' => 'contact@getbandits.com'),
            'bcc_address' => 'bayu@colorblindlabs.com',
            'tracking_domain' => null,
            'signing_domain' => null,
            'return_path_domain' => null
        );
        $async = false;
        $result = $mandrill->messages->sendTemplate($template_name, $template_content, $message, $async);
        print_r($result);

    } catch(Mandrill_Error $e) {
        // Mandrill errors are thrown as exceptions
        echo 'A mandrill error occurred: ' . get_class($e) . ' - ' . $e->getMessage();
        // A mandrill error occurred: Mandrill_Unknown_Subaccount - No subaccount exists with the id 'customer-123'
        throw $e;
    }
}
?>