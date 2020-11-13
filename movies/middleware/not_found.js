
module.exports = (req, res) => {
    res.status(405).send({
        errors: [{
            detail: 'Method not allowed'
        }],
        code: 405,
        message: 'Method not allowed'
    })
}   