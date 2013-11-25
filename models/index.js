// define modles: moogoose
module.exports = function($db, $Schema) {

    // authors
    var authorModel = new $Schema({
        nickname: String,
        avatar: String,
        avatarHash: String,
        password: String,
        email: {
            type: String,
            unique: true
        },
        created: {
            type: Date,
            default: Date.now
        },
        type: {
            type: String,
            default: 'normal'
        },
        articles: [{
            type: $Schema.Types.ObjectId,
            ref: 'article'
        }]
    });

    // article
    var articleModel = new $Schema({
        title: String,
        content: String,
        url: {
            type: String,
            unique: true
        },
        views: {
            type: Number,
            default: 0
        },
        pubdate: {
            type: Date,
            default: Date.now
        },
        author: [{
            type: $Schema.Types.ObjectId,
            ref: 'author'
        }],
        tags: [{
            type: $Schema.Types.ObjectId,
            ref: 'tag'
        }]
    });

    // tag
    var tagModel = new $Schema({
        name: {
            type: String,
            unique: true
        },
        articles: [{
            type: $Schema.Types.ObjectId,
            ref: 'article'
        }]
    });

    return {
        author: $db.model('author', authorModel),
        article: $db.model('article', articleModel),
        tag: $db.model('tag', tagModel)
    }
}