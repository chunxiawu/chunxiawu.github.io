<!DOCTYPE html>
<!-- test_get.php -->
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>A PHP Script for Testing the GET Protocol</title>
  </head>
  <body>
    <?php
    echo "<h2>You sent me the values $_GET[value1] and $_GET[value2].
        <br>Here is their product: ";
    echo $_GET['value1'] * $_GET['value2'];
    echo "</h2>";
    //Note in the above code that within the double quoted string
    //there are no single quotes surrounding value1 or value2, but
    //outside double quotes value1 and value2 are surrounded by
    //single quotes. There are other ways to structure this code
    //while achieving the same output, but this is probably the
    //simplest and least likely to cause hard-to-find bugs.

    $value = 7;
    displayValues($value); //Note: function call (this line)
                           //can precede function definition:
    function displayValues($val)
    {
        echo "<h3>From the function displayValues(), \$val=$val.";
        echo "<br>From the function displayValues(), \$value=$value.</h3>";
        echo "<h4>You need to know why the value 7 appears in the
            <br>first of the two statements immediately above,<br>
            but not in the second. Can you explain this?<br>Hint:
            <br>Look at the PHP code to see what this little<br>
            example tells you about PHP variable scope.</h4>";
    }
    ?>
  </body>
</html>
