((win, ns, undefined) => {

    var namespace = win[ns] || {}
    win[ns] = namespace 

    const trayBtn = document.getElementById('put-in-tray')
    let trayOn = false

    trayBtn.addEventListener('click', (event) => {
        if (trayOn) {
            trayOn = false
            document.getElementById('tray-countdown').innerHTML = ''
            ipcRenderer.send('remove-tray')
        } else {
            trayOn = true
            const message = 'Click tray button again to remove'
            document.getElementById('tray-countdown').innerHTML = message
            ipcRenderer.send('put-in-tray')
        }
    })

    // Tray removed from context menu on icon
    ipcRenderer.on('tray-removed', () => {
        trayOn = false
        document.getElementById('tray-countdown').innerHTML = ''
    })

})(window, 'electron')
