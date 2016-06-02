const ipc = require('electron').ipcRenderer

const trayBtn = document.getElementById('put-in-tray')
let trayOn = false

trayBtn.addEventListener('click', function (event) {
    console.log('TRAY')
    if (trayOn) {
        trayOn = false
        document.getElementById('tray-countdown').innerHTML = ''
        ipc.send('remove-tray')
    } else {
        trayOn = true
        const message = 'Click tray button again to remove'
        document.getElementById('tray-countdown').innerHTML = message
        ipc.send('put-in-tray')
    }
})

// Tray removed from context menu on icon
ipc.on('tray-removed', function () {
    trayOn = false
    document.getElementById('tray-countdown').innerHTML = ''
})