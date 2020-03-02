import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const LandingPage = () => (
  <div className="landingPage">
    <div>
      <h3>Wevent</h3>
    </div>
    <Form className="login">
      <Form.Group controlId="Username">
        {/* <Form.Label>Welcome to Wevent</Form.Label> */}
        <Form.Control type="username" placeholder="Enter Username" />
      </Form.Group>

      <Form.Group controlId="Password">
        <Form.Control type="password" placeholder="Enter Password" />
      </Form.Group>
      <Button variant="primary" type="submit" className="loginButton">
        Login
      </Button>
    </Form>
    <div>
      <span>
        <h6>Dont have an account?</h6>
      </span>
    </div>
  </div>
);

export default LandingPage;
