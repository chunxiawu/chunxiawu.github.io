<?php
/*catalog.php
This page displays all product categories, and to
do so it includes and runs the following scripts:
connectToDatabase.php
displayListOfCategories.php
*/
session_start();
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
      <article class="CategoryList">
        <h4 class="ProductHeader">Complete List of
          Product Categories</h4>
        <?php
        include("../scripts/displayListOfCategories.php");
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
