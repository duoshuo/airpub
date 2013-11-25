module.exports = function($models, $Ctrler) {
    return {
        user: new $Ctrler($models.user)
    }
}