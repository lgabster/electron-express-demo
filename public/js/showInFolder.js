const shell = require('electron').shell
const os = require('os')
const fileManagerBtn = document.getElementById('show-in-folder')

fileManagerBtn.addEventListener('click', function (event) {
    shell.showItemInFolder(os.homedir())
})