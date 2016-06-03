((win, ns, undefined) => {

    var namespace = win[ns] || {}
    win[ns] = namespace 

    const fileManagerBtn = document.getElementById('show-in-folder')

    fileManagerBtn.addEventListener('click', (event) => {
        shell.showItemInFolder(os.homedir())
    })

})(window, 'electron')
