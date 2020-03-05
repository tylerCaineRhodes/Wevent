import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Title from './Title.jsx';

const LandingPage = ({
  loginDisplayName, loginPassword, handleLoginDisplaynameChange, handleLoginPasswordChange, handleLoginSubmit, openSignUpModal, closeSignUpModal, handleGuestSubmit,
}) => (
  <div className="landingPage">
    <Title buttonText="Continue as Guest" buttonClass="guestButton" onClick={(e) => handleGuestSubmit(e)} />
    <div className="landingPageContent">
      <Form className="login">
        <Form.Group controlId="Username" className="landingPageUsernameField">
          {/* <Form.Label>Welcome to Wevent</Form.Label> */}
          <Form.Control type="username" placeholder="Enter Username" value={loginDisplayName} onChange={(e) => handleLoginDisplaynameChange(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="Password" className="landingPagePasswordField">
          <Form.Control type="password" placeholder="Enter Password" value={loginPassword} onChange={(e) => handleLoginPasswordChange(e.target.value, 'loginPassword')} />
        </Form.Group>
        <Button variant="primary" type="submit" className="loginButton" onClick={handleLoginSubmit}>
          Login
        </Button>
      </Form>
      <div>
        <span>
          <div id="splashnoaccount">
            <span id="noAccountText">Dont have an account?</span>
            <span id="noAccountButton" onClick={openSignUpModal}>Sign Up</span>
          </div>
        </span>
      </div>
    </div>
  </div>
);

export default LandingPage;
