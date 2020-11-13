const supertest = require('supertest')
const expect = require('chai').expect
const config = require('config')
const baseUrl = config.get('api.base_url')
const server = supertest.agent(baseUrl)

var apiKey = '628194e8'

describe('GET movies unit testing', () => {
    describe('GET movies search', () => {
        it('Should return array of object, contain resutl and total, with 201 status code', () => {
            let title = 'spiderman'

            server
                .get(`/api/movies/search?apiKey${apiKey}&title=${title}`)
                .expect('Content-Type', /json/)
                .expect(201)
                .expect((res) => {
                    expect(res.body.result).to.be.an('array')
                    expect(res.body.total).to.be.a('number')
                })
        })
    })

    describe('GET movies search unavailable', () => {
        it('Should return error, with 404 status code, and error detail is "Movie not found!"', () => {
            let title = 'asdasd'

            server
                .get(`/api/movies/search?apiKey${apiKey}&title=${title}`)
                .expect('Content-Type', /json/)
                .expect(404)
                .expect((res) => {
                    expect(res.body.errors).to.be.an('array').to.deep.include({
                        "detail": "Movie not found!"
                    })
                    expect(res.body.code).to.equal(404)
                })
        })
    })

    describe('GET movies search too many result', () => {
        it('Should return error, with 404 status code, and error detail is "Too many results."', () => {
            let title = 'asdasd'

            server
                .get(`/api/movies/search?apiKey${apiKey}&title=${title}`)
                .expect('Content-Type', /json/)
                .expect(404)
                .expect((res) => {
                    expect(res.body.errors).to.be.an('array').to.deep.include({
                        "detail": "Too many results."
                    })
                    expect(res.body.code).to.equal(404)
                })
        })
    })

    describe('GET movie details', () => {
        it('Should return object, with 201 status code', () => {
            let imdbID = 'tt0145487'

            server
                .get(`/api/movies/${imdbID}/detail?apiKey${apiKey}`)
                .expect('Content-Type', /json/)
                .expect(201)
                .expect((res) => {
                    expect(res.body).to.be.an('object')
                    expect(res.body.rating_sources).to.be.an('array')
                })
        })
    })

    describe('GET movie details invalid imdbID', () => {
        it('Should return errors, 404 status code, and detail error is "Incorrect IMDb ID."', () => {
            let imdbID = 'asdasd'

            server
                .get(`/api/movies/${imdbID}/detail?apiKey${apiKey}`)
                .expect('Content-Type', /json/)
                .expect(404)
                .expect((res) => {
                    expect(res.body.errors).to.be.an('array').to.deep.include({
                        "detail": "Incorrect IMDb ID."
                    })
                    expect(res.body.code).to.equal(404)
                })
        })
    })

    describe('GET movie details invalid apiKey', () => {
        it('Should return errors, 404 status code, and detail error is "Incorrect IMDb ID."', () => {
            let imdbID = 'tt0145487'
            apiKey = 'asdasd'

            server
                .get(`/api/movies/${imdbID}/detail?apiKey${apiKey}`)
                .expect('Content-Type', /json/)
                .expect(404)
                .expect((res) => {
                    expect(res.body.code).to.equal(404)
                })
        })
    })
})