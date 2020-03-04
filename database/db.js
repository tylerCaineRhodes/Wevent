const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.PORT,
  multipleStatements: true,
});

// check db connection
db.connect((err) => {
  if (err) {
    return console.error('error: ', err.message);
  }
  console.log('Connected to the MySQL server.');
});

//routes for dashboard
module.exports.getHostingEventsForDashboard = (hostId, cb) => {
  const query = 'SELECT e.title, u_e.pending FROM events AS e LEFT JOIN users_events_attending AS u_e ON e.event_id = u_e.event_id WHERE e.host_id = ?';
  db.query(query, [hostId], (err, data) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, data);
  });
};

module.exports.getAttendingEventsForDashboard = (userId, cb) => {
  const query = 'SELECT e.title, u_e.pending FROM events AS e INNER JOIN users_events_attending AS u_e ON e.event_id = u_e.event_id WHERE u_e.user_id = ?';
  db.query(query, [userId], (err, data) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, data);
  });
};

module.exports.getNameAndLocation = (userId, cb) => {
  const query = 'SELECT display_name, location_state, location_city FROM users WHERE user_id = ?';
  db.query(query, [userId], (err, data) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, data);
  });
};

module.exports.deleteEvent = (eventId, callback) => {
  const query = 'DELETE FROM events_categories WHERE event_id = ?;DELETE FROM users_events_attending WHERE event_id =?;DELETE FROM events WHERE event_id = ?;';
  db.query(query, [eventId, eventId, eventId], (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};

// routes for event info

module.exports.getEventInfoForConditionalRender = (eventId, userId, cb) => {
  //mysql UNION expects the same # of columns in both queries. The query for 'user_id' serves only to add a second column to the second query
  const query = 'SELECT host_id, private FROM events WHERE event_id = ? UNION SELECT pending, user_id from users_events_attending WHERE event_id = ? AND user_id = ?';
  db.query(query, [eventId, eventId, userId], (err, data) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, data);
  });
};

module.exports.getEventInfoForHost = (eventId, cb) => {
  const query = 'select e.title, e.description, e.date, e.time, e.price, e.address_1, e.address_2, e.zipcode, e.city, e.state, e.attendance_max, e.attendance_current, u_e.pending, u.display_name from events AS e LEFT JOIN users_events_attending AS u_e ON e.event_id = u_e.event_id INNER JOIN users AS u ON u_e.user_id = u.user_id WHERE e.event_id = ?';
  db.query(query, [eventId], (err, data) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, data);
  });
};

module.exports.getEventInfoForNonHost = (eventId, hasAccess, cb) => {
  if (hasAccess) {
    const query = 'select title, description, date, time, price, address_1, address_2, zipcode, city, state, attendance_max, attendance_current FROM events WHERE event_id = ?';
    db.query(query, [eventId], (err, data) => {
      if (err) {
        cb(err);
        return;
      }
      cb(null, data);
    });
  } else {
    const query = 'select title, description, date, time, price, city, state, attendance_max, attendance_current FROM events WHERE event_id = ?';
    db.query(query, [eventId], (err, data) => {
      if (err) {
        cb(err);
        return;
      }
      cb(null, data);
    });
  }
};

module.exports.loginCheck = (id, pass, callback) => {
  //console.log(id, pass);
  // eslint-disable-next-line sql/no-unsafe-query
  const query = `select user_id from users where display_name = '${id}' and password_hash = '${pass}';`;
  db.query(query, (err, results) => {
    //console.log(err, results);
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};

module.exports.signUpCheck = (displayName, callback) => {
  // eslint-disable-next-line sql/no-unsafe-query
  const query = `select * from users where display_name = '${displayName}'`;
  db.query(query, (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};

module.exports.signUpAddUser = (displayName, password, city, state, callback) => {
  // eslint-disable-next-line sql/no-unsafe-query
  const query = `INSERT INTO users (display_name, password_hash, location_state, location_city) values ('${displayName}', '${password}', '${state}', '${city}')`;
  db.query(query, (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};

module.exports.createEvent = (userId, title, description, category, date, time, cost, privateEvent, address1, address2, city, state, zipcode, maxPeople, callback) => {
  let query = '';
  if (privateEvent) {
    // eslint-disable-next-line sql/no-unsafe-query
    query = `INSERT INTO events (host_id, title, description, date, time, price, private, address_1, address_2, city, state, zipcode, attendance_max, attendance_current) values ('${userId}', '${title}', '${description}', '${date}', '${time}', ${cost}, ${privateEvent}, '${address1}', '${address2}', '${city}', '${state}', ${zipcode}, ${maxPeople}, 0)`;
  } else {
    // eslint-disable-next-line sql/no-unsafe-query
    query = `INSERT INTO events (host_id, title, description, date, time, price, private, address_1, address_2, city, state, zipcode) values ('${userId}', '${title}', '${description}', '${date}', '${time}', ${cost}, ${privateEvent}, '${address1}', '${address2}', '${city}', '${state}', ${zipcode})`;
  }

  db.query(query, (err, results) => {
    if (err) {
      callback(err);
    } else {
      // eslint-disable-next-line sql/no-unsafe-query
      const eventQuery = `SELECT event_id FROM events WHERE title = '${title}'`;
      db.query(eventQuery, (error, eventId) => {
        if (error) {
          callback(error);
        } else {
          // eslint-disable-next-line sql/no-unsafe-query
          const categoryQuery = `SELECT category_id FROM categories WHERE category_name = '${category}'`;
          db.query(categoryQuery, (er, categoryId) => {
            if (er) {
              callback(er);
            } else {
              // eslint-disable-next-line sql/no-unsafe-query
              const eventsCategoriesQuery = `INSERT INTO events_categories (event_id, category_id) values (${eventId[0].event_id}, ${categoryId[0].category_id})`;
              db.query(eventsCategoriesQuery, (finalError, finalQuery) => {
                if (finalError) {
                  callback(finalError);
                } else {
                  callback(null, finalQuery);
                }
              });
            }
          });
        }
      });
    }
  });
};

module.exports.getAllEvents = (callback) => {
  const query = 'Select event_id, title, date, time, price, private, attendance_max, attendance_current, city, state FROM events where attendance_max != attendance_current or attendance_max is null;';

  db.query(query, (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};
module.exports.connection = db;
