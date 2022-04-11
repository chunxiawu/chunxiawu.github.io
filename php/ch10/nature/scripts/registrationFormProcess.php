<?php
/*registrationFormProcess.php
//Calls these functions (defined below):
//emailAlreadyExists()
//getUniqueID()
Enters the customer's information from the registration
form into the database. Fails if the user does not have
an e-mail address that is unique in the database. The
login name requested by the user does not have to be 
unique, but if this is not the case, the script choses
a modified login name (based on the user's requested
login name) that is unique.
*/

//========== main script begins here
if (isset($_POST['gender']) && ($_POST['gender'] == "Female"))
    $gender = "F";
else if (isset($_POST['gender']) && ($_POST['gender'] == "Male"))
    $gender = "M";
else $gender = "O"; //for "Other"

if (emailAlreadyExists($db, $_POST['email']))
{
    echo "<h3>Sorry, but your e-mail
          address is already registered.</h3>";
}
else
{
    $unique_login = getUniqueID($db, $_POST['loginName']);
    if ($unique_login != $_POST['loginName'])
    {
        echo "<h3>Your preferred login name already exists.<br>So ...
              we have assigned $unique_login as your login name.</h3>";
    }

    $query = "INSERT INTO Customers(
        customer_id,
        salutation,
        customer_first_name, customer_middle_initial, customer_last_name,
        gender,
        email_address,
        login_name, login_password,
        phone_number,
        address, town_city, county, country
    )
    VALUES (
        NULL,
        '$_POST[salute]',
        '$_POST[firstName]', '$_POST[middleInitial]', '$_POST[lastName]',
        '$_POST[gender]',
        '$_POST[email]',
        '$unique_login', '$_POST[loginPassword]',
        '$_POST[phone]',
        '$_POST[address]', '$_POST[city]', '$_POST[state]', '$_POST[country]'
    );";
    $success = mysqli_query($db, $query);
    echo "<h3>Thank you for registering with our e-store.</h3>";
    echo "<h3>To log in and start shopping please
         <a href='pages/loginForm.php'
            class='NoDecoration'>click here</a>.</h3>";
}
mysqli_close($db);
//========== main script ends here

/*emailAlreadyExists()
Determines if the e-mail address supplied by the customer
upon registration is already in the database.
*/
function emailAlreadyExists($db, $email)
{
    $query =
      "SELECT *
      FROM Customers 
      WHERE email_address = '$email'";
    $customers = mysqli_query($db, $query);
    $numRecords = mysqli_num_rows($customers);
    return ($numRecords > 0) ? true : false;
}

/*getUniqueID()
Assigns a unique login name to the customer upon registration.
If the login name requested by the customer is already in use,
the customer will be assigned the login name which is formed
by taking the requested login name and appending the lowest
positive integer that makes the result unique in the database.
*/
function getUniqueID($db, $loginName)
{
    $unique_login = $loginName;
    $query =
      "SELECT *
      FROM Customers
      WHERE login_name = '$unique_login'";
    $customers = mysqli_query($db, $query);
    $numRecords = mysqli_num_rows($customers);
    if ($numRecords != 0)
    {
        //Try appending non-negative integers 0, 1, 2 ...
        //till you get a unique login name
        $i = -1;
        do
        {
            $i++;
            $unique_login = $loginName.$i;
            $query =
              "SELECT *
              FROM Customers
              WHERE login_name = '$unique_login'";
            $customers = mysqli_query($db, $query);
            $numRecords = mysqli_num_rows($customers);
        }
        while ($numRecords != 0);
    }
    return $unique_login;
}
?>
