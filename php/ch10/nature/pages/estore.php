<?php
/*estore.php
This is our "front page" of e-store options ... the visitor
can simply browser our product line, or register for our
site and then proceed to make purchases (or at least to
simulate making purchases).
*/
session_start();
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
      <article class="Estore">
        <h3>Welcome to our e-store ...</h3>
        <p><strong>Thank you for visiting us for all your health
          needs.</strong><br>We carry a large collection of products
          for a naturally healthy lifestyle.<br>For your shopping and
          browsing convenience, please choose one of the following
          links:</p>
        <ul>
          <li>
            Just want to see what we have to offer?<br>To browse our
            exciting product catalog <a class="NoDecoration"
            href="pages/catalog.php">click here</a>.
          </li>
          <li>
            Ready to purchase and already have a username and
            password?<br>To log in to our e-store and begin shopping
            <a class="NoDecoration" href="pages/loginForm.php">click
            here</a> (if not logged in already).
          </li>
          <li>
            Need to register for our e-store so you can make
            purchases?<br>To register (you only need to do it once)
            <a class="NoDecoration"
               href="pages/registrationForm.php">click here</a>.
          </li>
          <li>
            Trying to log in as a different user?<br>
            You must first <a class="NoDecoration" 
            href="pages/logout.php">click here to log out</a>.
          </li>
        </ul>
      </article>
    </main>
    <footer>
      <?php
      include("../common/footer_content.html");
      ?>
    </footer>
  </body>
</html>
