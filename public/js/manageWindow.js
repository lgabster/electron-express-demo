const BrowserWindow = require('electron').remote.BrowserWindow
const path = require('path')

const manageWindowBtn = document.getElementById('manage-window')

manageWindowBtn.addEventListener('click', function (event) {
    let win = new BrowserWindow({ width: 400, height: 275 })

    win.on('resize', updateReply)
    win.on('move', updateReply)
    win.on('closed', function () { win = null })
    win.loadURL('http://127.0.0.1:8000/modal')
    win.show()

    function updateReply () {
        const manageWindowReply = document.getElementById('manage-window-reply')
        const message = `Size: ${win.getSize()} Position: ${win.getPosition()}`

        manageWindowReply.innerText = message
    }
})