#get_me.sql
#Replace 'Scobey' with 'your_name'
#---------------------------------
SELECT customer_id as id,
       salutation as sal,
       customer_first_name as first,
       customer_middle_initial as mid,
       customer_last_name as last,
       gender as sex,
       email_address as email,
       login_name as username,
       login_password as password
FROM   Customers
WHERE  customer_last_name='Scobey';

SELECT phone_number, address, town_city, county, country
FROM   Customers
WHERE  customer_last_name='Scobey';

