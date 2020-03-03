import React from 'react';
import './style.sass';
import axios from 'axios';

import { ThemeProvider } from 'react-bootstrap';
import LandingPage from './components/LandingPage.jsx';
import MainPage from './components/MainPage.jsx';
import Dashboard from './components/Dashboard.jsx';
import ModalReuseable from './components/ModalReuseable.jsx';
import CreateEvent from './components/CreateEvent.jsx';
import Signup from './components/Signup.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'MainPage',
      loginDisplayName: '',
      loginPassword: '',
      createEventDisplayed: false,
      signUpDisplayed: false,
      eventInfoDisplayed: false,

    };
    this.handleLoginDisplaynameChange = this.handleLoginDisplaynameChange.bind(this);
    this.handleLoginPasswordChange = this.handleLoginPasswordChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handlePageRender = this.handlePageRender.bind(this);
    this.openCreateEventModal = this.openCreateEventModal.bind(this);
    this.closeCreateEventModal = this.closeCreateEventModal.bind(this);
    this.openSignUpModal = this.openSignUpModal.bind(this);
    this.closeSignUpModal = this.closeSignUpModal.bind(this);
    this.openEventInfoModal = this.openEventInfoModal.bind(this);
    this.closeEventInfoModal = this.closeEventInfoModal.bind(this);
  }

  handlePageRender() {
    if (this.state.page === 'LandingPage') {
      return (
        <LandingPage
          loginDisplayName={this.state.loginDisplayName}
          loginPassword={this.state.loginPassword}
          handleLoginDisplaynameChange={this.handleLoginDisplaynameChange}
          handleLoginPasswordChange={this.handleLoginPasswordChange}
          handleLoginSubmit={this.handleLoginSubmit}
          openSignUpModal={this.openSignUpModal}
          closeSignUpModal={this.closeSignUpModal}

        />
      );
    }
    if (this.state.page === 'MainPage') {
      return (
        <MainPage openCreateEventModal={this.openCreateEventModal} />
      );
    }
    if (this.state.page === 'Dashboard') {
      return (
        <Dashboard openCreateEventModal={this.openCreateEventModal} />
      );
    }
  }

  openCreateEventModal() {
    this.setState({
      createEventDisplayed: true,
    });
  }

  closeCreateEventModal() {
    this.setState({
      createEventDisplayed: false,
    });
  }

  openSignUpModal() {
    this.setState({
      signUpDisplayed: true,
    });
  }

  closeSignUpModal() {
    this.setState({
      signUpDisplayed: false,
    });
  }

  openEventInfoModal() {
    this.setState({
      EventInfoDisplayed: true,
    });
  }

  closeEventInfoModal() {
    this.setState({
      EventInfoDisplayed: false,
    });
  }

  handleLoginDisplaynameChange(newValue) {
    this.setState({ loginDisplayName: newValue });
  }

  handleLoginPasswordChange(newValue) {
    this.setState({ loginPassword: newValue });
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    this.setState({ loginDisplayName: '', loginPassword: '' });
    // DO ALL THE API CALLS TO VERIFY USER THEN SET PAGE STATE TO PAGE OR WHATEVER
  }

  render() {
    return (
      <>
        {this.handlePageRender()}
        {(this.state.page === 'MainPage' || this.state.page === 'Dashboard')
        && (
        <ModalReuseable
          body={<CreateEvent />}
          title="Create Event"
          handleShow={this.openCreateEventModal}
          handleClose={this.closeCreateEventModal}
          show={this.state.createEventDisplayed}
        />
        <ModalReuseable
          body={<EventInfo />}
          title="Event Info"
          handleShow={this.openEventInfoModal}
          handleClose={this.closeEventInfoModal}
          show={this.state.eventInfoDisplayed}
        />
        )}
        {this.state.page === 'LandingPage'
        && (
        <ModalReuseable
          body={<Signup />}
          title="Sign Up!"
          handleShow={this.openSignUpModal}
          handleClose={this.closeSignUpModal}
          show={this.state.signUpDisplayed}
        />
        )}

      </>
    );
  }
}

export default App;
