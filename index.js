global.doNotDelete = false;

global.dbNames = {
  sqlite3: 'test-sqlite3.sqlite3',
  betterSqlite3: 'test-better-sqlite3.sqlite3',
  bestSqlite3: 'test-best-sqlite3.sqlite3'
}

async function runTests() {
  let t = require('./test-sqlite3');
  await t();
  t = require('./test-better-sqlite3');
  await t();
  t = require('./test-best-sqlite3');
  await t();
  process.exit();
}
runTests().catch(e => console.error(e));