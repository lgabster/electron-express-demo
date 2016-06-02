const {shell} = require('electron');
var path = require('path');
var options = [
  {
    title: "Basic Notification",
    body: "Short message part"
  },
  {
    title: "Content-Image Notification",
    body: "Short message plus a custom content image",
    icon: path.join(process.cwd(), '/public/img/noti.jpg')
  }
]

var doNotify = (evt) => {
    console.log('notify')
    if (evt.srcElement.id == "basic") {
        new Notification(options[0].title, options[0])
    }
    else if (evt.srcElement.id == "image") {
        new Notification(options[1].title, options[1])
    }
}

var openExternalLink = (links) => {
    Array.prototype.forEach.call(links, (link) => {
        //shell.beep()
        link.addEventListener('click', (event) => {
            event.preventDefault()
            shell.openExternal(link.href)
        })
    })
}

$(document).ready(() => {
    console.warn('Run app.js')

    document.getElementById('basic').addEventListener('click', doNotify)
    document.getElementById('image').addEventListener('click', doNotify)    
    openExternalLink(document.querySelectorAll('a[href^="http"]'))    
})
