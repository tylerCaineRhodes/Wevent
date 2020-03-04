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
        <Form.Control onChange={(e) => handleSignUpStateNameChange(e.target.value)} as="select">
          <option>Select State</option>
          <option>AL</option>
          <option>AK</option>
          <option>AZ</option>
          <option>AR</option>
          <option>CA</option>
          <option>CO</option>
          <option>CT</option>
          <option>DE</option>
          <option>FL</option>
          <option>GA</option>
          <option>HI</option>
          <option>ID</option>
          <option>IL</option>
          <option>IN</option>
          <option>IA</option>
          <option>KS</option>
          <option>KY</option>
          <option>LA</option>
          <option>ME</option>
          <option>MD</option>
          <option>MA</option>
          <option>MI</option>
          <option>MN</option>
          <option>MS</option>
          <option>MO</option>
          <option>MT</option>
          <option>NE</option>
          <option>NV</option>
          <option>NH</option>
          <option>NJ</option>
          <option>NM</option>
          <option>NY</option>
          <option>NC</option>
          <option>ND</option>
          <option>OH</option>
          <option>OK</option>
          <option>OR</option>
          <option>PA</option>
          <option>RI</option>
          <option>SC</option>
          <option>SD</option>
          <option>TN</option>
          <option>TX</option>
          <option>UT</option>
          <option>VT</option>
          <option>VA</option>
          <option>WA</option>
          <option>WV</option>
          <option>WI</option>
          <option>WY</option>
        </Form.Control>
      </Form.Group>
    </Form>

    <Button varient="primary" type="submit" id="signupButton" onClick={handleSignUpSubmit}>
      Signup
    </Button>
  </div>
);

export default Signup;
