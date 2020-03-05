const request = require('supertest');
// const { app, connection } = require('../serverApp');


// afterAll((done) => {
//   connection.end();
//   done();
// });

// test('adds 1 + 2 to equal 3', () => {
//   expect(1 + 2).toBe(3);
// });

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
//       expect(response.body.hosting[0].title).toBe('Incredible Granite Ball', done);
//       done();
//     });
//   });
//   test('it should tell a user which events they are attending', (done) => {
//     request(app).get('/dashboard').query({ userId: 8 }).then((response) => {
//       expect(response.body.attending.length).toBe(4);
//       expect(response.body.attending[3].title).toBe('Small Frozen Pants', done);
//       done();
//     });
//   });
//   test('it should tell a user which of the events they are hosting have pending requests, and how many requests are pending', (done) => {
//     request(app).get('/dashboard').query({ userId: 8 }).then((response) => {
//       expect(response.body.hosting[0].pending).toBe(1);
//       done();
//     });
//   });
//   test('it should tell a user which of the events they are attending are still pending approval', (done) => {
//     request(app).get('/dashboard').query({ userId: 11 }).then((response) => {
//       expect(response.body.attending[1].pending).toBe(1);
//       done();
//     });
//   });
// });

// describe('Test the delete event path', () => {
//   test('Deleting a non-existent event should not create an error', (done) => {
//     request(app).delete('/event').query({eventId:123456}).then((response) => {
//       expect(response.statusCode).toBe(200);
//       done();
//     });
//   });
//   test('A deleted event should no longer exist', (done) => {
//     request(app).delete('/event').query({eventId:4}).then((response) => {
//       expect(response.statusCode).toBe(200);
//       request(app).get('/eventInfo').query({eventId:4, userId:7}).then((response) => {
//         expect(response.statusCode).toBe(500);
//         done();
//       });
//     });
//   });
// });

// describe('Test the pending event path', () => {
//   test('Requesting to join an event should change that event to pending', (done) => {
//     request(app).post('/pending').send({ eventId: 1, userId: 13 }).then((response) => {
//       expect(response.statusCode).toBe(200);
//       request(app).get('/pending').query({ eventId: 1, userId: 13 }).then((response) => {
//         console.log('RESPONSE',response.body);
//         expect(response.body.pending).toBe(1);
//         done();
//       });
//     });
//   });
  // test('Accepting a pending request should change it to accepted', (done) => {
  //   request(app).post('/pending').send({ eventId: 1, userId: 12 }).then((response) => {
  //     expect(response.statusCode).toBe(200);
  //     request(app).get('/eventInfo').query({ eventId: 1, userId: 12 }).then((response) => {
  //       console.log(response.body);
  //       expect(response.body.eventInfo[0].pending).toBe(0);
  //       done();
  //     });
  //   });
  // });
});
