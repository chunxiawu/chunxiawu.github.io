//bmiFormValidate.js
//Functions to perform data validation on data entered
//by the user into the BMI form, and to display appropriate
//error messages if problems with the data are discovered

function bmiFormValidate()
{
    var bmiFormObj = document.getElementById("bmiForm");
    var hUnit = bmiFormObj.heightUnit.
        options[bmiFormObj.heightUnit.selectedIndex].text;
    var wUnit = bmiFormObj.weightUnit.
        options[bmiFormObj.weightUnit.selectedIndex].text;
    var height = bmiFormObj.height.value;
    var weight = bmiFormObj.weight.value;
    var email = bmiFormObj.email.value;
    var heightOK, weightOK, emailOK;

    if (hUnit == "inches")
        heightOK = inchesValid(height);
    else
        heightOK = centimetresValid(height);
    
    if (wUnit == "pounds")
        weightOK = poundsValid(weight);
    else
        weightOK = kilogramsValid(weight);
    
    if (bmiFormObj.wantMail.checked)
        emailOK = emailValid(email);
    else
        emailOK = true;
    
    return heightOK && weightOK && emailOK;
}

function inchesValid(height)
{
    if (height == "" || isNaN(height))
    {
        alert("Error: Please input a number for height.");
        return false;
    }
    if (height < 0 || height > 100)
    {
        alert("Error: Height must be in the range 0-100 inches.");
        return false;
    }
    return true;
}

function centimetresValid(height)
{
    if (isNaN(height))
    {
        alert("Error: Please input a number for height.");
        return false;
    }
    if (height < 0 || height > 300)
    {
        alert("Error: Height must be in the range 0-300 centimeters.");
        return false;
    }
    return true;
}

function poundsValid(weight)
{
    if (weight == "" || isNaN(weight))
    {
        alert("Error: Please input a number for weight.");
        return false;
    }
    if (weight < 0 || weight > 1000)
    {
        alert("Error: Weight must be in the range 0-1000 pounds.");
        return false;
    }
    return true;
}

function kilogramsValid(weight)
{
    if (isNaN(weight))
    {
        alert("Error: Please input a number for weight.");
        return false;
    }
    if (weight <= 0 || weight > 500)
    {
        alert("Error: Weight must be in the range 0-500 kilograms.");
        return false;
    }
    return true;
}

function emailValid(address)
{
    var p = address.search(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})$/);
    if (p == 0)
        return true;
    else
    {
        alert("Error: Invalid e-mail address.");
        return false;
    }
}
