/**
 * Created by lgabster on 2016.05.31..
 */

const electron = require('electron')
const app = electron.app
const remote = electron.remote
const BrowserWindow = electron.BrowserWindow

const express = require('express')
const expressApp = express()

const path = require('path')

const fs = require('fs')

const http = require('http')
const port = process.env.PORT || '8000'
const appUrl = 'http://127.0.0.1:' + port

global.appUrl = appUrl

const middleware = require('./middleware')

let mainWindow
let server

var ctrlPath = path.join(__dirname, 'controllers')

var readControllers = (dir) => {
    console.log('Scanning for controllers ' + dir)
    
    fs.readdirSync(dir).forEach((file) => {
        var fullPath = dir + '/' + file

        if (file.substr(-3) === '.js') {
            console.log('Loading '+file)

            var route = require(fullPath)
            
            if (route.controller) {
                route.controller(expressApp)
            }
        } else if(fs.lstatSync(fullPath).isDirectory()) {
            readControllers(fullPath);
        }
    });
};


app.on('ready', () => {

    middleware(expressApp)

    expressApp.set('port', port);

    readControllers(ctrlPath);

    server = http.createServer(expressApp);
    server.listen(port);

    server.on('error', (error) => {
        console.error(error);
        process.exit(1);
    });

    mainWindow = new BrowserWindow({
        width: 1800,
        height: 800,
        //frame: false,
        //transparent: true
    })

    server.on('listening', () => {
        mainWindow.loadURL(appUrl);
        mainWindow.webContents.openDevTools();
    });

    mainWindow.on('closed', () => {
        mainWindow = null
        server.close()
    })
})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})
