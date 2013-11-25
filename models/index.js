module.exports = function($db, $Schema) {
    var userModel = new $Schema({
        name: String,
        created: Date,
    });
    return {
        user: $db.model('user', userModel)
    }
}