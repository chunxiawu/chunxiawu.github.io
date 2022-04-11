<?php
//feedbackForm.php
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
      <article class="Feedback">
        <h4>Feedback Form ... Let Us Know What You Think</h4>
        <form id="contactForm" action="scripts/feedbackFormProcess.php"
              method="post">
          <table>
            <tr>
              <td>Salutation:</td>
              <td><select name="salute">
                <option>&nbsp;</option>
                <option>Mrs.</option>
                <option>Ms.</option>
                <option>Mr.</option>
                <option>Dr.</option>
              </select></td>
            </tr>
            <tr>
              <td>First Name:</td>
              <td><input type="text" name="firstName" size="40"
                  title="Initial capital, then lowercase and no spaces"
                  pattern="^[A-Z][a-z]*$"></td>
            </tr>
            <tr>
              <td>Last Name:</td>
              <td><input type="text" name="lastName" size="40"
                  title="Initial capital, then lowercase and no spaces"
                  pattern="^[A-Z][a-z]*$"></td>
            </tr>
            <tr>
              <td>E-mail Address:</td>
              <td><input type="text" name="email" size="40"
                  title=
                  "x@y.z, x and y can have . or -, z only 2 or 3 letters"
                  pattern=
                  "^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})$"></td>
            </tr>
            <tr>
              <td>Phone Number:</td>
              <td><input type="text" name="phone" size="40"
                  title="xxx-yyy-zzzz, area code optional"
                  pattern="^(\d{3}-)?\d{3}-\d{4}$"></td>
            </tr>
            <tr>
              <td>Subject:</td>
              <td><input type="text" name="subject" size="40"></td>
            </tr>
            <tr>
              <td>Comments:</td>
              <td><textarea name="message" rows="6" cols="50">
              </textarea></td>
            </tr>
            <tr>
              <td colspan="2">Please check here if you wish to receive
              a reply: <input type="checkbox" name="reply" value="yes"></td>
            </tr>
            <tr>
              <td><input type="submit" value="Send Feedback"></td>
              <td><input type="reset" value="Reset Form"></td>
            </tr>
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
