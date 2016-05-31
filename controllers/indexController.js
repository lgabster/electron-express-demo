/**
 * Created by lgabster on 2016.05.31..
 */

const request = require('request');

module.exports.controller = function(app) {

    app.get('/', function(req, res) {
        var result = {}
        if (req.user) {
            result.user = req.user

            var requestOptions = {
                url: 'https://api.github.com/users/lgabster/repos',
                headers: {
                    'User-Agent': 'Awesome-Electron-App'
                }
            }
            request(requestOptions, function (error, response, body) {
                if (error) {
                    console.log(error)
                } else {
                    var parsedBody = {}
                    try {
                        parsedBody = JSON.parse(body)
                    } catch(err) {
                        console.log(err)
                    }

                    result.githubRepos = parsedBody
                }
                res.render('index', result)

            })

        } else {
            res.render('index')
        }
    })
}