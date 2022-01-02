const mongoose = require('mongoose');

const pullRequestSchema = new mongoose.Schema({
  title: { type: String, require: true },
  content: { type: Array, require: true },
  author: { type: String },
  creationDate: { type: Date, require: true },
});

const PullRequest = mongoose.model('pullRequest', pullRequestSchema);

module.exports = PullRequest;
