const express = require('express');
const cors = require('cors');
const { Octokit } = require('@octokit/core');
const PullRequest = require('./models/pullReq');

const app = express();
const octokit = new Octokit({ auth: process.env.TOKEN });

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  try {
    res.status(200).send('Main GET');
  } catch {
    res.status(500).send('Server problem');
  }
});

app.get('/allPullRequests', async (req, res) => {
  try {
    await PullRequest.remove({});
    const response = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
      owner: 'noavrd',
      repo: 'demo-repo',
    });
    await createNewPull(response.data);
    const allPulls = await PullRequest.find({});
    res.send(allPulls);
  } catch (err) {
    res.status(500).send('Server problem');
  }
});

async function createNewPull(allPulls) {
  for (let pull of allPulls) {
    const existsPulls = await PullRequest.findOne({
      pullID: pull.id,
    });

    if (!existsPulls) {
      const newPullRequest = new PullRequest({
        pullID: pull.id,
        number: pull.number,
        title: pull.title,
        user: pull.user['html_url'],
        createdAt: pull.created_at,
        closedAt: pull.closed_at,
        labels: pull.labels,
      });
      await newPullRequest.save();
    }
  }
}

module.exports = app;
