const express = require('express')
const routes = require('../routes')
const error = require('../middleware/error')
const notFound = require('../middleware/not_found')

module.exports = (app) => {
    app.use(express.json())
    app.use('/api/movies', routes.movies)
    app.use(error)
    app.use(notFound)
}