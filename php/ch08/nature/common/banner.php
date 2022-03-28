<!-- banner.php -->
      <div id="logo">
          <img src="images/naturelogo.gif"
               alt="Nature's Source"
               width="608"
               height="90">
      </div>
      <div id="welcome">
        <h3>Welcome!</h3>
        <h5 id="datetime"><?php
        echo "It's ".date("l, F jS").".<br>";
        echo "Our time is ".date('g:ia').".";
        ?></h5>
      </div>
      <script>
        //This script sets up the AJAX infrastructure for 
        //requesting time updates from the server.
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

