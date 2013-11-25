// define ctrlers
module.exports = function($models, $Ctrler) {

    var author = new $Ctrler($models.author),
        article = new $Ctrler($models.article),
        tag = new $Ctrler($models.tag);

    article.checkAuthor = function(user, articleID, callback) {
        if (article.checkId(articleID)) {
            article.findById(articleID, function(err, ar) {
                if (user.type == 'creator') {
                    callback(err, true, ar);
                } else {
                    if (ar.author.indexOf(user._id) > -1) {
                        callback(err, true, ar);
                    } else {
                        callback(err, false, ar);
                    }
                }
            });
        } else {
            callback(new Error('articleID required'))
        }
    };

    return {
        author: author,
        article: article,
        tag: tag
    }
}