
module.exports = (err, req, res, next) => {
    res.status(400).send({
        errors: [{
            detail: 'Something failed',
            detail_err_sys: err
        }],
        code: 400,
        message: 'Bad request'
    })
}   