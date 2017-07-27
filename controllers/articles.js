const Article = require('../models/article');
const User = require('../models/user');

const scrape = require('../scrape');

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

function articlesIndex(req, res, next) {
  Article
  .find()
  .then((articles) => res.render('articles/index', { articles }))
  .catch(next);
}

function articlesNew(req, res) {
  res.render('articles/new');
}

function articlesCreate(req, res, next) {
  // before i send the contence of req.body to the databsse, I want to add a key/value pair referencing the users id who created this film.
  req.body.createdBy = req.user._id;
  // launch scrape method in lib
  // assign result to variable
  // add variable to docvument to save
  if (req.body.url) {
    scrape.contentScrape(req.body.url, (data) => {
      // console.log('data from scraper received');
      req.body.content = data;
      setTimeout(createArticle, 2000);
      function createArticle() {
        console.log('reached');
        Article
        .create(req.body)
        .then(article => {
          console.log('reached');
          console.log(article);
          if (req.body.APIarticle) {
            res.json({ id: article._id });
          } else {
            res.redirect('/articles');
          }
        })
        .catch(next);
      }
    });
  } else {
    Article
    .create(req.body)
    .then(article => {
      console.log('reached');
      console.log(article);
      if (req.body.APIarticle) {
        res.json({ id: article._id });
      } else {
        res.redirect('/articles');
      }
    })
    .catch(next);
  }
}

function articlesShow(req, res, next) {
  Article
  .findById(req.params.id)
  // populate the field referencing the user's id with the actual users data
  .populate('createdBy comments.user')
  .exec()
  .then((article) => {
    if(!article) return res.status(404).render('statics/404');
    res.render('articles/show', { article });
  })
  .catch(next);
}

function articlesEdit(req, res, next) {
  Article
  .findById(req.params.id)
  .then((article) => {
    if(!article) return res.status(404).render('statics/404');
    res.render('articles/edit', { article});
  })
  .catch(next);
}

function articlesUpdate(req, res, next) {
  Article
  .findById(req.params.id)
  .then((article) => {
    if(!article) return res.status(404).render('statics/404');

    for(const field in req.body) {
      article[field] = req.body[field];
    }

    return article.save();
  })
  .then((article) => res.redirect(`/articles/${article.id}`))
  .catch(next);
}

function articlesDelete(req, res, next) {
  Article
  .findById(req.params.id)
  .then((article) => {
    if(!article) return res.status(404).render('statics/404');
    return article.remove();
  })
  .then(() => res.redirect('/articles'))
  .catch(next);
}

module.exports = {
  index: articlesIndex,
  new: articlesNew,
  create: articlesCreate,
  show: articlesShow,
  edit: articlesEdit,
  update: articlesUpdate,
  delete: articlesDelete,
  showuser: usersShow
};
