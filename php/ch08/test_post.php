<!DOCTYPE html>
<!-- test_post.php -->
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>A PHP Script for Testing the POST Protocol</title>
  </head>
  <body>
    <?php
    echo "<h2>You sent me the values $_POST[value1] and $_POST[value2].
        <br>Here is their product: ";
    echo $_POST['value1'] * $_POST['value2'];
    echo "</h2>";    
    //Note in the above code that within the double quoted string
    //there are no single quotes surrounding value1 or value2, but
    //outside double quotes value1 and value2 are surrounded by
    //single quotes. There are other ways to structure this code
    //while achieving the same output, but this is probably the
    //simplest and least likely to cause hard-to-find bugs.
    ?>
  </body>
</html>
