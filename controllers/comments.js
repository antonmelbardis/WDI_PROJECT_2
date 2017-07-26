const Article = require('../models/article');

function commentsCreate(req, res) {
  Article
  .findById(req.params.id)
  .exec()
  .then(article => {
    req.body.user = req.user._id;
    article.comments.push(req.body);
    article.save();
    res.redirect(`/articles/${article._id}`);
  });
}

function commentsDelete(req, res) {
  Article
  .findById(req.params.articleId)
  .exec()
  .then(article => {
    const comment = article.comments.id(req.params.commentId);
    comment.remove();
    article.save();

    res.redirect(`/articles/${article._id}`);
  });
}

module.exports = {
  create: commentsCreate,
  delete: commentsDelete
};
