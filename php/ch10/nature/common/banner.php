<?php
/*banner.php
This file handles the "banner display" of our Nature's Source
website, which includes the logo and welcome message. The logo
is just HTML. A PHP script displays a Welcome and the current
date and time, including a personal Welcome if the user has
logged in. And finally, a JavaScript script uses AJAX and a
second PHP script to update the date and time every 60 seconds.
*/
?>
      <div id="logo">
          <img src="images/naturelogo.gif"
               alt="Nature's Source"
               width="608" height="90">
      </div>

      <div id="welcome">
        <?php
        //Ensure that session_start() is called at the
        //beginning of any file that includes this script
        //and needs to make use of the $_SESSION array.
        //Also because logout.php destroys the session 
        //before its final display it is necessary here
        //to check that the $_SESSION values are actually
        //set and available before using them.
        $loggedIn = isset($_SESSION['customer_id']) ? true : false;
        if (isset($_SESSION['customer_id']))
            $customerID = $_SESSION['customer_id'];
        if (isset($_SESSION['salutation']))
            $salutation = $_SESSION['salutation'];
        if (isset($_SESSION['customer_first_name']))
            $customerFirstName = $_SESSION['customer_first_name'];
        if (isset($_SESSION['customer_middle_initial']))
            $customerMiddleInitial = $_SESSION['customer_middle_initial'];
        if (isset($_SESSION['customer_last_name']))
            $customerLastName = $_SESSION['customer_last_name'];
        if (!$loggedIn)
        {
            echo "<h5>Welcome!<br>";
        }
        else
        {
            echo "<h5>Welcome, $customerFirstName!<br>
                $salutation $customerFirstName
                $customerMiddleInitial $customerLastName<br>";
        }
        $date = date("l, F jS");
        $time = date("g:ia");
        echo "<span id='datetime'>It's $date.<br>";
        echo "Our time is $time.</span>";
        if ($loggedIn)
        {
            echo "</h5><a class='LongerButton'
                          href='pages/logout.php'>
                          Click here to log out</a>";
        }
        else
        {
            echo "</h5><a class='LongerButton'
                          href='pages/loginForm.php'>
                          Click here to log in</a>";
        }
        ?>
      </div>
      <script>
        //This script sets up the AJAX infrastructure for 
        //requesting date and time updates from the server.
        var request = null;
        function getCurrentTime()
        {
            request = new XMLHttpRequest();
            var url = "common/time.php";
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
            }
        }
        getCurrentTime();
        setInterval('getCurrentTime()', 60000)
      </script>
