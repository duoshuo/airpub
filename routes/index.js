module.exports = function(app, $ctrlers) {
    app.get('/users', function(req, res, next) {
        $ctrlers.user.find({}, function(err, users) {
            res.json(users);
        });
    });
}