const express = require('express');
const router  = express.Router();

const statics = require('../controllers/statics');
const sessions = require('../controllers/sessions');
const registrations = require('../controllers/registrations');
const articles = require('../controllers/articles');
const users = require('../controllers/users');
const comments = require('../controllers/comments');

function secureRoute(req, res, next) {
  if (!req.session.userId) {
    return req.session.regenerate(() => {
      req.flash('danger', 'You must be logged in to view this content');
      res.redirect('/login');
    });
  }

  return next();
}

router.route('/')
  .get(statics.index);

router.route('/articles')
  .get(articles.index)
  .post(secureRoute, articles.create);

router.route('/articles/new')
  .get(secureRoute, articles.new);

router.route('/articles/:id')
  .get(articles.show)
  .post(secureRoute, comments.create)
  .put(secureRoute, articles.update)
  .delete(secureRoute, articles.delete);

router.route('/articles/:id/edit')
  .get(articles.edit);

router.route('/articles/:articleId/comments/:commentId')
  .delete(comments.delete);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.route('/users/:id')
  .get(users.show);



module.exports = router;
