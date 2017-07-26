const express        = require('express');
const morgan         = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const bodyParser     = require('body-parser');
const methodOverride          = require('method-override');
const mongoose       = require('mongoose');
const bluebird       = require('bluebird');
const session                 = require('express-session');
const flash                   = require('express-flash');
const User                    = require('./models/user');

const { port, dbURL, secret }   = require('./config/env');
const routes         = require('./config/routes');
const app            = express();


mongoose.connect(dbURL);
mongoose.Promise = bluebird;

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);


app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressLayouts);

app.use(methodOverride(function (req) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

//middleware for express-session

app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false
}));

// Adding some middleware to check if there is an id inside req.session.
// If there an id value, use it to find the User with that id and add it to the locals object meaning the data is accessable in ANY ejs file.
// If there isn't an id inside req.session, call next();

app.use((req, res, next) => {
  console.log('userID', req.session.userId);
  // if no id inside req.session, carry on with next peice of middleware.
  if (!req.session.userId) return next();

  // if id, find User with that id and make accessable inside views.

  User
    .findById(req.session.userId)
    .exec()
    .then(user => {
      console.log(user);
      if(!user) {
        return req.session.regenerate(() => {
          req.flash('danger', 'You must be logged in to view this content');
          res.redirect('/');
        });
      }

      req.session.userId = user._id;

      // I want to make the current users infomation accessable in ANY route handler
      req.user = user;

      // const req {
      //   status: 200,
      //   url: 'localhost:3000/films',
      //   user: {
      //     username: 'rgowan',
      //     email: 'rane.gowan@gmail.com',
      //     password: '40r8ur9g84y30ryf94yrf04y0fy4f',
      //     _id: '8yy4yrf0cy30ry3d73'
      //   }
      // }

      // adding properties into the locals object meaning i can access these inside ANY view.
      res.locals.user = user;
      res.locals.isLoggedIn = true;

      next();
    });
});

app.use(flash());

app.use(routes);

app.listen(port, () => console.log(`Express up and running on port: ${port}`));
