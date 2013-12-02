// define ctrlers
module.exports = function($models, $Ctrler) {

    var author = new $Ctrler($models.author),
        article = new $Ctrler($models.article),
        tag = new $Ctrler($models.tag);

    article.pageByPubdate = function(page, perpage, query, callback) {
        var cursor = this.page(page, perpage, query);
        cursor.query.populate('author').sort('-pubdate').exec(function(err, articles){
            callback(err, articles, cursor.pager);
        });
    };

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