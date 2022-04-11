<?php
/*checkout.php
This page handles the user's checkout process at the highest-level,
if that user has come here from his or her shopping cart, and
otherwise the user is redirected to a view of the current status
of the user's shopping cart.
*/
session_start();
if (!preg_match('/shoppingCart.php/', $_SERVER['HTTP_REFERER']))
    header("Location: shoppingCart.php?productID=view");
$customerID = $_SESSION['customer_id'];
include("../common/document_head.html");
?>
  <body>
    <header>
      <?php
      include("../common/banner.php");
      include("../common/menus.html");
      include("../scripts/connectToDatabase.php");
      ?>
    </header>
    <main>
      <article class="Receipt">
        <?php
        include("../scripts/checkoutProcess.php");
        ?>
      </article>
    </main>
    <footer>
      <?php
      include("../common/footer_content.html");
      ?>
    </footer>
  </body>
</html>
