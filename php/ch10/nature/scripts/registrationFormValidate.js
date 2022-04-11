//registrationFormValidate.js

function registrationFormValidate()
{
    var registrationForm = document.getElementById('registrationForm');
    
    var firstNameBlank = registrationForm.firstName.value == null ||
                         registrationForm.firstName.value == "";
                        
    var middleInitialBlank =
        registrationForm.middleInitial.value == null ||
        registrationForm.middleInitial.value == "";
                         
    var lastNameBlank = registrationForm.lastName.value == null ||
                        registrationForm.lastName.value == "";

    var emailBlank = registrationForm.email.value == null ||
                     registrationForm.email.value == "";

    var phoneBlank = registrationForm.phone.value == null ||
                     registrationForm.phone.value == "";

    var addressBlank = registrationForm.address.value == null ||
                       registrationForm.address.value == "";

    var cityBlank = registrationForm.city.value == null ||
                    registrationForm.city.value == "";

    var stateBlank = registrationForm.state.value == null ||
                     registrationForm.state.value == "";

    var countryBlank = registrationForm.country.value == null ||
                       registrationForm.country.value == "";

    var loginNameBlank = registrationForm.loginName.value == null ||
                         registrationForm.loginName.value == "";

    var loginPasswordBlank = 
        registrationForm.loginPassword.value == null ||
        registrationForm.loginPassword.value == "";

    var allBlank = 
        firstNameBlank && middleInitialBlank && lastNameBlank &&
        emailBlank     && phoneBlank &&
        addressBlank   && cityBlank  && stateBlank  && countryBlank &&
        loginNameBlank && loginPasswordBlank;

    if (allBlank)
        alert("Error: Form must be filled in before submitting.");
        
    return !allBlank;
}
