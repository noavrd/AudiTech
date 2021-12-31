const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  try {
    res.status(200).send('Main GET');
  } catch {
    res.status(500).send('Server problem');
  }
});

module.exports = app;
