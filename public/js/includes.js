const {app, shell, ipcRenderer} = require('electron')
const remote = require('electron').remote

const {Menu, MenuItem} = remote;

const path = require('path')
const os = require('os')

const BrowserWindow = remote.BrowserWindow
const appUrl = remote.getGlobal('appUrl')