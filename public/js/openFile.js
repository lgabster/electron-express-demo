((win, ns, undefined) => {

    var namespace = win[ns] || {}
    win[ns] = namespace 

	const selectDirBtn = document.getElementById('open-file')
	const selectDirSheetBtn = document.getElementById('open-file-sheet')

	selectDirBtn.addEventListener('click', (event) => {
	  	ipcRenderer.send('open-file-dialog')
	})
	selectDirSheetBtn.addEventListener('click', (event) => {
	  	ipcRenderer.send('open-file-dialog-sheet')
	})

	ipcRenderer.on('selected-file', (event, path) => {
	  	document.getElementById('selected-file').innerHTML = path
	})

})(window, 'electron')
