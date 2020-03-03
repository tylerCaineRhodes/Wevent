const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const db = require('../database/db');
const middleware = require('./middleware')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dist')));


//connections/queries
app.get('/dashboard', (req, res) =>{
  db.getAttendingEventsForDashboard(req.query.user_id, (err, attending) => {
    if(err){
      console.error(err);
      res.sendStatus(500);
      return;
    }
    db.getHostingEventsForDashboard(req.query.user_id, (err, hosting) => {
      if(err){
        console.error(err);
        res.sendStatus(500);
        return;
      }
      hosting = middleware.prettifyHostingEventsForDashboard(hosting);
      db.getNameAndLocation(req.query.user_id, (err, nameAndLocation) => {
        if(err){
          console.error(err);
          res.sendStatus(500);
          return;
        }
        res.send({attending, hosting, nameAndLocation})
      })
    })
  })
})

app.get('/eventInfo', (req, res) =>{
  req.query.user_id = parseInt(req.query.user_id)
  db.getEventInfoForConditionalRender(req.query.event_id, req.query.user_id, (err, info)=>{
    if(err){
      console.error(err);
      res.sendStatus(500);
      return;
    }
    if (info[0].host_id === req.query.user_id){
      db.getEventInfoForHost(req.query.event_id,(err, eventInfo)=>{
        if(err){
          console.error(err);
          res.sendStatus(500);
          return;
        }
        eventInfo = middleware.prettifyHostingForEventInfo(eventInfo);
        res.send({access: 'host', eventInfo});
      })
    } else if (info[0].private === 0 || info[0].pending === 0){
      db.getEventInfoForNonHost (req.query.event_id, true, (err, eventInfo) =>{
        if(err){
          console.error(err);
          res.sendStatus(500);
          return;
        }
        res.send({access: 'full', eventInfo});
      })
    } else {
      db.getEventInfoForNonHost (req.query.event_id, false, (err, eventInfo) =>{
        if(err){
          console.error(err);
          res.sendStatus(500);
          return;
        }
        res.send({access: 'limited', eventInfo});
      })
    }
  })
})

module.exports = app;

