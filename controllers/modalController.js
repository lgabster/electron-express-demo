/**
 * Created by lgabster on 2016.05.31..
 */

const request = require('request');

module.exports.controller = function(app) {

    app.get('/modal', function(req, res) {
        res.render('partials/modal')
    })
}