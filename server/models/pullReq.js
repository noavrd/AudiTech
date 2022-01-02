const mongoose = require('mongoose');

const pullRequestSchema = new mongoose.Schema({
  pullID: { type: Number, require: true },
  number: { type: Number, require: true },
  title: { type: String, require: true },
  user: { type: String },
  createdAt: { type: Date, require: true },
  closedAt: { type: Date, require: true },
  labels: { type: Array, require: false },
});

const PullRequest = mongoose.model('pullRequest', pullRequestSchema);

module.exports = PullRequest;
