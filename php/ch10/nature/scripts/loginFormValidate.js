//loginFormValidate.js

function loginFormValidate()
{
    var loginForm = document.getElementById('loginForm');
    
    var nameBlank = loginForm.loginName.value == null ||
                    loginForm.loginName.value == "";
    
    var passwordBlank = loginForm.loginPassword.value == null ||
                        loginForm.loginPassword.value == "";

    var bothBlank = nameBlank && passwordBlank;

    if (bothBlank)
        alert("Error: Form must be filled in before submitting.");
        
    return !bothBlank;
}
