<?php
/*shoppingCartProcess.php
Handles interaction between the user and the database
for Shopping Cart transactions.
Included by pages/shoppingCart.php.
Calls these functions (defined below):
getExistingOrder()
createOrder()
displayHeader()
displayExistingItemColumns()
displayNewItemColumns()
displayFooter()
*/

//========== main script begins here
$retrying = isset($_GET['retrying']) ? true : false;
$items = getExistingOrder($db, $customerID);
$numRecords = mysqli_num_rows($items);

if ($numRecords == 0 && $productID == 'view')
{
    echo
    "<p class='Notification'>Your shopping cart is empty.</p>
    <p class='Notification'>To continue shopping, please
    <a class='NoDecoration' href='pages/catalog.php'>click here</a>.</p>";
}
else
{
    displayHeader();
    $grandTotal = 0;
    if ($numRecords == 0) //Shopping cart is empty
    {
        createOrder($db, $customerID);
    }
    else //Shopping cart contains one or more items to display
    {
        for ($i=1; $i<=$numRecords; $i++)
        {
            $grandTotal += displayExistingItemColumns($db, $items);
        }
    }
    
    if ($productID != 'view') //Display entry row for new item
    {
        if ($retrying)
        {
            echo
            "<tr>
              <td class='Notification' colspan='7'>Please re-enter a
                product quantity not exceeding the inventory level.
              </td>
             </tr>";
        } 
        displayNewItemColumns($db, $productID);
    }
    displayFooter($grandTotal);
}
mysqli_close($db);
//========== main script ends here


/*getExistingOrder()
Retrieves from the database the items in an existing order,
that is, items currently in the shopping cart that have not
been purchased by going through checkout.
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
            Orders.order_status_code = 'IP'        and
            Orders.customer_id = $customerID";
    $items = mysqli_query($db, $query);
    return $items;
}

/*createOrder()
Creates a new order, to which items may be added for purchase.
*/
function createOrder($db, $customerID)
{
    $query = "INSERT INTO Orders
    (
        customer_id,
        order_status_code,
        date_order_placed,
        order_details
    )
    VALUES
    (
        '$customerID',
        'IP',
        CURDATE(),
        NULL
    )";
    $success = mysqli_query($db, $query);
}

/*displayHeader()
Displays headers for the seven columns of the shopping cart table.
*/
function displayHeader()
{
    echo 
    "<form id='orderForm'
           onsubmit='return shoppingCartAddItemFormValidate();'
           action='scripts/shoppingCartAddItem.php'>
      <table border='1px'>
        <tr>
          <th>Product Image</th>
          <th>Product Name</th>
          <th>Price</th>
          <th># in Stock</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Action</th>
        </tr>";
}

/*displayFirstFourColumns()
Displays the first four columns of a row of the shopping cart
table. The contents of the last three columns of a row of the
table will be different, depending on whether the row contains
information for an item that's already in the shopping cart,
or an item that has been chosen for adding to the cart but is
not yet in it.
*/
function displayFirstFourColumns($db, $productID)
{
    $query =
      "SELECT *
      FROM Products
      WHERE product_id='$productID'";
    $product = mysqli_query($db, $query);
    $row = mysqli_fetch_array($product, MYSQLI_ASSOC);
    $productPrice = sprintf("$%1.2f", $row['product_price']);
    echo
    "<tr>
      <td>
        <img height='70' width='70'
             src='$row[product_image_url]' alt='Product Image'>
      </td><td style='text-align: left;'>
        $row[product_name]
      </td><td style='text-align: right;'>
        $productPrice
      </td><td>
        $row[product_inventory]
      </td>";
}

/*displayExistingItemColumns()
Displays the last three columns of information for an item that
is alreay in the shopping cart. This information includes the
quantity ordered, the total price, and buttons to allow the
deletion of the item or continuing to shop by transferring
back to the product catalog. 
*/
function displayExistingItemColumns($db, $items)
{
    $row = mysqli_fetch_array($items, MYSQLI_ASSOC);
    $productID = $row['product_id'];
    displayFirstFourColumns($db, $productID);
    
    $total = $row['order_item_quantity'] * $row['order_item_price'];
    $totalAsString = sprintf("$%1.2f", $total);
    echo
      "<td>
        $row[order_item_quantity]
       </td><td style='text-align: right;'>
        $totalAsString
       </td><td>
        <p><a class='Button'
            href='scripts/shoppingCartDeleteItem.php?orderItemID=
            $row[order_item_id]&orderID=$row[order_id]'>
            Delete from cart</a></p>
        <p><a class='Button' href='pages/catalog.php'>
            Continue shopping</a></p>
        </td>
      </tr>";
    return $total;
}

/*displayNewItemColumns()
Displays the last three columns of information for an new item
that has been chosen for purchase but has not yet been added to
the shopping cart. This information includes a box for entering
the quantity desired, TBA in the total price spot, and buttons
to allow the addition of the item to the shopping cart or just
continuing to shop by transferring back to the product catalog,
thereby ignoring the given item. 
*/
function displayNewItemColumns($db, $productID)
{
    displayFirstFourColumns($db, $productID);
    echo
    "<td>
      <input type='hidden' id='productID' name='productID' value=$productID>
      <input type='text' id='quantity' name='quantity' size='3'>
     </td><td style='text-align: right;'>
      TBA
     </td><td>
      <p class='Centered' style='font-size:100%'>
        <input class='Button' type='submit' value='Add to cart'></p>
      <p><a class='Button' href='pages/catalog.php'>
        Continue shopping</a></p>
     </td>
  </tr>";
}

/*displayFooter()
Displays the final row of the shopping cart table, including
the grand total cost of items to be purchased and button to
permit proceeding to checkout.
*/
function displayFooter($grandTotal)
{
    $grandTotalAsString = sprintf("$%1.2f", $grandTotal);
    echo
    "<tr>
      <td class='Notification' colspan='5'>
        Grand Total
      </td><td class='RightAligned'>
        <strong>$grandTotalAsString</strong>
      </td><td>
        <p><a class='Button' href='pages/checkout.php'>
            Proceed to checkout</a></p>
      </td>
    </tr>
  </table>
</form>";
}
?>
