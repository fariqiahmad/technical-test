const express = require('express')
const router = express.Router()
const moviesController = require('../controller/movies')

router.get('/search', moviesController.getAll)
router.get('/detail', moviesController.getById)

module.exports = router