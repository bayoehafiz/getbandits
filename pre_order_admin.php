<?php
if($_POST){
    require 'mailer/Mandrill.php';

    $totWhite = intval($_POST['white']) * 22;
    $totBlack = intval($_POST['black']) * 22;
    $totPrice = $totWhite + $totBlack;

    try {
        $mandrill = new Mandrill('5O8bMd9RhEd7hrcSNqFfFg');
        $message = array(
            'html' => '<div style="font-size:1.5em;">New preorder from ' . $_POST['name'] . ' (' . $_POST['email'] . ') at ' . date("Y-m-d H:i:s") . '<br/><br/>Pure White: ' . $_POST['white']. ' item(s)<br/>Solid Black: ' . $_POST['black'] . ' item(s)<br/>Total paid: $' . $totPrice . '</div>',
            'subject' => 'New Bandits Pre-order',
            'from_email' => 'Mailer@getbandits.com',
            'from_name' => 'Bandits Automatic Mailer',
            'to' => array(
                array(
                    'email' => 'hey@getbandits.com',
                    'name' => 'Bandits Support',
                    'type' => 'to'
                )
            ),
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