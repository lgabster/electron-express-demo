const {shell, ipcRenderer} = require('electron')
const BrowserWindow = require('electron').remote.BrowserWindow

const appUrl = require('electron').remote.getGlobal('appUrl')

const path = require('path')
const os = require('os')