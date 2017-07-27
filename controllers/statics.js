const User = require('../models/user');

function staticsIndex(req, res) {
  if (res.locals.isLoggedIn) {
    User
    .find()
    .exec()
    .then((users) => res.render('statics/index', { users }));
  } else {
    User
    .find()
    .exec()
    .then((users) => res.render('sessions/new', { users }));
  }
}

module.exports = {
  index: staticsIndex
};
