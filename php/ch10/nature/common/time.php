<?php
/*time.php
Returns server time in response to an AJAX request
*/
$date = date("l, F jS");
$time = date("g:ia");
echo "It's $date.<br>
     Our time is $time.";
?>
