<?php
//registrationForm.php
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
      <article class="Registration">
        <h4>Registration Form</h4>
        <form id="registrationForm"
              onsubmit="return registrationFormValidate();"
              action="scripts/registrationFormResponse.php"
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
              <td><input required type="text" name="firstName" size="40"
                  title="Initial capital, then lowercase and no spaces"
                  pattern="^[A-Z][a-z]*$"></td>
            </tr>
            <tr>
              <td>Middle Initial:</td>
              <td><input type="text" size="4"
                         id="middleInitial" name="middleInitial"
                         title="A capital letter followed by a period"
                         pattern="^[A-Z]\.$"></td>
            </tr>
            <tr>
              <td>Last Name:</td>
              <td><input required type="text" name="lastName" size="40"
                  title="Initial capital, then lowercase and no spaces"
                  pattern="^[A-Z][a-z]*$"></td>
            </tr>
            <tr>
              <td>Gender:</td>
              <td><select name="gender">
                <option>&nbsp;</option>
                <option>Female</option>
                <option>Male</option>
                <option>Other/Do not want to disclose</option>
              </select></td>
            </tr>
            <tr>
              <td>E-mail Address:</td>
              <td><input required type="text" name="email" size="40"
                  title=
                  "x@y.z, x and y can have . or -, z only 2 or 3 letters"
                  pattern=
                  "^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})$"
                  value="Must be unique to our database"></td>
            </tr>
            <tr>
              <td>Phone Number:</td>
              <td><input required type="text" size="40" name="phone"
                         title="xxx-yyy-zzzz, area code optional"
                         pattern="^(\d{3}-)?\d{3}-\d{4}$"></td>
            </tr>
            <tr>
              <td>Street Address:<br />(include postal code)</td>
              <td><textarea id="address" name="address" 
                            rows="2" cols="30"></textarea></td>
            </tr>
            <tr>
              <td>City:</td>
              <td><input id="city" name="city"
                         type="text" size="40"></td>
            </tr>
            <tr>
              <td>State/Province:</td>
              <td><input id="state" name="state"
                         type="text" size="40"></td>
            </tr>
            <tr>
              <td>Country:</td>
              <td><select id="country" name="country">
                <option>&nbsp;</option>
                <option>USA</option>
                <option>Canada</option>
              </select></td>
            </tr>
            <tr>
              <td>Preferred Login Name:</td>
              <td><input required type="text" size="40"
                         id="loginName" name="loginName"
                         title="Letters and digits only (at least 6)"
                         pattern="^\w{6,}$"></td>
            </tr>
            <tr>
              <td>Login Password:</td>
              <td><input required type="password" size="40"
                         id="loginPassword" name="loginPassword"
                         title="Letters and digits only (at least 6)"
                         pattern="^\w{6,}$"></td>
            </tr>
            <tr>
              <td><input type="submit"
                         value="Submit Form Data"></td>
              <td><input type="reset"
                         value="Reset Form"></td>
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
