<?php
//sitemap.php
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
      <article id="siteMap">
        <h3>Site Map</h3>
        <ol>
          <li><a href="index.php">Home</a></li>
          <li>
            e-store
            <ul>
              <li><a href="pages/estore.php">e-store Options</a></li>
              <li><a href="pages/registrationForm.php">Register</a></li>
              <li><a href="pages/loginForm.php">Login</a></li>
              <li><a href="pages/shoppingCart.php">View Shopping
                Cart</a></li>
              <li><a href="pages/checkout.php">Checkout</a></li>
              <li><a href="pages/logout.php">Logout</a></li>
            </ul>
          </li>
          <li>
            Products+Services
            <ul>
              <li><a href="pages/catalog.php">Product Catalog</a></li>
              <li><a href="pages/featured.php">Featured Products</a></li>
              <li><a href="pages/services.php">Services</a></li>
              <li><a href="pages/suppliers.php">Suppliers</a></li>
            </ul>
          </li>
          <li>
            Your Health
            <ul>
              <li><a href="pages/bmiForm.php">Compute Your BMI</a></li>
              <li><a href="pages/tools.php">Tools+Resources</a></li>
              <li><a href="pages/expert.php">Ask An Expert</a></li>
              <li><a href="pages/links.php">Useful Links</a></li>
            </ul>
          </li>
          <li>
            About Us
            <ul>
              <li><a href="pages/about.php">Nature's Source</a></li>
              <li><a href="pages/vision.php">Vision+Mission</a></li>
              <li><a href="pages/employment.php">Job
              Opportunities</a></li>
              <li><a href="pages/news.php">News Archive</a></li>
            </ul>
          </li>
          <li>
            Contact Us
            <ul>
              <li><a href="pages/locations.php">Locations</a></li>
              <li><a href="pages/feedbackForm.php">Feedback Form</a></li>
            </ul>
          </li>
          <li><a href="pages/sitemap.php">Site Map</a></li>
        </ol>
      </article>
    </main>
    <footer>
      <?php
      include("../common/footer_content.html");
      ?>
    </footer>
  </body>
</html>
