/**
 * Created by lgabster on 2016.05.31..
 */

const path = require('path')
const request = require('request');
const {BrowserWindow, ipcMain, dialog, app, Menu, Tray} = require('electron')

module.exports.controller = function(app) {

    // Dialogs
    ipcMain.on('open-file-dialog', function (event) {
        dialog.showOpenDialog({
            properties: ['openFile', 'openDirectory']
        }, function (files) {
            if (files) event.sender.send('selected-file', files)
        })
    })

    ipcMain.on('open-file-dialog-sheet', function (event) {
        const window = BrowserWindow.fromWebContents(event.sender)
        const files = dialog.showOpenDialog(window, { properties: [ 'openFile' ]})
        if (files) event.sender.send('selected-file', files)
    })


    // System tray icon
    let appIcon = null
    ipcMain.on('put-in-tray', function (event) {
        const iconName = process.platform === 'win32' ? 'globe_icon.png' : 'globe_icon.png'
        const iconPath = path.join(__dirname, '../', iconName)
        console.log(iconPath)
        appIcon = new Tray(iconPath)
        const contextMenu = Menu.buildFromTemplate([{
            label: 'Remove',
            click: function () {
                event.sender.send('tray-removed')
                appIcon.destroy()
            }
        }])
        appIcon.setToolTip('Electron Demo in the tray.')
        appIcon.setContextMenu(contextMenu)
        
    })

    ipcMain.on('remove-tray', function () {
        appIcon.destroy()
    })

    app.on('window-all-closed', function () {
        appIcon.destroy()
    })


    // routing
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