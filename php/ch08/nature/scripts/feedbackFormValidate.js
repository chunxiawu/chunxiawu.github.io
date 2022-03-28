//feedbackFormValidate.js
//In the previous version of our website, the actual validation
//was shifted to the pattern attribute of the input elements in
//the HTML file, so all this script had to do was report that all
//went well and, if the user requested an e-mail reply, report
//as well that e-mail feedback report confirmation was yet available.

//In the current version of the website, not even those two actions
//are necessary, since if all went well the data is sent to the 
//server and is processed there, including the sending of emails,
//since that feature is now active and the confirmation is sent
//back to the user from the server.

//In short, we include this file (with this explanataion) only to
//avoid any confusion about why it had "disappeared".

//Of course, validation should also take place on the server to
//be doubly sure that nothing is amiss with the submitted data,
//but for the sake of conciseness we omit that step and validate
//only on the client side.

