<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <?php include("html/header.html"); ?>
</head>

<body class="pre-loder">
    <div id="ip-container" class="ip-container">
        <!-- initial header -->
        <header class="ip-header">
            <?php include('html/body.header.html'); ?>
        </header>

        <!-- main content -->
        <div class="ip-main">
            <?php include('html/body.main.html'); ?>
            
            <!-- Pre Order Modal -->
            <?php include('html/modal-pre-order.html'); ?>

            <!-- Cart DIV -->
            <?php include('html/modal-cart.html'); ?>

            <!-- Footer -->
            <?php include('html/footer.html'); ?>

            <!-- Contact us modal -->
            <?php include('html/contact-desktop.html'); ?>
            <?php include('html/contact-mobile.html'); ?>
            
            <!-- Scripts section -->
            <?php include('html/scripts.html'); ?>
        </div>
    </div><!-- /container -->
</body>

</html>
