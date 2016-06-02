const BrowserWindow = require('electron').remote.BrowserWindow
const path = require('path')	

const newWindowBtn = document.getElementById('new-window')

newWindowBtn.addEventListener('click', (event) => {
	console.log(__dirname)
    const modalPath = 'http://127.0.0.1:8000/modal'
    let win = new BrowserWindow({ width: 400, height: 320 })
    win.on('closed', () => { win = null })
    win.loadURL(modalPath)
    win.show()
})