const express = require('express');
const cors = require('cors');
const { Octokit } = require('@octokit/core');

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

app.get('/repo', async (req, res) => {
  try {
    //change repo
    const response = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
      owner: 'noavrd',
      repo: 'url-shortner',
    });

    res.send(response);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
