#get_table_sizes.sql
#Replace 'webbook2e' with 'your_database_name'
#---------------------------------------------
SELECT TABLE_NAME, TABLE_ROWS
FROM   information_schema.tables
WHERE  table_schema='webbook2e';
