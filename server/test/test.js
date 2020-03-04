const request = require('supertest');
const { app, connection } = require('../serverApp');


// afterAll((done) => {
//   connection.end();
//   done();
// });

test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});

// describe('Test the root path', () => {
//   test('It should respond to the GET method', (done) => {
//     request(app).get('/').then((response) => {
//       expect(response.statusCode).toBe(200);
//       done();
//     });
//   });
// });

// describe('Test the dashboard path', () => {
//   test('It should response the GET method', (done) => {
//     request(app).get('/dashboard').then((response) => {
//       expect(response.statusCode).toBe(200, done);
//       done();
//     });
//   });
//   test('it should tell a user which events they are hosting', (done) => {
//     request(app).get('/dashboard').query({ userId: 8 }).then((response) => {
//       console.log(response.body);
//       expect(response.body.hosting[0].title).toBe('Incredible Granite Ball', done);
//       done();
//     });
//   });
//   test('it should tell a user which events they are attending', (done) => {
//     request(app).get('/dashboard').query({ userId: 8 }).then((response) => {
//       console.log(response.body);
//       expect(response.body.attending.length).toBe(4);
//       expect(response.body.attending[3].title).toBe('Small Frozen Pants', done);
//       done();
//     });
//   });
//   test('it should tell a user which of the events they are hosting have pending requests, and how many requests are pending', (done) => {
//     request(app).get('/dashboard').query({ userId: 8 }).then((response) => {
//       console.log(response.body);
//       expect(response.body.hosting[0].pending).toBe(1);
//       done();
//     });
//   });
//   test('it should tell a user which of the events they are attending are still pending approval', (done) => {
//     request(app).get('/dashboard').query({ userId: 11 }).then((response) => {
//       console.log(response.body);
//       expect(response.body.attending[1].pending).toBe(1);
//       done();
//     });
//   });
  //events im hosting should be included under hosting
  //events im attending should be included under attending
  //pending attending events should have pending 1
  //hosting events with n pending requests should have n as pending

  // describe('Test the getInfo path', () => {
  //   test('It should response the GET method', (done) => {
  //     request(app).get('/getInfo').then((response) => {
  //       expect(response.statusCode).toBe(200);
  //       done();
  //     });
  //   });
  // });
// });
