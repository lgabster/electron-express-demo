((win, ns, undefined) => {

    var namespace = win[ns] || {}
    win[ns] = namespace 

	const newWindowBtn = document.getElementById('new-window')

	newWindowBtn.addEventListener('click', (event) => {
	    let win = new BrowserWindow({ width: 400, height: 320 })
	    
	    win.on('closed', () => { win = null })
	    win.loadURL(appUrl + '/modal')
	    win.show()
	})

})(window, 'electron')