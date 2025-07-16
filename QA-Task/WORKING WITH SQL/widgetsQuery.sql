SELECT
    u.username,
    SUM(oi.quantity) AS total_items_ordered
FROM
    Users AS u
JOIN
    Orders AS o ON u.user_id = o.user_id
JOIN
    OrderItems AS oi ON o.order_id = oi.order_id
JOIN
    Products AS p ON oi.product_id = p.product_id
WHERE
    p.product_name = 'Widget'
    AND o.order_date <= '2020-05-01' -- Filter for orders ON or BEFORE May 1, 2020
GROUP BY
    u.user_id, u.username -- Group by both ID and name for accuracy
HAVING
    SUM(oi.quantity) > 50;