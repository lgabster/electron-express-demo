/**
 * Created by lgabster on 2016.05.31..
 */

const request = require('request');

module.exports.controller = (app) => {

    app.get('/modal', (req, res) => {
        result = {
            closable: req.query && req.query.closable
        }
        res.render('partials/modal', result)
    })
}