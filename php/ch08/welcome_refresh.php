<?php
/*welcome_refresh.php
This page displays a welcome message and the complete page
is refreshed every 60 seconds. Initially the text color is
black, but each refresh uses a randomly chosen text color
from red, green, blue or maroon. Because the color choice
is random, the same color may repeat after a refresh.
*/
session_start();
if (!isset($_SESSION['pageRefreshCount']))
    $_SESSION['pageRefreshCount']=0;
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="refresh" content="60">
    <title>Welcome Message with Date, Time, and 60-Second Refresh</title>
  </head>
  <body id="welcome">
    <h2>Welcome!</h2>
    <?php
    $greetingColor = "black";
    if ($_SESSION['pageRefreshCount'] != 0)
    {
        $colorPicker = rand(1, 100);
        if ($colorPicker > 75)
            $greetingColor = "red";
        else if ($colorPicker > 50)
            $greetingColor = "green";
        else if ($colorPicker > 25)
            $greetingColor = "blue";
        else
            $greetingColor = "maroon";
    }
    $_SESSION['pageRefreshCount'] = $_SESSION['pageRefreshCount'] + 1;
    echo "<p hidden id='colorChoice'>$greetingColor</p>";
    echo "<h3>It's ".date("l, F jS").".<br>\r\n";
    echo "The time is ".date("g:ia").".</h3>\r\n";
    echo "<h3>Or at least that's our time, ".
         "though it may not be yours.</h3>\r\n";
    ?>
    <h6>Pedagogical Note:<br>This page starts off using the
    default text color of black to display all text. Then
    the page refreshes<br>every 60 seconds, and each time it
    does, everything (including this note) is displayed in
    one of four<br>randomly chosen alternate colors (red, green,
    blue or maroon) and the date and time are updated.</h6>
    <script>
    var hiddenParagraph = document.getElementById("colorChoice")
    document.getElementById("welcome").style.color=
        hiddenParagraph.innerHTML;
    </script>
  </body>
</html>
