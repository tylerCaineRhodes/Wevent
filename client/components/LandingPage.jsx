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
    <img className="landingPageImage" src="./img/LandingPage2.jpeg" />
    <span className="landingPageHeader">
      <img className="landingLogo" src="./img/LandingLogo.png" />
    </span>
    <div className="landingPageContent">
      <Form className="login">
        <Form.Group controlId="Username" className="landingPageUsernameField">
          {/* <Form.Label>Welcome to Wevent</Form.Label> */}
          <Form.Control type="username" placeholder="Enter Username" value={loginDisplayName} onChange={(e) => handleStateChange(e.target.value, 'loginDisplayName')} />
        </Form.Group>

        <Form.Group controlId="Password" className="landingPagePasswordField">
          <Form.Control type="password" placeholder="Enter Password" value={loginPassword} onChange={(e) => handleStateChange(e.target.value, 'loginPassword')} />
        </Form.Group>
        <Button variant="primary" type="submit" className="loginButton" onClick={handleLoginSubmit}>
          Log In
        </Button>
      </Form>
      <div>
        <span>
          <div id="splashnoaccount">
            <span id="noAccountText">Dont have an account?</span>
            <span id="noAccountButton" onClick={openSignUpModal}>Sign Up</span>
          </div>
        </span>
        <span id="landingPageOr">or</span>
        <span id="continueAsGuestButton" onClick={(e) => handleGuestSubmit(e)}>Continue as Guest</span>
      </div>
    </div>
  </div>
);

export default LandingPage;
