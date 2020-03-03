const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Password',
  database: 'Wevent',
});

// check db connection

db.connect(() => {
  console.log('connected to db');
});

// query functions

const loginCheck = (id, pass, callback) => {
  //console.log(id, pass);
  // eslint-disable-next-line sql/no-unsafe-query
  db.query(`select user_id from users where display_name = '${id}' and password_hash = '${pass}';`, (err, results) => {
    //console.log(err, results);
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  loginCheck,
};
