const request = require('supertest');
const app = require('../serverApp');

test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});

describe('Test the root path', () => {
  test('It should respond to the GET method', (done) => {
    request(app).get('/').then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});

describe('Test the dashboard path', () => {
  test('It should response the GET method', (done) => {
    request(app).get('/dashboard').then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
  //events im hosting should be included under hosting
  //events im attending should be included under attending
  //pending attending events should have pending 1
  //hosting events with n pending requests should have n as pending
});

// describe('Test the getInfo path', () => {
//   test('It should response the GET method', (done) => {
//     request(app).get('/getInfo').then((response) => {
//       expect(response.statusCode).toBe(200);
//       done();
//     });
//   });
// //events im hosting
// });
