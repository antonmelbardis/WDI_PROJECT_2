const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  body: String,
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

const articleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  content: {type: String },
  images: [{ type: String }],
  url: { type: String },
  comments: [commentSchema],
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Article', articleSchema);
// module.exports = mongoose.model('Comment', commentSchema);
