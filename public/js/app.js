const shell = require('electron').shell;

((win, ns, undefined) => {
    //save pointers for faster lookup
    var document = window.document

    var namespace = window[ns] || {}
    window[ns] = namespace

    $(document).on('click', 'a[href^="http"]', (event) => {
        event.preventDefault()
        shell.openExternal(this.href)
    })

    $(document).on('click', '#basic', (event) => {
        console.log('Click on button')
    })
})(window, 'electron-demo')
