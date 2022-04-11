<!DOCTYPE html>
<!-- bmiFormProcess.php
Prepares either a simple or more detailed message
reporting the outcome of the user's BMI calculation,
and also sends the report by e-mail if requested -->
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Your BMI</title>
  </head>
  <body>
    <p>
    <?php
    include("bmiCalculate.php");
    if (isset($_POST['details']))
        $message = detailedMessage($_POST['height'], $_POST['heightUnit'],
                                   $_POST['weight'], $_POST['weightUnit']);
    else
        $message = simpleMessage($_POST['height'], $_POST['heightUnit'],
                                 $_POST['weight'], $_POST['weightUnit']);
    echo $message;
    if (isset($_POST['wantMail']))
    {
        mailBMI($_POST['email'], $message);
        echo "<h2>The report has also been sent to you via e-mail.</h2>";
    }
    ?>
    </p>
  </body>
</html>
