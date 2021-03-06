
require('dotenv').config()

module.exports = {
    development: {
        username: process.env.DB_MYSQL_USERNAME,
        password: process.env.DB_MYSQL_PASSWORD,
        database: process.env.DB_MYSQL_DATABASE_NAME,
        host: process.env.DB_MYSQL_HOST,
        dialect: 'mysql'
    },
    test: {
        username: 'root',
        password: null,
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'mysql'
    },
    production: {
        username: process.env.DB_MYSQL_USERNAME,
        password: process.env.DB_MYSQL_PASSWORD,
        database: process.env.DB_MYSQL_DATABASE_NAME,
        host: process.env.DB_MYSQL_HOST,
        dialect: 'mysql'
    }

}
