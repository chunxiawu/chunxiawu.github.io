<?php
/*displayListOfCategories.php
Included in catalog.php
This script assumes a connection has already been made
to the database, from which it loads and displays all
product categories.
*/

$query = "SELECT * FROM Ref_Product_Categories
                   ORDER BY department_name DESC";
$categories = mysqli_query($db, $query);
$numRecords = mysqli_num_rows($categories);
$categoryCount = 0;
$currentDepartment = "";
echo
"<table><tr><td><ul>";
for ($i=1; $i<=$numRecords; $i++)
{
    $row = mysqli_fetch_array($categories, MYSQLI_ASSOC);
    if ($currentDepartment != $row['department_name'])
    {
        if ($currentDepartment != "") echo "</ol></li>";
        if ($categoryCount > $numRecords/2)
        {
            echo "</ul></td>\r\n<td class='AlignToTop'><ul>";
            $categoryCount = 0;
        }
        $currentDepartment = $row['department_name'];
        echo "<li>$currentDepartment<ol>";
    }
    $prodCatCode = urlencode($row['product_category_code']);
    $prodCatDesc = $row['product_category_description'];
    $categoryURL = "pages/category.php?categoryCode=$prodCatCode";
    echo "<li><a href='$categoryURL'>$prodCatDesc</a></li>\r\n";
    $categoryCount++;
}
echo
"</ol></li></ul></td></tr></table>";
mysqli_close($db);
?>
