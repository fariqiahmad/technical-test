const sequelize = require('sequelize')
const rp = require('request-promise')
const models = require('../models')

exports.getAll = (req, res) => {
    return res.send('search')
}

exports.getById = (req, res) => {
    return res.send('details')
}