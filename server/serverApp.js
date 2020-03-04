const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const db = require('../database/db');
const middleware = require('./middleware');

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dist')));


// connections/queries
app.get('/dashboard', (req, res) => {
  db.getAttendingEventsForDashboard(req.query.userId, (err, attending) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }
    db.getHostingEventsForDashboard(req.query.userId, (error, hostingData) => {
      if (error) {
        console.error(error);
        res.sendStatus(500);
        return;
      }
      const hosting = middleware.prettifyHostingEventsForDashboard(hostingData);
      db.getNameAndLocation(req.query.userId, (problem, nameAndLocation) => {
        if (problem) {
          console.error(problem);
          res.sendStatus(500);
          return;
        }
        res.send({ attending, hosting, nameAndLocation });
      });
    });
  });
});

app.get('/eventInfo', (req, res) => {
  req.query.userId = parseInt(req.query.userId, 10);
  console.log(req.query.userId);
  db.getEventInfoForConditionalRender(req.query.eventId, req.query.userId, (err, info) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }
    if (info[0].host_id === req.query.userId) {
      db.getEventInfoForHost(req.query.eventId, (error, infoForEvent) => {
        if (error) {
          console.error(error);
          res.sendStatus(500);
          return;
        }
        const eventInfo = middleware.prettifyHostingForEventInfo(infoForEvent);
        res.send({ access: 'host', eventInfo });
      });
    } else if (info[0].private === 0 || info[0].pending === 0) {
      db.getEventInfoForNonHost(req.query.eventId, true, (goofUp, eventInfo) => {
        if (goofUp) {
          console.error(goofUp);
          res.sendStatus(500);
          return;
        }
        res.send({ access: 'full', eventInfo });
      });
    } else {
      db.getEventInfoForNonHost(req.query.eventId, false, (quandary, eventInfo) => {
        if (quandary) {
          console.error(quandary);
          res.sendStatus(500);
          return;
        }
        res.send({ access: 'limited', eventInfo });
      });
    }
  });
});

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

app.get('/signup', (req, res) => {
  const { displayName } = req.query;
  db.signUpCheck(displayName, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

app.post('/signup', (req, res) => {
  const { displayName } = req.body;
  const { password } = req.body;
  const { city } = req.body;
  const { state } = req.body;
  db.signUpAddUser(displayName, password, city, state, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

app.post('/createEvent', (req, res) => {
  const { userId } = req.body;
  const { title } = req.body;
  const { description } = req.body;
  const { category } = req.body;
  const { date } = req.body;
  const { time } = req.body;
  const { cost } = req.body;
  const { privateEvent } = req.body;
  const { address1 } = req.body;
  const { address2 } = req.body;
  const { city } = req.body;
  const { state } = req.body;
  const { zipcode } = req.body;
  const { maxPeople } = req.body;

  db.createEvent(userId, title, description, category, date, time, cost, privateEvent, address1, address2, city, state, zipcode, maxPeople, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

app.get('/GetAllEvents', (req, res) => {
  db.getAllEvents((err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

module.exports.app = app;
module.exports.connection = db.connection;
