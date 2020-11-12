const models = require('../models')

module.exports = async () => {
    try {
        await models.sequelize.authenticate()
        console.log(`Connection has been established successfully (${process.env.DB_MYSQL_HOST})...`)
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}