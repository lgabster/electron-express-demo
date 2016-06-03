((win, ns, undefined) => {

    var namespace = win[ns] || {}
    win[ns] = namespace 

	const newWindowBtn = document.getElementById('new-window')

	newWindowBtn.addEventListener('click', (event) => {
	    const modalPath = appUrl + '/modal'
	    let win = new BrowserWindow({ width: 400, height: 320 })
	    win.webContents.openDevTools();
	    win.on('closed', () => { win = null })
	    win.loadURL(modalPath)
	    win.show()
	})

})(window, 'electron')