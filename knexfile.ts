import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: process.env.MYSQL_PASSWORD || "password",
      database: 'express_ts'
    }
  },

};

// module.exports = config;
export default config;
