<!DOCTYPE html>
<!-- welcome.php -->
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Welcome Message with Date and Time</title>
  </head>
  <body>
    <h2>Welcome!</h2>
    <?php
    echo "<h3>It's ".date("l, F jS").".<br>\r\n";
    echo "The time is ".date("g:ia").".</h3>\r\n";
    echo "<h3>Or at least that's our time, though ".
         "it may not be yours.</h3>\r\n";
    ?>
    <h6>Pedagogical Note:<br>This page is static,
    and therefore will not change once displayed.</h6>
  </body>
</html>