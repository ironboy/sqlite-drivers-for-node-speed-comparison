const fs = require('fs');
const now = require('./now');
const format = require('./format');
const dbName = global.dbNames.sqlite3;

module.exports = async () => {

  console.log('\n\nsqlite3');
  console.log('------------------')

  fs.existsSync(dbName)
    && fs.unlinkSync(dbName);

  const sqlite3 = require('sqlite3');

  const db = adaptor(new sqlite3.Database(dbName));

  await db.run(/*sql*/`
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
    await db.run(/*SQL*/`
      INSERT INTO users (userName, firstName, lastName)
      VALUES  ($userName, $firstName, $lastName)
    `, { userName: 'user' + i, firstName: 'Jane ' + i, lastName: 'Doe ' + i });
  }
  console.log('INSERTS', format(now('milli') - start));

  start = now('milli');
  for (let i = 1; i <= 1000; i++) {
    await db.run(/*sql*/`
      SELECT * FROM users WHERE id = $id
    `, { id: i });
  }
  console.log('SELECTS', format(now('milli') - start));

  start = now('milli');
  for (let i = 1; i <= 1000; i++) {
    await db.run(/*sql*/`
      UPDATE users SET firstName = $firstName
      WHERE id = $id
    `, { firstName: 'Jane Updated ' + i, id: i });
  }
  console.log('UPDATES', format(now('milli') - start));

  if (global.doNotDelete) { return; }
  start = now('milli');
  for (let i = 1; i <= 1000; i++) {
    await db.run(/*sql*/`
      DELETE FROM users WHERE id = $id
    `, { id: i });
  }
  console.log('DELETES', format(now('milli') - start));


};

function adaptor(db) {
  return {
    run(sql, paras) {
      let $paras = {};
      for (let key in paras) {
        $paras['$' + key] = paras[key];
      }
      return new Promise((resolve, reject) => {
        if (!paras) {
          db.run(sql, resolve);
          return;
        }
        if (paras && !sql.includes('SELECT')) {
          db.run(sql, $paras, resolve);
          return;
        }
        let stmt = db.prepare(sql);
        stmt.all($paras, (err, r) => resolve(r));
      });
    }
  }
}