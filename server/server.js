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
app.get('/dashboard', (req, res) =>{
  db.getAttendingEventsForDashboard(req.body.user_id, (err, attending) => {
    if(err){
      console.error(err);
      res.sendStatus(500);
      return;
    }
    db.getHostingEventsForDashboard(req.body.user_id, (err, hosting) => {
      if(err){
        console.error(err);
        res.sendStatus(500);
        return;
      }
      let newHosting = [];
      let newEvent = {};
      hosting.forEach((event)=>{
        if (newEvent.title !==event.title){
          if (newEvent.title){
            newHosting.push(newEvent);
            newEvent = {};
          }
          newEvent.title = event.title;
          newEvent.pending = event.pending;
        }else{
          newEvent.pending += event.pending;
        }
      })
      newHosting.push(newEvent);
      
      db.getNameAndLocation(req.body.user_id, (err, nameAndLocation) => {
        if(err){
          console.error(err);
          res.sendStatus(500);
          return;
        }
        res.send({attending, newHosting, nameAndLocation})
      })
    })
  })
})

app.get('/eventInfo', (req, res) =>{
  db.getEventInfoForConditionalRender(req.body.event_id, req.body.user_id, (err, info)=>{
    if(err){
      console.error(err);
      res.sendStatus(500);
      return;
    }
    if (info[0].host_id === req.body.user_id){
      db.getEventInfoForHost(req.body.event_id,(err, eventInfo)=>{
        if(err){
          console.error(err);
          res.sendStatus(500);
          return;
        }
        res.send({access: 'host', eventInfo});
      })
    } else if (info[0].private === 0 || info[0].pending === 0){
      db.getEventInfoForNonHost (req.body.event_id, true, (err, eventInfo) =>{
        if(err){
          console.error(err);
          res.sendStatus(500);
          return;
        }
        res.send({access: 'full', eventInfo});
      })
    } else {
      db.getEventInfoForNonHost (req.body.event_id, false, (err, eventInfo) =>{
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

app.listen(Port, () => {
  console.log(`listening on port ${Port}`);
});
