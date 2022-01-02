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
    const allPulls = await PullRequest.find({});
    res.send(allPulls);
  } catch (err) {
    res.status(500).send('Server problem');
  }
});

app.post('/repo', async (req, res) => {
  try {
    //change repo
    const response = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
      owner: 'noavrd',
      repo: 'demo-repo',
    });
    // const response = await octokit.request('GET /notifications');
    await createNewPull(response.data);
    console.log(response.data);
    res.status(200).send('Data added');
    // res.send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

async function createNewPull(allPulls) {
  //id, number, title, user (user.html_url), created_at, closed_at,labels
  for (let pull of allPulls) {
    const existsPulls = await PullRequest.findOne({
      pullID: pull.id,
    });
    console.log(existsPulls);

    if (!existsPulls) {
      console.log(pull.labels);
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
