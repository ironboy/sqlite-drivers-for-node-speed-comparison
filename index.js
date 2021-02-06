global.doNotDelete = false;
async function runTests() {
  let t = require('./test-sqlite3');
  await t();
  require('./test-better-sqlite3');
  require('./test-best-sqlite3');
}
runTests();