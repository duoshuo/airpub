// define ctrlers
module.exports = function($models, $Ctrler) {

    var authorCtrl = new $Ctrler($models.author),
        articleCtrl = new $Ctrler($models.article),
        tagCtrl = new $Ctrler($models.tag);

    return {
        author: authorCtrl,
        article: articleCtrl,
        tag: tagCtrl
    }
}