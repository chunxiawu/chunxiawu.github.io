<?php
/*bmiCalculate.php
Functions to perform the BMI value calculation,
to one place after the decimal, assuming all data
input by the user has been validated, and to assemble
the text including this value to be returned to the
browser for display to the user
*/

//Constructs and returns the simple form of the BMI message
function simpleMessage($height, $heightUnit, $weight, $weightUnit)
{
   $bmi = sprintf("%1.2f", calculateBMI($height, $heightUnit,
                                        $weight, $weightUnit));
   $text = "<h1>BMI Report</h1><h3>Your BMI is $bmi.</h3>";
   return $text;
}

//Constructs and returns the detailed form of the BMI message
function detailedMessage($height, $heightUnit, $weight, $weightUnit)
{
    $bmi = sprintf("%.1f", calculateBMI($height, $heightUnit,
                                        $weight, $weightUnit));
    //In order for the logo to appear in the client's e-mail 
    //message, the following value of the src attribute of
    //the img tag (containing the full image URL) must be used:
    //src='http://cs.smu.ca/webbook2e/ch10/nature/images/naturelogo.gif'
    //Otherwise, the logo will appear on the web page response, but not
    //in the e-mail message received by the client.
    $text = "<p><img src='../images/naturelogo.gif' 
        alt=\"Nature's Source Logo\"></p>
        <h1>BMI Report</h1>
        <h3>Your height: $height $heightUnit<br>
        Your weight: $weight $weightUnit<br>
        Your BMI: $bmi</h3>";
   if ($bmi < 18.5)
       $text .= "<h2>Your BMI suggests that you
                     are underweight.</h2>";
   else if ($bmi < 25)
       $text .= "<h2>Your BMI suggests that you
                     have a reasonable weight.</h2>";
   else if ($bmi < 29)
       $text .= "<h2>Your BMI suggests that you
                     are overweight.</h2>";
   else
       $text .= "<h2>Your BMI suggests that you
                     may be obese.</h2>";
   return $text;
}

//Simple conversion functions
function inchesToCentimetres($height) { return $height*2.54; }
function poundsToKilograms($weight) { return $weight/2.2; }

//Computes and returns the BMI value. Note that both units can
//be metric, both can be non-metric, or they can be mixed.
function calculateBMI($height, $heightUnit, $weight, $weightUnit)
{
   if ($heightUnit == "inches") $height = inchesToCentimetres($height);
   if ($weightUnit == "pounds") $weight = poundsToKilograms($weight);
   $height /= 100.0; //Convert height from centimeters to meters
   $bmi = $weight/($height*$height);
   return $bmi;
}

//Constructs and sends the e-mail message as HTML
function mailBMI($email, $message)
{
    //The instances of "\r\n" should ensure that proper line breaks
    //occur in the text if the user is not viewing the message as HTML.
    $header  = "MIME-Version: 1.0\r\n";
    $header .= "Content-type: text/html; charset=utf-8\r\n";
    $header .= "From: webbook2e@cs.smu.ca\r\n";
    mail($email, "BMI report from Nature's Source", $message, $header);
}
?>
