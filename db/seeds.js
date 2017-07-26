const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/wdi-project-2';
mongoose.connect(dbURL);

const User = require('../models/user');
const Article = require('../models/article');

User.collection.drop();
Article.collection.drop();

User
  .create([{
    username: 'amelbardis',
    email: 'melbardis@gmail.com',
    password: 'password',
    passwordConfirmation: 'password'
  },{
    username: 'guest',
    email: 'gu@e.st',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users created!`);

    return Article
      .create([{
        name: 'Neymar stays',
        releaseDate: '2017-07-22',
        synopsis: 'Neymar is set to stay at Barca',
        images: [
          'https://upload.wikimedia.org/wikipedia/en/a/ae/BourneIdentityfilm.jpg',
          'http://cdn2.thr.com/sites/default/files/imagecache/scale_crop_768_433/2013/04/the_bourne_identity.jpg',
          'http://static.guim.co.uk/sys-images/Film/Pix/pictures/2008/06/06/bourneidentity460.jpg'
        ],
        createdBy: users[0]._id,
        comments: [
          {
            body: 'good news',
            user: users[0]._id
          }
        ]
      }, {
        name: 'Run Lola Run',
        releaseDate: '1999-06-18',
        synopsis: 'After a botched money delivery, Lola has 20 minutes to come up with 100,000 Deutschmarks.',
        genre: 'Thriller',
        wikipedia: 'https://en.wikipedia.org/wiki/Run_Lola_Run',
        images: [
          'http://cdn.miramax.com/media/assets/Run-Lola-Run1.png',
          'https://assets.mubi.com/images/film/124/image-w856.jpg?1481117473',
          'https://www.jonathanrosenbaum.net/wp-content/uploads/2010/04/run_lola_run-5.jpg'
        ]
      }]);
  })
  .then((articles) => {
    console.log(`${articles.length} articles created!`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
