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
INSERTS 1824.37 ms
SELECTS  111.30 ms
UPDATES 1613.14 ms
DELETES 1386.40 ms


better-sqlite3
------------------
INSERTS 1159.83 ms
SELECTS   53.23 ms
UPDATES 1661.20 ms
DELETES 1440.97 ms


best-sqlite3
------------------
INSERTS  344.90 ms
SELECTS   87.61 ms
UPDATES  166.80 ms
DELETES  174.07 ms
```