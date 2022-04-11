ch10/readme.txt

This chapter's directory contains the final version of our
Nature's Source website in its nature subdirectory (for
details of which see nature_readme.txt), but it also contains
several SQL script files which you may (or may not) find
helpful when you install your own copy of our Nature's
Source website and are experimenting with the registration,
login and "shopping" features it provides.

Here is an annotated list of those SQL script files, each
of which can be activated from the MySQL command line when
you are "using" your copy of the database from the command
line (you could also use phpMyAdmin for the same purpose):

-- get_table_sizes.sql - best used to confirm the current
   table sizes in your copy of the Nature's Source database
-- get_me.sql - used to confirm that "you" have in fact 
   succeeded in registering in the database
-- delete_me.sql - used to delete "your" registration if you
   wish to try it again for any reason
-- get_orders.sql - shows the content of the Orders and 
   Order_Items tables and is very useful to get a behind-
   the-scenes peek at what's going on as items are added
   to and/or deleted from the shopping cart and an order
   is eventually "purchased" by checking out
-- delete_orders.sql - clears out the Orders and OrderItems
   tables, if you wish to start over with a "blank slate"
   as far as orders and order items are concerned

Note:
Any one of these scripts can be invoked by entering

mysql> source filename.sql;

at the MySQL command line, provided you have logged 
in to MySQL from the directory where these files are
located, are currently "using" your copy of our database,
and have modified the files appropriately as indicated by
the comments within them.