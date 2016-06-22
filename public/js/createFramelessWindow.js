((win, ns, undefined) => {

    var namespace = win[ns] || {}
    win[ns] = namespace 
    
    const newWindowBtn = document.getElementById('frameless-window')

    newWindowBtn.addEventListener('click', (event) => {
        let win = new BrowserWindow({ 
            frame: false,
            //transparent: true 
        })
        win.on('closed', () => { win = null })
        win.loadURL(appUrl + '/modal?closable=true')
        win.show()
    })

})(window, 'electron')
