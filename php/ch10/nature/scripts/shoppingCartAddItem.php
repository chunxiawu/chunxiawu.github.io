<?php
/*shoppingCartAddItem.php
Adds an item to the user's shopping cart, and redisplays the cart.
*/
session_start();
include("connectToDatabase.php");

//========== main script begins here
$customerID = $_SESSION['customer_id'];
$productID = $_GET['productID'];

//Get the order ID for the current order in progress
$query =
    "SELECT
        Orders.order_id,
        Orders.order_status_code,
        Orders.customer_id
    FROM Orders
    WHERE
        Orders.order_status_code = 'IP' and
        Orders.customer_id = $customerID";
$order = mysqli_query($db, $query);    
$row = mysqli_fetch_array($order, MYSQLI_ASSOC);
$orderID = $row['order_id'];

//Get the quantity in inventory of the requested product
$query =
    "SELECT *
    FROM Products
    WHERE product_id = '$productID'";
$product = mysqli_query($db, $query);
$row = mysqli_fetch_array($product, MYSQLI_ASSOC);
$productInventory = $row['product_inventory'];

$quantityRequested = $_GET['quantity'];
if ($quantityRequested > $productInventory)
{
    $gotoRetry = "../pages/shoppingCart.php?
                  productID=$productID&retrying=true";
    header("Location: $gotoRetry");
}
else
{
    $productPrice = $row['product_price'];
    $query = "INSERT INTO Order_Items
    (
        order_item_status_code,
        order_id,
        product_id,
        order_item_quantity,
        order_item_price,
        other_order_item_details
    )
    VALUES
    (
        'IP',
        '$orderID',
        '$productID',
        '$quantityRequested',
        '$productPrice',
        NULL
    )";
    $success = mysqli_query($db, $query);
    header("Location: ../pages/shoppingCart.php?productID=view");
}
//========== main script ends here
?>
