'use strict'

const axios = require('axios')
const config = require('config')
const moment = require('moment')

const models = require('../models')
const sequelize = require('../models').sequelize

const omdbBaseUrl = config.get('omdb.base_url')

var transaction

exports.getBySearch = async (req, res) => {
    const { title, apiKey } = req.query

    try {
        if (!apiKey) {
            return res.status(400).send({
                errors: [{
                    detail: 'API Key is required'
                }],
                code: 400,
                message: 'Bad request'
            })
        }

        // Call API
        const url = `${omdbBaseUrl}?apiKey=${apiKey}&s=${title}`
        var omdbMovies = await axios.get(url)
        if (omdbMovies.data.Response == 'False') {
            return res.status(404).send({
                errors: [{
                    detail: omdbMovies.data.Error
                }],
                code: 404,
                message: 'No content'
            })
        }
        omdbMovies = omdbMovies.data

        transaction = await sequelize.transaction()
        // For each movie, insert if it doesn't exist, else update the timestamp
        for (const omdbMovie of omdbMovies.Search) {
            let movie = await models.movie.findOne({ where: { imdbId: omdbMovie.imdbID } })
            if (!movie) {
                movie = await models.movie.create({
                    title: omdbMovie.Title,
                    year: omdbMovie.Year,
                    imdbId: omdbMovie.imdbID,
                    type: omdbMovie.Type,
                    poster: omdbMovie.Poster,
                    timestamp: moment().format()
                }, { transaction })
            } else {
                await models.movie.update({
                    timestamp: moment().format()
                }, { where: { imdbId: omdbMovie.imdbID } }, { transaction })
            }
        }
        await transaction.commit()

        // Retrieve data from the database
        var imdbIDs = await omdbMovies.Search.map(omdbMovie => omdbMovie.imdbID)
        var movies = await models.movie.findAll({
            where: { imdbId: imdbIDs },
            attributes: [
                'title',
                'year',
                'imdbId',
                'type',
                'poster',
                'timestamp'
            ]
        })

        return res.status(201).send({
            result: movies,
            total: movies.length
        })

    } catch (error) {
        console.log(error)
        if (transaction) {
            await transaction.rollback()
        }
        return res.status(400).send({
            errors: [{
                detail: 'Something failed',
                detail_err_sys: error
            }],
            code: 400,
            message: 'Bad request'
        })
    }
}

exports.getById = async (req, res) => {
    const { id } = req.params
    const { apiKey } = req.query

    try {
        if (!apiKey) {
            return res.status(400).send({
                errors: [{
                    detail: 'API Key is required'
                }],
                code: 400,
                message: 'Bad request'
            })
        }

        // Call API
        const url = `${omdbBaseUrl}?apiKey=${apiKey}&i=${id}`
        var omdbMovie = await axios.get(url)
        if (omdbMovie.data.Response == 'False') {
            return res.status(404).send({
                errors: [{
                    detail: omdbMovie.data.Error
                }],
                code: 404,
                message: 'No content'
            })
        }
        omdbMovie = omdbMovie.data

        var movie = await models.movie.findOne({ where: { imdbId: omdbMovie.imdbID } })

        transaction = await sequelize.transaction()
        // Insert movie if it doesn't exist, else update
        if (!movie) {
            movie = await models.movie.create({
                title: omdbMovie.Title,
                year: omdbMovie.Year,
                release_date: omdbMovie.Release_date,
                rated: omdbMovie.Rated,
                runtime: omdbMovie.Runtime,
                genre: omdbMovie.Genre,
                director: omdbMovie.Director,
                writer: omdbMovie.Writer,
                actors: omdbMovie.Actors,
                plot: omdbMovie.Plot,
                language: omdbMovie.Language,
                country: omdbMovie.Country,
                awards: omdbMovie.Awards,
                poster: omdbMovie.Poster,
                metascore: omdbMovie.Metascore,
                imdbRating: omdbMovie.ImdbRating,
                imdbVotes: omdbMovie.ImdbVotes,
                imdbId: omdbMovie.imdbID,
                type: omdbMovie.Type,
                dvd: omdbMovie.DVD,
                boxOffice: omdbMovie.BoxOffice,
                production: omdbMovie.Production,
                website: omdbMovie.Website,
                timestamp: moment().format()
            }, { transaction })

        } else {
            await models.movie.update({
                release_date: omdbMovie.Release_date,
                rated: omdbMovie.Rated,
                runtime: omdbMovie.Runtime,
                genre: omdbMovie.Genre,
                director: omdbMovie.Director,
                writer: omdbMovie.Writer,
                actors: omdbMovie.Actors,
                plot: omdbMovie.Plot,
                language: omdbMovie.Language,
                country: omdbMovie.Country,
                awards: omdbMovie.Awards,
                metascore: omdbMovie.Metascore,
                imdbRating: omdbMovie.ImdbRating,
                imdbVotes: omdbMovie.ImdbVotes,
                dvd: omdbMovie.DVD,
                boxOffice: omdbMovie.BoxOffice,
                production: omdbMovie.Production,
                website: omdbMovie.Website,
                timestamp: moment().format()
            }, { where: { imdbId: omdbMovie.imdbID } }, { transaction })
        }

        for (const rating of omdbMovie.Ratings) {
            // Insert rating source if it does'n exist
            let ratingSource = await models.rating_source.findOne({ where: { source: rating.Source } })
            if (!ratingSource) {
                ratingSource = await models.rating_source.create({
                    source: rating.Source
                }, { transaction })
            }

            // Insert rating if it does'n exist
            let rate = await models.rating.findOne({ where: { ratingSourceId: ratingSource.id, movieId: movie.id } })
            if (!rate) {
                rate = await models.rating.create({
                    ratingSourceId: ratingSource.id,
                    movieId: movie.id,
                    value: rating.Value
                }, { transaction })
            }
        }

        await transaction.commit()

        // Retrieve data from the database
        movie = await models.movie.findOne({
            where: { imdbId: id },
            include: { model: models.rating_source }
        })

        return res.status(201).send(movie)

    } catch (error) {
        console.log(error)
        if (transaction) {
            await transaction.rollback()
        }
        return res.status(400).send({
            errors: [{
                detail: 'Something failed',
                detail_err_sys: error
            }],
            code: 400,
            message: 'Bad request'
        })
    }
}