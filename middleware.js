/**
 * Created by lgabster on 2016.05.31..
 */

const path = require('path')

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')

const passport = require('./lib/passport')

module.exports = function(app) {
    // view engine setup
    let hbs = exphbs.create({
        defaultLayout: 'main',
        handlebars: Handlebars,
        extname: '.hbs',
        partialsDir: [
            '$(__dirname)/views'
        ],
        layoutsDir: `${__dirname}/views/layouts`
    })

    console.log(`${__dirname}/views/layouts`)

    app.engine('hbs', hbs.engine)
    app.set('view engine', 'hbs')
    app.set('views', `${__dirname}/views`)

    //parsers
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    //passport
    app.use(session({ secret: 'Virg0HomaWork' }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.set('express', express);

    //path
    app.use(express.static(path.join(__dirname, 'public')));
}