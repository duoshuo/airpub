// GET     /          ->  index
// GET     /new       ->  new
// POST    /          ->  create
// GET     /:id       ->  show
// GET     /:id/edit  ->  edit
// PUT     /:id       ->  update
// DELETE  /:id       ->  destroy

exports = module.exports = function($ctrlers) {
    return {
        index: function(req, res, next) {
            $ctrlers.article.page(1, 10, {}, function(err, articles) {
                res.json({
                    articles: articles
                });
            });
        },
        new: function(req, res, next) {

        },
        create: function(req, res, next) {

        },
        show: function(req, res, next) {

        },
        edit: function(req, res, next) {

        },
        update: function(req, res, next) {

        },
        destroy: function(req, res, next) {

        }
    }
}