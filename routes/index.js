// define routes
var member = require('member'),
    article = require('./article'),
    sign = require('./sign');

module.exports = function(app, $ctrlers) {

    // middlewares
    app.all('*', member.passport);

    // home
    app.get('/', article($ctrlers).home);

    // page
    app.get('/page/:page', article($ctrlers).page);

    // sign in
    app.get('/signin', sign.in);
    app.post('/signin', sign.login($ctrlers));

    // sign up
    app.get('/signup', sign.up);
    app.post('/signup', sign.create($ctrlers));

    // sign out
    app.get('/signout', member.signout);

    // article
    app.resource('article', article($ctrlers));

}