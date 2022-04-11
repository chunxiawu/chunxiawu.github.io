<?php
/*checkoutProcess.php
Displays a receipt to confirm the client's purchase(s)
and adjusts the database inventory levels accordingly.
Has a very short main driver, but uses eight helper
functions, all of which are defined below.
Calls displayReceipt() once, which in turn calls
--getExistingOrder() once
--displayReceiptHeader() once
--displayItemAndReturnTotalPrice() once for each item in the order
--displayReceiptFooter() once
Calls markOrderPaid() once
Calls markOrderItemsPaid() once, which in turn calls
--reduceInventory() once for each item in the order
*/
//error_reporting(E_ALL);

//========== main script begins here
displayReceipt($db, $customerID);

//Get the order ID for the order in progress
$query =
    "SELECT
        Orders.order_id,
        Orders.customer_id,
        Orders.order_status_code,
        Order_Items.*
    FROM
        Order_Items, Orders
    WHERE
        Orders.order_id = Order_Items.order_id and
        Orders.order_status_code = 'IP'        and
        Orders.customer_id = $customerID";
$orderInProgress = mysqli_query($db, $query);
$orderInProgressArray = mysqli_fetch_array($orderInProgress);
$orderID = $orderInProgressArray[0];

//Now mark as paid both the order itself and its order items 
markOrderPaid($db, $customerID, $orderID);
markOrderItemsPaid($db, $orderID);
mysqli_close($db);
//========== main script ends here

/*displayReceipt()
The "driver" routine for preparing and displaying a receipt
for the items purchased in the current order being checked out.
*/
function displayReceipt($db, $customerID)
{
    $items = getExistingOrder($db, $customerID);
    $numRecords = mysqli_num_rows($items);
    if($numRecords == 0)
    {
        echo
        "<h4 class='ShoppingCartHeader'>Shopping Cart</h4>
        <p class='Notification'>Your shopping cart is empty.</p>
        <p class='Notification'>To continue shopping, please
        <a class='NoDecoration' href='pages/catalog.php'>click
        here</a>.</p>";
        exit(0);
    }
    else
    {
        displayReceiptHeader();
        $grandTotal = 0;
        for($i=1; $i<=$numRecords; $i++)
        {
            $row = mysqli_fetch_array($items, MYSQLI_ASSOC);
            $grandTotal += displayItemAndReturnTotalPrice($db, $row);
        }
        displayReceiptFooter($grandTotal);
    }
}

/*getExistingOrder()
Gets and returns the purchased items in the order
being checked out.
*/
function getExistingOrder($db, $customerID)
{
    $query = 
        "SELECT
            Orders.order_id,
            Orders.customer_id,
            Orders.order_status_code,
            Order_Items.*
        FROM
            Order_Items, Orders
        WHERE
            Orders.order_id = Order_Items.order_id and
            Orders.order_status_code = 'IP' and
            Orders.customer_id = '$customerID'";
    $items = mysqli_query($db, $query);
    return $items;
}

/*displayReceiptHeader()
Displays user information and the date, as well as column
headers for the table of purchased items.
*/
function displayReceiptHeader()
{
    $date = date("F j, Y");
    $time = date('g:ia');
    echo
    "<p class='ReceiptTitle'>***** R E C E I P T *****</p>
    <p class='Notification'>
      Payment received from
      $_SESSION[salutation]
      $_SESSION[customer_first_name]
      $_SESSION[customer_middle_initial]
      $_SESSION[customer_last_name] on $date at $time.
    </p>";
    echo
    "<table class='Receipt'>
      <tr>
        <th>Product Image</th>
        <th>Product Name</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Total</th>
      </tr>";
}

/*displayItemAndReturnTotalPrice()
Displays one table row containing the information for
one purchased item.
*/
function displayItemAndReturnTotalPrice($db, $row)
{
    $productID = $row['product_id'];
    $query = "SELECT * FROM Products WHERE product_id ='$productID'";
    $product = mysqli_query($db, $query);
    $rowProd = mysqli_fetch_array($product, MYSQLI_ASSOC);
    $productPrice = $rowProd['product_price'];
    $productPriceAsString = sprintf("$%1.2f", $productPrice);
    $totalPrice = $row['order_item_quantity'] * $row['order_item_price'];
    $totalPriceAsString = sprintf("$%1.2f", $totalPrice);
    $imageLocation = $rowProd['product_image_url'];
    echo
    "<tr>
      <td class='Centered'>
        <img height='70' width='70'
             src='$imageLocation' alt='Product Image'>
      </td><td class='LeftAligned'>
        $rowProd[product_name]
      </td><td class='RightAligned'>
        $productPriceAsString
      </td><td class='Centered'>
        $row[order_item_quantity]
      </td><td class='RightAligned'>
        $totalPriceAsString
      </td>
    </tr>";
    return $totalPrice;
}

/*displayReceiptFooter()
Displays the total amount of the purchase and additional
information in the footer of the receipt.
*/
function displayReceiptFooter($grandTotal)
{
    $grandTotalAsString = sprintf("$%1.2f", $grandTotal);
    echo
    "<tr>
      <td class='Notification' colspan='4'>
        Grand Total
      </td><td class='RightAligned'>
        <strong>$grandTotalAsString</strong>
      </td>
    </tr><tr>
      <td colspan='5'>
        <p class='Notification'>Your order has been processed.
        <br>Thank you very much for shopping with Nature's Source.
        <br>We appreciate your purchase of the above product(s).
        <br>You may print a copy of this page for your permanent record.
        <br>To return to our e-store options page please
          <a href='pages/estore.php' class='NoDecoration'>click here</a>.
        <br>Or, you may choose one of the navigation links from our
        menu options.</p>
          
        <p class='LeftAligned'>Note to readers of the text:<br>
        We have only marked, in our database, the order and corresponding
        order items as paid, and reduced the database inventory in our
        Products table accordingly. The revised inventory levels should
        appear in any subsequent display of an affected product. Actual
        handling of payments and shipment is beyond the scope of our text.
        Besides, if truth be told, we have nothing to sell!</p>
      </td>
    </tr>
  </table>";
}

/*markOrderPaid()
Changes the status in the database of the order being checked
out from IP (in progress) to PD (paid).
*/
function markOrderPaid($db, $customerID, $orderID)
{
    $query =
        "UPDATE Orders
        SET order_status_code = 'PD'
        WHERE customer_id = '$customerID' and
              order_id ='$orderID'";
    $success = mysqli_query($db, $query);
}

/*markOrderItemsPaid()
Changes the status in the database of each item purchased
from IP (in progress) to PD (paid).
*/
function markOrderItemsPaid($db, $orderID)
{
    $query =
        "SELECT *
        FROM Order_Items
        WHERE order_id = '$orderID'";
    $orderItems = mysqli_query($db, $query);
    $numRecords = mysqli_num_rows($orderItems);
    for($i=1; $i<=$numRecords; $i++)
    {
        $row = mysqli_fetch_array($orderItems, MYSQLI_ASSOC);
        $query =
            "UPDATE Order_Items
            SET order_item_status_code = 'PD'
            WHERE order_item_id = $row[order_item_id] and
                  order_id = $row[order_id]";        
        mysqli_query($db, $query);
        reduceInventory($db, $row['product_id'],
                             $row['order_item_quantity']);
    }
}

/*reduceInventory()
Reduces the inventory level in the database of the product
purchased by the amount purchased.
*/
function reduceInventory($db, $productID, $quantityPurchased)
{
    $query = "SELECT * FROM Products WHERE product_id = '$productID'";
    $product = mysqli_query($db, $query);
    $row = mysqli_fetch_array($product, MYSQLI_ASSOC);
    $row['product_inventory'] -= $quantityPurchased;
    $query =
        "UPDATE Products
        SET product_inventory = $row[product_inventory]
        WHERE product_id = $row[product_id]";
    mysqli_query($db, $query);
}
?>
