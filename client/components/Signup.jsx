import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Signup = ({
  signUpDisplayName, signUpPassword, signUpCity, signUpState, handleSignUpDisplaynameChange, handleSignUpPasswordChange, handleSignUpCityNameChange, handleSignUpStateNameChange, handleSignUpSubmit,
}) => (
  <div id="signup">
    <Form>
      <Form.Group controlId="Username">
        <Form.Label>Display Name:</Form.Label>
        <Form.Control type="displayName" placeholder="Display Name" value={signUpDisplayName} onChange={(e) => handleSignUpDisplaynameChange(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="Password">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" placeholder="Password" value={signUpPassword} onChange={(e) => handleSignUpPasswordChange(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="City">
        <Form.Label>City:</Form.Label>
        <Form.Control type="city" placeholder="City" value={signUpCity} onChange={(e) => handleSignUpCityNameChange(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="State">
        <Form.Label>State:</Form.Label>
        <Form.Control type="state" placeholder="State" value={signUpState} onChange={(e) => handleSignUpStateNameChange(e.target.value)} />
      </Form.Group>
    </Form>
    <Button varient="primary" type="submit" id="signupButton" onClick={handleSignUpSubmit}>
      Signup
    </Button>
  </div>
);

export default Signup;
