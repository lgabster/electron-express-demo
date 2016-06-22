((win, ns, undefined) => {

    var namespace = win[ns] || {}
    win[ns] = namespace 

    namespace.openExternalLink = (links) => {
    	console.warn('Run app.js')
        Array.prototype.forEach.call(links, (link) => {
            link.addEventListener('click', (event) => {
                event.preventDefault()
                shell.openExternal(link.href)
            })
        })
    }
 
    namespace.openExternalLink(document.querySelectorAll('a[href^="http"]'))

})(window, 'electron')

