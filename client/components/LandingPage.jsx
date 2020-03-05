import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Title from './Title.jsx';

const LandingPage = ({
  loginDisplayName,
  loginPassword,
  handleLoginSubmit,
  openSignUpModal,
  closeSignUpModal,
  handleGuestSubmit,
  handleStateChange,
}) => (
  <div className="landingPage">
    <Title buttonText="signup" buttonClass="createNewEvent-button" onClick={openSignUpModal} />
    <Form className="login">
      <Form.Group controlId="Username">
        {/* <Form.Label>Welcome to Wevent</Form.Label> */}
        <Form.Control type="username" placeholder="Enter Username" value={loginDisplayName} onChange={(e) => handleStateChange(e.target.value, 'loginDisplayName')} />
      </Form.Group>

      <Form.Group controlId="Password">
        <Form.Control type="password" placeholder="Enter Password" value={loginPassword} onChange={(e) => handleStateChange(e.target.value, 'loginPassword')} />
      </Form.Group>
      <Button variant="primary" type="submit" className="loginButton" onClick={handleLoginSubmit}>
        Login
      </Button>
    </Form>
    <div>
      <span>
        <div id="splashnoaccount">Dont have an account?</div>
        <Button variant="primary" type="submit" id="guestButton" onClick={(e) => handleGuestSubmit(e)}>
          Guest
        </Button>
      </span>
    </div>
  </div>
);

export default LandingPage;
