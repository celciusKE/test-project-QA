-- Add a record to the table
INSERT INTO testtable1 (id, name, age) VALUES (1, 'Alice', 30);

-- Check if data was saved correctly
SELECT * FROM testtable1 WHERE id = 1;

-- Delete the entry
DELETE FROM testtable1 WHERE id = 1;

-- Confirm entry deleted successfully
SELECT * FROM testtable1 WHERE id = 1;

-- Should return no rows if deletion was successful
SELECT COUNT(*) FROM testtable1 WHERE id = 1;
