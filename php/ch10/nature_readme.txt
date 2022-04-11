ch10/nature_readme.txt

The version of our Nature's Source website in the nature
subdirectory of this chapter is the "grand finale" version
of the website we have been developing since the beginning
of the text.

In this final version we have all of the following:
- valid HTML 5 markup for page content structure and valid
  CSS 3 for page content styling and layout
- rotating images on the home page and dropdown menus on
  every page, both achieved with the help of JavaScript
- validation of form data entered by clients, using both
  HTML 5 form control validation and JavaScript validation
- server-side processing with PHP to
  -- display a welcome message that includes the date and
     time, updated every 60 seconds with the help of AJAX
  -- send the results from BMI-form and feedback-form
     submission to the client via e-mail
  -- archive feedback-form data on the server
- PHP mysqli_xx() function connections to a server-side MySQL
  database to register users and permit them to login, to
  retrieve product information for display and sale, thereby
  simulating the processing of online sales transactions
- several SQL scripts that can be used from the MySQL command
  line interface to monitor experimentation with registration
  and online shopping activity via the website's e-store

Full list of nature subdirectory contents:
-- index.php is our home page, located at the root level of
   the subdirectory
-- files also located at the root level of the subdirectory:
   get_me.sql - confirms a particular user's registration
   delete_me.sql - deletes a particular user's registration
   get_orders.sql - used to monitor orders and corresponding
   order items as a user "shops" online via the e-store
   delete_orders.sql - deletes a particular user's orders
   and order items, along with "orphaned" orders
   get_table_sizes.sql - shows the current table sizes of 
   all tables in the Nature's Source database
-- files in the images subdirectory:
   -- naturelogo.gif (the Nature's Source logo)
   -- outdoor1.jpg to outdoor6.jpg: outdoor exercise scenes to
      be displayed in rotation on our home page on weekend days
      (Friday, Saturday and Sunday)
   -- indoor1.jpg to indoor6.jpg: indoor exercise scenes to be
      displayed in rotation on our home page on weekdays (Monday
      to Thursday)
-- files in the images/products subdirectory:
   -- prod0.jpg to prod9.jpg: These are just "placeholder" images,
      which represent products that a user can view and/or purchase
      when browsing our e-store.
-- files in the common subdirectory:
   -- document_head.html (contains DOCTYPE declaration, opening html
      tag, and head element with links to all JavaScript script files)
   -- footer_content.html (contains just our copyright notice)
   -- banner.php (contains our logo image plus a Welcome message with
      current date and time)
   -- time.php (a simple server-side PHP script that provides the
      "refreshed" date and time for banner.php, via AJAX)
   -- menus.html (contains the markup for our dropdown menus)
-- files in the css subdirectory:
   -- desktop.css (contains the CSS styles for the desktop view of
      our website pages)
   -- estore.css (contains the additional CSS styles relevant to the
      website pages related to our e-store)
-- files in the data subdirectory:
   -- feedback.txt (contains archived feedback-form data submitted
      by site visitors)
-- static files in the pages subdirectory (carried over from previous
   versions of the website):
   -- about.php
   -- employment.php
   -- expert.php
   -- featured.php
   -- links.php
   -- locations.php
   -- news.php
   -- services.php
   -- sitemap.php
   -- suppliers.php
   -- tools.php
   -- vision.php
-- dynamic files in the pages subdirectory (carried over from previous
   versions of the website):
   -- bmiForm.php
   -- feedbackForm.php
-- new dynamic pages in this version of the website, listed in what
   might be regarded as a typical usage order:
   -- estore.php (formerly a static page, now a dynamic page,
      so finally ... we have our e-store)
   -- catalog.php (any site visitor can view our product categories)
   -- category.php (and view the items in any particular category)
   -- registrationForm.php (but, purchases require registration
      followed by login)
   -- loginForm.php
   -- shoppingCart.php (once logged in, users can "shop" by adding
      and/or deleting items from their shopping cart)
   -- checkout.php (checkout provides a receipt and inventory
      adjustment)
   -- logout.php
-- files in the scripts subdirectory (carried over from previous
   versions of the website):
   -- menus.js to handle the dropdown menus
   -- rotate.js to handle the image rotation on our home page
   -- bmiFormProcess.php to act as the "driver" for handling
      the BMI form
   -- bmiFormValidate.js to validate the data entries for the BMI form
   -- bmiCalculate.php to perform the BMI calculation
   -- feedbackFormProcess.php to act as the "driver" for handling
      the feedback form
-- new files in the scripts subdirectory, listed in what might be
   regarded as logical groupings:
   -- connectToDatabase.php
   -- displayListOfCategories.php and displayOneCategoryItems.php
   -- registrationFormValidate.js, registrationResponse.php and
      registrationFormProcess.php
   -- loginFormValidate.js and loginFormProcess.php
   -- shoppingCartProcess.php, shoppingCartAddItemFormValidate.js,
      shoppingCartAddItem.php, and shoppingCartDeleteItem.php
   -- checkoutProcess.php
   -- logoutProcess.php
