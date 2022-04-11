//shoppingCartAddItemFormValidate.js

function shoppingCartAddItemFormValidate()
{
    var orderForm = document.getElementById('orderForm');
    var quantity = orderForm.quantity.value;
    var valid = true;
    
    if (quantity == null || quantity == "")
    {
        alert("Error: Quantity requested is blank.");
        return false;
    }
    
    if (isNaN(quantity))
    {
        alert("Error: Quantity requested is not a number.");
        return false;
    }
    
    if (Number(quantity) <= 0)
    {
        alert("Error: Quantity requested must be positive.");
        return false;
    }
    
    if (Math.floor(Number(quantity)) !== Number(quantity))
    {
        alert("Error: Quantity requested must be an integer.");
        return false;
    }
    
    return valid;
}
