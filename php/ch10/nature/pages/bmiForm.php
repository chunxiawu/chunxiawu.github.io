<?php
//bmiForm.php
session_start();
include("../common/document_head.html");
?>
  <body>
    <header>
      <?php
      include("../common/banner.php");
      include("../common/menus.html");
      ?>
    </header>
    <main>
      <article class="BMI">
        <h4 class="Centered">Body Mass Index Calculator</h4>
        <p>Body Mass Index (BMI) is used as an indicator of total body
        fat. In order to calculate your BMI, please input your height
        and weight.</p>
        <form id="bmiForm" onsubmit="return bmiFormValidate()"
              action="scripts/bmiFormProcess.php" method="post">
          <fieldset class="SectionBackground">
            <legend class="LegendBackground">Vital statistics</legend> 
            <table>
              <tr>
                <td><label for="height">Your height:</label></td>
                <td><input id="height" type="text" name="height"
                  size="7"></td>
                <td><label for="heightUnit">Choose unit:</label></td>
                <td><select id="heightUnit" name="heightUnit">
                  <option>inches</option>
                  <option>centimeters</option>
                </select></td>
              </tr>
              <tr>
                <td><label for="weight">Your weight:</label></td>
                <td><input id="weight" type="text" name="weight"
                  size="7"></td>
                <td><label for="weightUnit">Choose unit:</label></td>
                <td><select id="weightUnit" name="weightUnit">
                  <option>pounds</option>
                  <option>kilograms</option>
                </select></td>
              </tr>
              <tr>
                <td colspan="4"><label for="details">Please check here
                if you want a detailed analysis of your BMI:</label> 
                <input id="details" type="checkbox" name="details"
                value="yes"></td>
              </tr>
            </table>
          </fieldset>
          <fieldset class="SectionBackground">
            <legend class="LegendBackground">E-mail record?</legend> 
            <table>
              <tr>
                <td colspan="2"><label for="wantMail">Do you want your
                BMI sent to you by e-mail?</label> <input id="wantMail"
                type="checkbox" name="wantMail" value="yes"></td>
              </tr>
              <tr>
                <td><label for="email">E-mail Address:</label></td>
                <td><input id="email" type="text" name="email"
                  size="40"></td>
              </tr>
            </table>
          </fieldset>
          <fieldset class="SectionBackground">
            <legend class="LegendBackground">Processing</legend> 
            <table>
              <tr>
                <td><input type="submit" value="Compute your BMI"></td>
                <td><input type="reset" value="Reset form"></td>
              </tr>
            </table>
          </fieldset>
        </form>
        <p>Total body fat is correlated to the risk of certain diseases
        which can be potentially fatal. BMI is valid for both men and
        women. However, it should only be used as a guideline as it has
        some limitations. It may overestimate the body fat in muscular
        persons and underestimate the body fat in persons who have lost
        muscle mass.</p>
        <p>More information can be found at the
        <a href="http://www.nhlbisupport.com/bmi/bmicalc.htm">National
        Institute of Health</a> website. Our calculator is based on the
        formula obtained from this site.</p>
      </article>
    </main>
    <footer>
      <?php
      include("../common/footer_content.html");
      ?>
    </footer>
  </body>
</html>
