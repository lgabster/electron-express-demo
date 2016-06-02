/**
 * Created by lgabster on 2016.05.31..
 */

const ipc = require('electron').ipcMain
const dialog = require('electron').dialog
const request = require('request');
const BrowserWindow = require('electron').BrowserWindow

module.exports.controller = function(app) {

    ipc.on('open-file-dialog', function (event) {
        console.log('---1')
        dialog.showOpenDialog({
            properties: ['openFile', 'openDirectory']
        }, function (files) {
            if (files) event.sender.send('selected-file', files)
        })
    })


    ipc.on('open-file-dialog-sheet', function (event) {
        console.log('---2')
        const window = BrowserWindow.fromWebContents(event.sender)
        const files = dialog.showOpenDialog(window, { properties: [ 'openFile' ]})
        if (files) event.sender.send('selected-file', files)
    })

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