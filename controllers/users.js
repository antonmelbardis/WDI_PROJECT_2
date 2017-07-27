const User = require('../models/user');
const Article = require('../models/article');

function usersShow(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      Article
        .find({ createdBy: user._id })
        .populate('createdBy')
        .exec()
        .then(articles => {
          var loggedIn = res.locals.user;
          res.render('users/show', { loggedIn, articles });
        });
    });
}

module.exports = {
  show: usersShow
};
