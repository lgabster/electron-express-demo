((win, ns, undefined) => {

    var namespace = win[ns] || {}
    win[ns] = namespace 

    console.log(ipcRenderer.sendSync('sync-message', 'sync-ping'))

    ipcRenderer.on('async-reply', (event, arg) => {
        console.log(arg) // print 'pong'
    })
    ipcRenderer.send('async-message', 'async-ping')

})(window, 'electron')

