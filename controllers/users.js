const User = require('../models/user');
const Article = require('../models/article');

function usersShow(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      Article
        .find({ createdBy: user._id })
        .exec()
        .then(articles => {
          res.render('users/show', { user, articles });
        });
    });
}

module.exports = {
  show: usersShow
};
