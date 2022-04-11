<?php
//loginForm.php
session_start();
if (isset($_SESSION['customer_id'])) header('Location: estore.php');
$retrying = isset($_GET['retrying']) ? true : false;
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
      <article class="Login">
        <h4>Login Form</h4>
        <form id="loginForm"
              onsubmit="return loginFormValidate();"
              action="scripts/loginFormProcess.php"
              method="post">
          <table class="TableCellSpacer">
              <tr>
                <td>Username:</td>
                <td><input name="loginName"
                  type="text" size="20"
                  title="Must be at least 6 letters and or digits"
                  pattern="^\w{6,}$"></td>
                <td rowspan="3">
                  Important Note:
                  <br>Purchasing and checkout require logging in.
                  <br>And if you have not yet registered with our
                  <br>e-store, before login you must
                  <a href="pages/registrationForm.php"
                     class="NoDecoration">register here</a>.
                </td>
              </tr>
              <tr>
                <td>Password:</td>
                <td><input name="loginPassword"
                  type="password" size="20"
                  title="Must be at least 6 letters and or digits"
                  pattern="^\w{6,}$"></td>
              </tr>
              <tr>
                <td><input type="submit" value="Login"></td>
                <td><input type="reset" value="Reset Form"></td>
              </tr>
              
              <?php if ($retrying) { ?>
              
              <tr>
                <td colspan="2" class="ErrorMessage">
                  Sorry, but your login procedure failed.
                  <br>An invalid username or password was entered.
                  <br>Please try again to enter correct login information.
                </td>
              </tr>
              
              <?php } ?>
              
          </table>
        </form>
      </article>
    </main>
    <footer>
      <?php
      include("../common/footer_content.html");
      ?>
    </footer>
  </body>
</html>
