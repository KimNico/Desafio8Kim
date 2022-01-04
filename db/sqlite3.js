let knex = require('knex');

let sqlite = knex({
  client: 'sqlite3',
});

class SqliteDb {
  static client;
  constructor() {
    if (SqliteDb.client) {
      return SqliteDb.client;
    }
    SqliteDb.client = sqlite;
    this.client = SqliteDb.client;
  }
};

module.exports = new SqliteDb();