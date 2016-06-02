const ipc = require('electron').ipcRenderer
const selectDirBtn = document.getElementById('open-file')
const selectDirSheetBtn = document.getElementById('open-file-sheet')

selectDirBtn.addEventListener('click', function (event) {
  	ipc.send('open-file-dialog')
})
selectDirSheetBtn.addEventListener('click', function (event) {
  	ipc.send('open-file-dialog-sheet')
})

ipc.on('selected-file', function (event, path) {
  	document.getElementById('selected-file').innerHTML = path
})