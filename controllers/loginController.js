/**
 * Created by lgabster on 2016.05.31..
 */

const passport = require('passport');

module.exports.controller = (app) => {
   
    app.get('/login', (req, res) => {
        res.render('login')
    })
    
    app.post('/login',
        passport.authenticate('local', {
            failureRedirect: '/login',
        }),
        (req, res) => {
            res.redirect('/');
        }
    );

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
}