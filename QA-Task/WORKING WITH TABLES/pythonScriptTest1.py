
# Import required modules
import sqlite3
import pytest


# Set up an in-memory database and create the test table
def setup_db():
    conn = sqlite3.connect(":memory:")
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE testtable1 (
            id INTEGER PRIMARY KEY,
            name TEXT,
            age INTEGER
        );
    """)
    return conn, cur


# Test inserting a record and selecting it from the table
def test_insert_and_select():
    conn, cur = setup_db()
    # 1.Add a record to the table
    cur.execute("INSERT INTO testtable1 (id, name, age) VALUES (1, 'Alice', 30);")
    # 2.Check if the data was saved correctly
    cur.execute("SELECT * FROM testtable1 WHERE id = 1;")
    row = cur.fetchone()
    # 3. Assert that the row matches the inserted data
    assert row == (1, 'Alice', 30)
    conn.close()


# Test deleting a record and confirming it no longer exists
def test_delete_and_confirm():
    conn, cur = setup_db()
    # 1. Add a record to the table
    cur.execute("INSERT INTO testtable1 (id, name, age) VALUES (1, 'Alice', 30);")
    # 2. Delete the entry from the table
    cur.execute("DELETE FROM testtable1 WHERE id = 1;")
    # 3. Confirm the entry was deleted successfully (should return no rows)
    cur.execute("SELECT * FROM testtable1 WHERE id = 1;")
    assert cur.fetchone() is None
    # 4. Confirm the count is zero for the deleted id
    cur.execute("SELECT COUNT(*) FROM testtable1 WHERE id = 1;")
    count = cur.fetchone()[0]
    assert count == 0
    conn.close()
