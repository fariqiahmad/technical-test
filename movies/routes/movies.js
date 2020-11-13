const express = require('express')
const router = express.Router()
const moviesController = require('../controller/movies')

router.get('/search', moviesController.getBySearch)
router.get('/:id/detail', moviesController.getById)

module.exports = router