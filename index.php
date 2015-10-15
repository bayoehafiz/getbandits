<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <?php include "html/header.html";?>
</head>

<body>
    <!-- Google property -->
    <?php include_once "google_tagmanager.php";?>
    <?php include_once "google_analyticstracking.php";?>

    <!-- Body section -->
    <?php include 'html/body.html';?>
    <!-- EOF Body section -->

    <!-- Pre Order Modal -->
    <?php include 'html/modal-order.html';?>
    <!-- EOF Pre Order Modal -->

    <!-- Cart DIV -->
    <?php include 'html/modal-cart.html';?>
    <!-- EOF Cart DIV -->

    <!-- Checkout DIV -->
    <?php include 'html/modal-checkout.html';?>
    <!-- EOF Checkout DIV -->

    <!-- Footer -->
    <?php include 'html/footer.html';?>
    <!-- EOF Footer -->

    <!-- Contact us modal -->
    <?php include 'html/contact-desktop.html';?>
    <?php include 'html/contact-mobile.html';?>
    <!-- EOF Contact us modal -->

    <!-- Scripts section -->
    <?php include 'html/scripts.html';?>
    <!-- EOF Scripts section -->
</body>

</html>
