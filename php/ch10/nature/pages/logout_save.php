<?php
//logout.php
session_start();
if ($_SESSION["customer_id"] == "") $notLoggedIn = true;
session_unset();
session_destroy();
include("../common/document_head.html");
?>
  <body>
    <header>
      <?php
      include("../common/banner.php");
      include("../common/menus.html");
      ?>
    </header>
    <main>
      <article class="Logout">
        <h4>Logout</h4>
        
        <?php if ($notLoggedIn) { ?>
        
        <p><br>Thank you for visiting Nature's Source.<br>
           You have not yet logged in.</p>
        <p>If you do wish to log in,
          <a href="pages/loginForm.php"
             class="NoDecoration">click here</a>.</p>
        <p>Or, just to browse our product catalog,
          <a href="pages/catalog.php"
             class="NoDecoration">click here</a>.</p>
             
        <?php } else { ?>
        
        <p><br>Thank you for visiting our e-store.<br>
           You have successfully logged out.</p>
        <p>If you wish to log back in,
          <a href="pages/loginForm.php"
             class="NoDecoration">click here</a>.</p>
        <p>To browse our product catalog, 
          <a href="pages/catalog.php"
             class="NoDecoration">click here</a>.</p>
             
        <?php } ?>
        
      </article>
    </main>
    <footer>
      <?php
      include("../common/footer_content.html");
      ?>
    </footer>
  </body>
</html>
