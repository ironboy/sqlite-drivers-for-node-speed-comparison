const fs = require('fs');
const now = require('./now');
const format = require('./format');
const dbName = global.dbNames.betterSqlite3;


module.exports = async () => {

  console.log('\n\nbetter-sqlite3');
  console.log('------------------')

  fs.existsSync(dbName)
    && fs.unlinkSync(dbName);

  const Database = require('better-sqlite3');

  const db = adaptor(new Database(dbName));

  db.run(/*sql*/`
    CREATE TABLE users (
      id         INTEGER  PRIMARY KEY AUTOINCREMENT
                          UNIQUE
                          NOT NULL,
      userName   TEXT     UNIQUE
                          NOT NULL,
      firstName  TEXT     NOT NULL,
      lastName   TEXT     NOT NULL,
      registered DATETIME NOT NULL
                          DEFAULT (CURRENT_TIMESTAMP) 
    );
  `);

  let start = now('milli');
  for (let i = 1; i <= 1000; i++) {
    db.run(/*SQL*/`
      INSERT INTO users (userName, firstName, lastName)
      VALUES  ($userName, $firstName, $lastName)
    `, { userName: 'user' + i, firstName: 'Jane ' + i, lastName: 'Doe ' + i });
  }
  console.log('INSERTS', format(now('milli') - start));

  start = now('milli');
  for (let i = 1; i <= 1000; i++) {
    db.run(/*sql*/`
      SELECT * FROM users WHERE id = $id
    `, { id: i });
  }
  console.log('SELECTS', format(now('milli') - start));

  start = now('milli');
  for (let i = 1; i <= 1000; i++) {
    db.run(/*sql*/`
      UPDATE users SET firstName = $firstName
      WHERE id = $id
    `, { firstName: 'Jane Updated ' + i, id: i });
  }
  console.log('UPDATES', format(now('milli') - start));

  if (global.doNotDelete) { return; }
  start = now('milli');
  for (let i = 1; i <= 1000; i++) {
    db.run(/*sql*/`
      DELETE FROM users WHERE id = $id
    `, { id: i });
  }
  console.log('DELETES', format(now('milli') - start));

};

function adaptor(db) {
  return {
    run(sql, paras) {
      let stmt = db.prepare(sql);
      if (!paras) {
        return stmt.run();
      }
      if (sql.includes('SELECT')) {
        return stmt.all(paras);
      }
      return stmt.run(paras);
    }
  }
}