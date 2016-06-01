/**
 * Created by lgabster on 2016.06.01..
 */


// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const request = require('request');
const notifier = require('node-notifier');
const Growl = require('node-notifier').Growl;

window.document.on('click', '#basic', function() {
    notifier.notify('Message')
})

window.document.on('click', '#image', function() {
    notifier.notify({
        title: 'My awesome title',
        message: 'Hello from node, Mr. User!',
        icon: path.join(__dirname, 'coulson.jpg'), // Absolute path (doesn't work on balloons)
        sound: true, // Only Notification Center or Windows Toasters
        wait: true // Wait with callback, until user action is taken against notification
    }, function (err, response) {
        // Response is response from notification
    })

    notifier.on('click', function (notifierObject, options) {
        console.log('CLICK')
    })

    notifier.on('timeout', function (notifierObject, options) {
        console.log('TIMEOUT')
    })
})

window.document.on('click', '#growl', function() {
    var noti = new Growl({
        name: 'Growl Name Used', // Defaults as 'Node'
        host: 'localhost',
        port: 23053
    });
    noti.notify({
        title: 'Foo',
        message: 'Hello World',
        icon: fs.readFileSync(__dirname + "/public/img/noti.jpg"),
        wait: false,
        sound: true,
        sticky: false,
        label: void 0,
        priority: void 0
    });
})

console.log('asdasdasd');