#get_orders.sql
#--------------
SELECT order_id as id,
       customer_id as cust,
       order_status_code as status,
       date_order_placed as date,
       order_details as details
FROM Orders;

SELECT order_item_id as id,
       order_item_status_code as status,
       order_id,
       product_id,
       order_item_quantity as quant,
       order_item_price as price,
       other_order_item_details as details
FROM Order_Items;

