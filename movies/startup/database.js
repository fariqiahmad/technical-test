const models = require('../models')

module.exports = () => {
    // check connection to database
    models.sequelize
        .authenticate()
        .then(() => console.log(`Connection has been established successfully (${process.env.DB_MYSQL_HOST})...`))
        .catch((err) => console.error('Unable to connect to the database:', err))

}