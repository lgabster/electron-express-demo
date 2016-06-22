/**
 * Created by lgabster on 2016.05.31..
 */

const path = require('path')
const request = require('request');
const {BrowserWindow, ipcMain, dialog, app, globalShortcut, Menu, Tray} = require('electron')

module.exports.controller = (app) => {

    //global shortcut
    const ret = globalShortcut.register('CommandOrControl+X', () => {
        console.log('CommandOrControl+X pressed')
    })

    if (!ret) {
        console.log('shortcut registration failed')
    } else {
        console.log('Globalshortcut registered: ', globalShortcut.isRegistered('CommandOrControl+X'))
    }

    //sync-async messages
    ipcMain.on('sync-message', (event, arg) => {
        console.log(arg) // log 'sync-ping'
        event.returnValue = 'sync-pong'
    })

    ipcMain.on('async-message', (event, arg) => {
        console.log(arg) // log 'async-ping'
        event.sender.send('async-reply', 'async-pong')
    })

    // Dialogs
    ipcMain.on('open-file-dialog', (event) => {
        dialog.showOpenDialog({
            properties: ['openFile', 'openDirectory']
        }, (files) => {
            if (files) event.sender.send('selected-file', files)
        })
    })

    ipcMain.on('open-file-dialog-sheet', (event) => {
        const window = BrowserWindow.fromWebContents(event.sender)
        const files = dialog.showOpenDialog(window, { properties: [ 'openFile' ]})
        if (files) event.sender.send('selected-file', files)
    })


    // System tray icon
    let appIcon = null
    ipcMain.on('put-in-tray', (event) => {
        const iconName = process.platform === 'win32' ? 'globe_icon.png' : 'globe_icon.png'
        const iconPath = path.join(__dirname, '../public/img', iconName)
        appIcon = new Tray(iconPath)
        const contextMenu = Menu.buildFromTemplate([{
            label: 'Remove',
            click: () => {
                event.sender.send('tray-removed')
                appIcon.destroy()
            }
        }])
        appIcon.setToolTip('Electron Demo in the tray.')
        appIcon.setContextMenu(contextMenu)
        
    })

    ipcMain.on('remove-tray', () => {
        appIcon.destroy()
    })

    app.on('window-all-closed', () => {
        appIcon.destroy()
    })

    app.on('will-quit', () => {
        globalShortcut.unregisterAll();
    })


    // routing
    app.get('/', (req, res) => {
        var result = {}

        if (req.user) {
            result.user = req.user

            var requestOptions = {
                url: 'https://api.github.com/users/electron/repos',
                headers: {
                    'User-Agent': 'Awesome-Electron-App'
                }
            }
            request(requestOptions, (error, response, body) => {
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