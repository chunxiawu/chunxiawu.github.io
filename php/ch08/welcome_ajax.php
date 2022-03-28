<?php
/*welcome_ajax.php
This page displays a welcome message in which the date and
time are refreshed every 60 seconds via AJAX communication
with the server. Initially the text color of the entire page
is black, but each refresh uses a randomly chosen text color
from red, green, blue or maroon just for the two lines containing
the date and time information. Because the color choice is
random, the same color may repeat after a refresh. The rest
of the page is not refreshed, so its text color remains black.
*/
session_start();
if (!isset($_SESSION['timedateRefreshCount']))
    $_SESSION['timedateRefreshCount'] = 0;
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Welcome Message with Server-Time Updates via AJAX</title>
    <script>
    //This script sets up the AJAX infrastructure for requesting
    //date, time and random display color updates from the server.
    var request = null;
    function getCurrentTime()
    {
      request = new XMLHttpRequest();
      var url = "time.php";
      request.open("GET", url, true);
      request.onreadystatechange = updatePage;
      request.send(null);
    }
    function updatePage()
    {
        if (request.readyState == 4)
        {
            var dateDisplay = document.getElementById("datetime");
            dateDisplay.innerHTML = request.responseText;
            var hiddenParagraph = document.getElementById("colorChoice");
            dateDisplay.style.color = hiddenParagraph.innerHTML;
        }
    }
    </script>
  </head>
  <body id="welcome">
    <h2>Welcome!</h2>
    <?php
    echo "<h3 id='datetime'>It's ".date("l, F jS").".<br>\r\n";
    echo "The time is ".date("g:ia").".</h3>\r\n";
    ?>
    <h3>Or at least that's our time, though it may not be yours.</h3>
    <h6>Pedagogical Note:<br>When this page is first displayed,
    all text is displayed in the default text color of black.
    Then the time<br>and date are dynamically updated every 60
    seconds, and each time this happens the two lines of text<br>
    containing the date and time are shown in a color chosen
    randomly from one of these four colors: red,<br>green, blue
    or maroon. The remaining lines of text on the page
    (including this note) retain their (static)<br>default
    color black.</h6>
    <script>
    getCurrentTime();
    setInterval('getCurrentTime()', 60000)
    </script>
  </body>
</html>
