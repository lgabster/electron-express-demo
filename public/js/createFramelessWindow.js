const BrowserWindow = require('electron').remote.BrowserWindow
const path = require('path')

const newWindowBtn = document.getElementById('frameless-window')

newWindowBtn.addEventListener('click', function (event) {
    let win = new BrowserWindow({ 
        frame: false,
        //transparent: true 
    })
    win.on('closed', function () { win = null })
    win.loadURL('http://127.0.0.1:8000/modal')
    win.show()
})