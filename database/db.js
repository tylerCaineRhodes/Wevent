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
  const query = 'SELECT e.event_id, e.title, u_e.pending FROM events AS e LEFT JOIN users_events_attending AS u_e ON e.event_id = u_e.event_id WHERE e.host_id = ?';
  db.query(query, [hostId], (err, data) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, data);
  });
};

module.exports.getAttendingEventsForDashboard = (userId, cb) => {
  const query = 'SELECT e.event_id, e.title, u_e.pending FROM events AS e INNER JOIN users_events_attending AS u_e ON e.event_id = u_e.event_id WHERE u_e.user_id = ?';
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
  const query = 'select e.title, e.description, e.date, e.time, e.price, e.private, e.address_1, e.address_2, e.zipcode, e.city, e.state, e.attendance_max, e.attendance_current, u_e.pending, u.display_name from events AS e LEFT JOIN users_events_attending AS u_e ON e.event_id = u_e.event_id LEFT JOIN users AS u ON u_e.user_id = u.user_id WHERE e.event_id = ?';
  db.query(query, [eventId], (err, data) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, data);
  });
};

module.exports.getEventInfoForNonHost = (eventId, userId, hasAccess, cb) => {
  if (hasAccess) {
    const query = 'select e.title, e.description, e.date, e.time, e.price, e.private, e.address_1, e.address_2, e.zipcode, e.city, e.state, e.attendance_max, e.attendance_current, e.host_id, (SELECT pending from users_events_attending where event_id = ? and user_id = ? LIMIT 1) AS pending from events e where event_id = ?';
    db.query(query, [eventId, userId, eventId], (err, data) => {
      if (err) {
        cb(err);
        return;
      }
      cb(null, data);
    });
  } else {
    const query = 'select e.title, e.description, e.date, e.time, e.price, e.private, e.city, e.state, e.attendance_max, e.attendance_current, e.host_id, (SELECT pending from users_events_attending where event_id = ? and user_id = ? LIMIT 1) AS pending from events e where event_id = ?';
    db.query(query, [eventId, userId, eventId], (err, data) => {
      if (err) {
        cb(err);
        return;
      }
      cb(null, data);
    });
  }
};

// select e.title, e.description, e.date, e.time, e.price, e.private, e.address_1, e.address_2, e.zipcode, e.city, e.state, group_concat(u.display_name ORDER BY u_e.pending asc separator ","), e.attendance_max, e.attendance_current, u_e.pending from events AS e LEFT JOIN users_events_attending AS u_e ON e.event_id = u_e.event_id INNER JOIN users AS u ON u_e.user_id = u.user_id WHERE e.event_id = 1 group by u_e.pending;

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
  // eslint-disable-next-line sql/no-unsafe-query
  const query = 'Select e.event_id, e.host_id, e.title, e.description, e.date, e.time, e.price, e.private, e.attendance_max, e.attendance_current, e.city, e.state, group_concat(ec.category_id order by category_id asc separator ",") as category_ids from events e inner join events_categories ec on e.event_id = ec.event_id where e.attendance_max != attendance_current or e.attendance_max is null group by e.event_id;';

  db.query(query, (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};

// Incomplete query to get all state
module.exports.getAllStates = (callback) => {
  // eslint-disable-next-line sql/no-unsafe-query
  const query = 'SELECT * from states order by state_id;';
  db.query(query, (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};

module.exports.getCategories = (callback) => {
  const query = 'Select * from categories order by category_id;';

  db.query(query, (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};

module.exports.askToJoinEvent = (userId, eventId, callback) => {
  const query = 'INSERT INTO users_events_attending(user_id, event_id, pending) VALUES (?, ?, 1)';
  db.query(query, [userId, eventId], (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};

module.exports.approvePending = (displayName, eventId, callback) => {
  const query = 'SELECT user_id from users WHERE display_name = ?';
  db.query(query, [displayName], (err, results) => {
    if (err) {
      callback(err);
    }
    console.log('RESULTS', results[0].user_id);
    const innerQuery = 'UPDATE users_events_attending SET pending = 0 WHERE event_id = ? AND user_id = ?';
    db.query(innerQuery, [eventId, results[0].user_id], (error, findings) => {
      if (error) {
        callback(error);
      } else {
        callback(null, findings);
      }
    });
  });
};

module.exports.rejectPending = (displayName, eventId, callback) => {
  const query = 'SELECT user_id from users WHERE display_name = ?';
  db.query(query, [displayName], (err, results) => {
    if (err) {
      callback(err);
    } else {
      const innerQuery = 'DELETE FROM users_events_attending WHERE event_id = ? AND user_id = ?';
      db.query(innerQuery, [eventId, results[0].user_id], (predicament, answers) => {
        if (predicament) {
          callback(predicament);
        } else {
          callback(null, answers);
        }
      });
    }
  });
};

module.exports.getPendingForTesting = (userId, eventId, callback) => {
  const query = 'SELECT * from users_events_attending WHERE event_id = ? AND user_id = ?';
  db.query(query, [userId, eventId], (err, results) => {
    if (err) {
      callback(err);
    }
    callback(null, results);
  });
};

module.exports.connection = db;
