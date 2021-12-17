var dotenv = require('dotenv');
dotenv.config();

module.exports = {
  "development": {
    "username": process.env.userName,
    "password": process.env.Password,
    "database": process.env.database,
    "host": process.env.host,
    "dialect": process.env.dialect,
    "port": process.env.pg_port
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.userName,
    "password": process.env.Password,
    "database": process.env.database,
    "host": process.env.host,
    "dialect": process.env.dialect,
    "port": process.env.pg_port
  }
}
