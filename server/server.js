const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const db = require('../database/db');

const Port = 3000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dist')));

//connections/queries
app.get('/login', (req, res) => {
  //console.log(req.query);
  const { id } = req.query;
  const { pass } = req.query;
  db.loginCheck(id, pass, (err, data) => {
    //console.log(data, err);
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

app.listen(Port, () => {
  console.log(`listening on port ${Port}`);
});
