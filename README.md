# test-project-QA

Quick start for testing on Playwright

Q4: Write SELECT queries to get:

1. Find the names of users who ordered more than 50 units of the
product &quot;Widget&quot; not up to, but from 1 May 2020, and display the total number
of items they ordered.

<https://www.db-fiddle.com/f/pjWXeNUVF2grpEzyvhUdd1/0>

```sql
SELECT
    u.username,
    SUM(oi.quantity) AS total_widgets_ordered
FROM
    Users u
JOIN
    Orders o ON u.user_id = o.user_id
JOIN
    OrderItems oi ON o.order_id = oi.order_id
JOIN
    Products p ON oi.product_id = p.product_id
WHERE
    p.product_name = 'Widget'
    AND o.order_date <= '2020-05-01'
GROUP BY
    u.username
HAVING
    SUM(oi.quantity) > 50;

```

2. Explain how encrypted passwords can be processed.
````
Passswords should be encrypted and not stored as plain text in the database.
The passwords should be hashed using a secure hashing algorithm like bcrypt.
````