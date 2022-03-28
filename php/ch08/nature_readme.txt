ch08/nature_readme.txt

The version of our Nature's Source website in
the nature subdirectory of this chapter retains
all the functionality of the nature2 version of
Chapter 7 (rotating images and dropdown menus
in particular), but now we have introduced server-
side processing with PHP. So, first, although the
BMI form data is still validated client-side using
JavaScript, once that data has been validated it
is sent to the server, where the BMI calculation
is now performed by PHP and sent back to the browser
(and also e-mailed to the user, if requested).
Second, the feedback form data is also validated
client-side, but via some of the new HTML 5 input form
control features, rather than via JavaScript. And as
with the BMI form, once the data has been validated,
it is sent to the server for processing, which includes
a confirmation browser display to the user, an e-mail
to the business and, if requested, one to the user, and
also a log on the server of the feedback form contents.

Furthermore, we make use of AJAX to display the date
and time as part of our Welcome message.

Full list of nature subdirectory contents:
-- index.php is our home page, located at the root level of the
   subdirectory
-- files in the images subdirectory:
   -- naturelogo.gif (the Nature's Source logo)
   -- outdoor1.jpg to outdoor6.jpg (outdoor exercise scenes to be
      displayed in rotation on our home page on weekend days-
      Friday, Saturday and Sunday)
   -- indoor1.jpg to indoor6.jpg (indoor exercise scenes to be
      displayed in rotation on our home page on weekdays-Monday
      to Thursday)
-- files in the common subdirectory:
   -- document_head.html (DOCTYPE, opening html tag, and head element)
   -- footer_content.html (copyright notice, but no two-element menu)
   -- banner.php (logo image plus Welcome message with date and time)
   -- time.php (refreshes date and time for banner.php, via AJAX)
   -- menus.html (our new dropdown menus)
-- files in the css subdirectory:
   -- desktop.css (contains the CSS styles for the desktop view of our
      website pages)
   -- tablet.css (contains the CSS styles for the tablet view of our
      website pages)
-- data (subdirectory) files:
   -- feedback.txt (contains archived feedback-form data submitted by
      site visitors)
-- static files in the pages subdirectory:
   -- about.php
   -- catalog.php
   -- employment.php
   -- estore.php
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
-- dynamic files in the pages subdirectory:
   -- bmiForm.php
   -- feedbackForm.php
-- files in the scripts subdirectory:
   -- menus.js to handle the dropdown menus
   -- rotate.js to handle the image rotation on our home page
   -- bmiFormProcess.php to act as the "driver" for handling
      the BMI form
   -- bmiFormValidate.js to validate the data entries for the BMI form
   -- bmiCalculate.php to perform the BMI calculation
   -- feedbackFormProcess.php to act as the "driver" for handling
      the feedback form
   -- feedbackFormValidate.js is actually just a "placeholder" here
      since feedback form data validation is accomplished by other
      means in this version of the website (see the comments in the
      file itself for further details)
