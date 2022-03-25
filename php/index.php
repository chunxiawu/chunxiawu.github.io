<?php
    session_start();
    if (!isset($_SESSION['timedateRefreshCount']))
    $_SESSION['timedateRefreshCount'] = 0;
?>
<?php 
function randomPassword($numberdigits=8) {
    $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    $pass = array(); //remember to declare $pass as an array
    $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
    for ($i = 0; $i < $numberdigits; $i++) {
        $n = rand(0, $alphaLength);
        $pass[] = $alphabet[$n];
    }
    return implode($pass); //turn the array into a string
}

function random_str(
    $length=8,
    $keyspace = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
) {
    $str = '';
    $max = mb_strlen($keyspace, '8bit') - 1;
    if ($max < 1) {
        throw new Exception('$keyspace must be at least two characters long');
    }
    for ($i = 0; $i < $length; ++$i) {
        $str .= $keyspace[random_int(0, $max)];
    }
    return $str;
}

?>

<html>
<head>
<title>Chelsea's First PHP</title>
</head>
    <body>

    <div id='welcome'>
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

    </div>
        <div id='pswdiv'>
            <hr>
        <?php 
            $pswDigits = 12;
            $mypsw=randomPassword($pswDigits);
            $mypsw2=random_str($pswDigits);
            echo "<h2> Chelsea's Password Generator: </h2>";
            echo '<h4> Your '.$pswDigits. ' digits random password: '.$mypsw.' </h4>';

            echo '<h4> Your '.$pswDigits. ' digits random password using random_str: '.$mypsw2.' </h4>';
        ?>
        </div>

    <script>
    getCurrentTime();
    setInterval('getCurrentTime()', 60000)
    </script>
    <script>
        var request = null;
        function getCurrentTime(){
        request = new XMLHttpRequest();
        var url = "time.php";
        request.open("GET", url, true);
        request.onreadystatechange = updatePage;
        request.send(null);
        }
        function updatePage(){
        if (request.readyState == 4)
        {
        var dateDisplay = document.getElementById("datetime");
        dateDisplay.innerHTML = request.responseText;
        var hiddenParagraph = document.getElementById("colorChoice");
        dateDisplay.style.color = hiddenParagraph.innerHTML;
        }
        }
    </script>
    </body>
</html>