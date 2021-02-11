#### Comparing the speed of these three SQLite3 drivers for Node.js
Which drivers?
* sqlite3
* better-sqlite3
* best-sqlite3

#### Which tests are run?
In a table with 5 columns (one id column with auto increment, 3 string columns - using short strings, and one timestamp column) do the following:
* run 1000 insert of single rows
* run 1000 selects (of single rows by id)
* run 1000 updates (each for a single row, found by id)
* run 1000 deletes (each of a single row by id)

#### Results
Results on a Macbook 2017 with an i5 processor and db:s stored on the internal SSD:

```
sqlite3
------------------
INSERTS 1745.28 ms
SELECTS  131.95 ms
UPDATES 1841.27 ms
DELETES 1890.77 ms


better-sqlite3
------------------
INSERTS 1666.89 ms
SELECTS   63.50 ms
UPDATES 1577.25 ms
DELETES 1758.87 ms


best-sqlite3
------------------
INSERTS   84.68 ms
SELECTS   51.85 ms
UPDATES   36.56 ms
DELETES   36.34 ms
```
