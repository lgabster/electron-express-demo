/**
 * Created by lgabster on 2016.05.31..
 */

const passport = require('passport');

module.exports.controller = function(app) {
   
    app.get('/login', function(req, res) {
        res.render('login')
    })
    
    app.post('/login',
        passport.authenticate('local', {
            failureRedirect: '/login',
        }),
        function(req, res) {
            res.redirect('/');
        }
    );

    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });
}