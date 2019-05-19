let router = require('express').Router();
let mocks = require('./mock');
let assign = require('object-assign');

router.get('/article', function (req, res, next) {
    let articles = mocks.articles.map(function (article) {
            return assign({}, article, {
                text: undefined
            })
        }),
        limit = Number(req.query.limit) || articles.length,
        offset = Number(req.query.offset) || 0;

    res.json(articles.slice(offset, limit + offset))
});

router.get('/article/:id', function (req, res, next) {
    let article = mocks.articles.filter(function (article) {
        return article.id == req.params.id
    })[0];
    if (article) return res.json(article);

    res.status(404).json({error: "not found"});
});

router.post('/article', function (req, res, next) {
    let body = req.body;
    let article = {
        text: body.text,
        id: Date.now().toString(),
        user: body.user,
        date: new Date()
    };
    mocks.articles.push(article);
    res.json(article)
});

router.get('/comment', function (req, res, next) {
    let aid = req.query.article;
    if (aid) {
        let article = mocks.articles.find(function(article) {
            return article.id == aid
        });
        return res.json((article.comments || []).map(function(id) {
            return mocks.comments.find(function(comment) {
                return comment.id == id
            })
        }))
    }

    let limit = Number(req.query.limit) || mocks.comments.length,
        offset = Number(req.query.offset) || 0;
    res.json({
        total: mocks.comments.length,
        records: mocks.comments.slice(offset, limit + offset)
    })
});

router.post('/comment', function (req, res, next) {
    let comment = {
        id : Date.now().toString(),
        text : req.body.text,
        date: new Date(),
        user: req.body.user,
        article : req.body.article
    };
    mocks.comments.push(comment);
    res.json(comment)
});

router.post('/report', function (req, res) {
    res.json({})
});

module.exports = router;