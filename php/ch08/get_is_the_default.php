<!DOCTYPE html>
<?php
/*get_is_the_default.php
This little script is designed to show that data can
be passed directly to a script at the end of its URL.
In other words, it is not necessary to use a form to
pass the data. When data is passed in this way it is
is the GET protocol that is in play.
*/
?>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Test Get</title>
  </head>
  <body>
<?php
if (count($_GET) == 0)
{
    echo <<<INFO
You have run this script without any input data.<br>
The URL of the script will be in the address bar of your browser.<br>
So ... add the following to the end of that URL and refresh:<br>
<pre>?first=5&amp;second=10</pre>
Then try other values for <code>first</code> and <code>second</code>.
INFO;
    exit(0);
}
echo "The value of <code>first</code> is $_GET[first].<br>
    The value of <code>second</code> is $_GET[second].<br>";
$product = $_GET['first'] * $_GET['second'];
echo "Product of the two values = $product<br>
    Sum of the two values = {$_GET['first']} + {$_GET['second']} = ";
//Note the use of braces to achieve interpolation in the above line.
echo $_GET['first'] + $_GET['second'], "<br>";
echo "[Check the code to see how we got 5 + 10 
       displayed in the above line.]";
?>
  </body>
</html>
