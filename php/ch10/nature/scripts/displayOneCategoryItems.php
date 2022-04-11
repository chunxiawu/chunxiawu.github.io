<?php
/*displayOneCategoryItems.php
This script is called when all product categories have
been displayed and the user clicks on a link to see all
prodcuts in a particular category.
*/
$categoryCode = $_GET['categoryCode'];
$query = "SELECT * FROM Products
                   WHERE product_category_code = '$categoryCode'
                   ORDER BY product_name ASC";
$category = mysqli_query($db, $query);
$numRecords = mysqli_num_rows($category);
echo
"<table>
  <tr>
    <th>Product Image</th>
    <th>Product Name</th>
    <th>Price</th>
    <th># in Stock</th>
    <th>Purchase?</th>
  </tr>";
for ($i=1; $i<=$numRecords; $i++)
{
    $row = mysqli_fetch_array($category, MYSQLI_ASSOC);
    $productImageURL = $row['product_image_url'];
    $productName = $row['product_name'];
    $productPrice = $row['product_price'];
    $productPriceAsString = sprintf("$%.2f", $productPrice);
    $productInventory = $row['product_inventory'];
    $productID = $row['product_id'];
    $shoppingCartURL = "pages/shoppingCart.php?productID=$productID";
    $catalogURL = "pages/catalog.php";
    echo
    "<tr>
      <td>
        <img height='70' width='70'
             src='$productImageURL'
             alt='Product Image'>
      </td><td style='text-align: left;'>
        $productName
      </td><td>
        $productPriceAsString
      </td><td>
        $productInventory
      </td><td>
        <a class='Button' href='$shoppingCartURL'>Buy this item</a>
        <a class='Button' href='$catalogURL'>Return to list of 
                                             product categories</a>
      </td></tr>";
}
echo
"</table>";
mysqli_close($db);
?>
