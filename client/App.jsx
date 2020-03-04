import React from 'react';
import './style.sass';
import axios from 'axios';
import moment from 'moment';

import { ThemeProvider } from 'react-bootstrap';
import LandingPage from './components/LandingPage.jsx';
import MainPage from './components/MainPage.jsx';
import Dashboard from './components/Dashboard.jsx';
import ModalReuseable from './components/ModalReuseable.jsx';
import CreateEvent from './components/CreateEvent.jsx';
import Signup from './components/Signup.jsx';
import EventInfo from './components/EventInfo.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'MainPage',
      userId: '',
      calendarEvents: [
      ],
      loginDisplayName: '',
      loginPassword: '',

      createEventDisplayed: false,
      signUpDisplayed: false,
      eventInfoDisplayed: false,


      filterCityValue: '',
      filterStateValue: '',
      filterCategoryValue: '',
      filterNumOfPeopleValues: [0, 10],
      filterCostValue: 0,
      filterPublicValue: false,
      filterPrivateValue: false,
      filterToDValue: '',

      createEventTitle: '',
      createEventDescription: '',
      createEventDate: moment().format('YYYY-MM-DD'),
      createEventTime: moment().format('hh:mm'),
      createEventCost: 0,
      createEventPrivate: false,
      createEventAddress1: '',
      createEventAddress2: '',
      createEventCity: '',
      createEventState: '',
      createEventZipcode: 0,
      createEventMaxPeople: 50,
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
    this.handleFilterCityChange = this.handleFilterCityChange.bind(this);
    this.handleFilterStateChange = this.handleFilterStateChange.bind(this);
    this.handleFilterCategoryChange = this.handleFilterCategoryChange.bind(this);
    this.handleFilterNumOfPeopleChange = this.handleFilterNumOfPeopleChange.bind(this);
    this.handleFilterCostChange = this.handleFilterCostChange.bind(this);
    this.handleFilterPublicChange = this.handleFilterPublicChange.bind(this);
    this.handleFilterPrivateChange = this.handleFilterPrivateChange.bind(this);
    this.handleFilterToDChange = this.handleFilterToDChange.bind(this);
    this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
    this.handleCalendarEventClick = this.handleCalendarEventClick.bind(this);
    this.handleCreateEventTitleChange = this.handleCreateEventTitleChange.bind(this);
    this.handleCreateEventDescriptionChange = this.handleCreateEventDescriptionChange.bind(this);
    this.handleCreateEventDateChange = this.handleCreateEventDateChange.bind(this);
    this.handleCreateEventTimeChange = this.handleCreateEventTimeChange.bind(this);
    this.handleCreateEventCostChange = this.handleCreateEventCostChange.bind(this);
    this.handleCreateEventPrivateChange = this.handleCreateEventPrivateChange.bind(this);
    this.handleCreateEventAddress1Change = this.handleCreateEventAddress1Change.bind(this);
    this.handleCreateEventAddress2Change = this.handleCreateEventAddress2Change.bind(this);
    this.handleCreateEventCityChange = this.handleCreateEventCityChange.bind(this);
    this.handleCreateEventStateChange = this.handleCreateEventStateChange.bind(this);
    this.handleCreateEventZipcodeChange = this.handleCreateEventZipcodeChange.bind(this);
    this.handleCreateEventMaxPeopleChange = this.handleCreateEventMaxPeopleChange.bind(this);
    this.handleCreateEventSubmit = this.handleCreateEventSubmit.bind(this);
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
        <MainPage
          calendarEvents={this.state.calendarEvents}
          handleCalendarEventClick={this.handleCalendarEventClick}

          handleFilterCityChange={this.handleFilterCityChange}
          filterCityValue={this.state.filterCityValue}
          handleFilterStateChange={this.handleFilterStateChange}
          filterStateValue={this.state.filterStateValue}
          handleFilterCategoryChange={this.handleFilterCategoryChange}
          filterCategoryValue={this.state.filterCategoryValue}
          handleFilterNumOfPeopleChange={this.handleFilterNumOfPeopleChange}
          filterNumOfPeopleValues={this.state.filterNumOfPeopleValues}
          handleFilterCostChange={this.handleFilterCostChange}
          filterCostValue={this.state.filterCostValue}
          handleFilterPublicChange={this.handleFilterPublicChange}
          filterPublicValue={this.state.filterPublicValue}
          handleFilterPrivateChange={this.handleFilterPrivateChange}
          filterPrivateValue={this.state.filterPrivateValue}
          handleFilterToDChange={this.handleFilterToDChange}
          filterToDValue={this.state.filterToDValue}
          handleFilterSubmit={this.handleFilterSubmit}

          openCreateEventModal={this.openCreateEventModal}
        />
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
      eventInfoDisplayed: true,
    });
  }

  closeEventInfoModal() {
    this.setState({
      eventInfoDisplayed: false,
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
    axios.get('/login', {
      params: {
        id: this.state.loginDisplayName,
        pass: this.state.loginPassword,
      },
    })
      .then((res) => {
        if (!res.data[0]) {
          // eslint-disable-next-line no-alert
          alert('Incorrect Login Information');
          this.setState({
            loginDisplayName: '',
            loginPassword: '',
          });
        } else {
          this.setState({
            userId: res.data[0].user_id,
            loginPassword: '',
            page: 'MainPage',
          }, () => {
            console.log(this.state.userId);
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
    // DO ALL THE API CALLS TO VERIFY USER THEN SET PAGE STATE TO PAGE OR WHATEVER
  }

  handleFilterCityChange(newValue) {
    this.setState({ filterCityValue: newValue });
  }

  handleFilterStateChange(newValue) {
    this.setState({ filterStateValue: newValue });
  }

  handleFilterCategoryChange(newValue) {
    this.setState({ filterCategoryValue: newValue });
  }

  handleFilterNumOfPeopleChange(newValue) {
    this.setState({ filterNumOfPeopleValues: newValue });
  }

  handleFilterCostChange(newValue) {
    this.setState({ filterCostValue: newValue });
  }

  handleFilterPublicChange(newValue) {
    this.setState({ filterPublicValue: newValue });
  }

  handleFilterPrivateChange(newValue) {
    this.setState({ filterPrivateValue: newValue });
  }

  handleFilterToDChange(newValue) {
    this.setState({ filterToDValue: newValue });
  }

  handleFilterSubmit() {
    console.log('DO ALL THE THINGS TO THE FILTER STATES. Sample filter state:', this.state.filterCityValue);
  }

  handleCalendarEventClick(event) {
    console.log('POOP :)', event, this.state.calendarEvents);
  }

  handleCreateEventTitleChange(newValue) {
    this.setState({ createEventTitle: newValue });
  }

  handleCreateEventDescriptionChange(newValue) {
    this.setState({ createEventDescription: newValue });
  }

  handleCreateEventDateChange(newValue) {
    this.setState({ createEventDate: newValue });
  }

  handleCreateEventTimeChange(newValue) {
    this.setState({ createEventTime: newValue });
  }

  handleCreateEventCostChange(newValue) {
    this.setState({ createEventCost: newValue });
  }

  handleCreateEventPrivateChange(newValue) {
    this.setState({ createEventPrivate: newValue });
  }

  handleCreateEventAddress1Change(newValue) {
    this.setState({ createEventAddress1: newValue });
  }

  handleCreateEventAddress2Change(newValue) {
    this.setState({ createEventAddress2: newValue });
  }

  handleCreateEventCityChange(newValue) {
    this.setState({ createEventCity: newValue });
  }

  handleCreateEventStateChange(newValue) {
    this.setState({ createEventState: newValue });
  }

  handleCreateEventZipcodeChange(newValue) {
    this.setState({ createEventZipcode: newValue });
  }

  handleCreateEventMaxPeopleChange(newValue) {
    this.setState({ createEventMaxPeople: newValue });
  }

  handleCreateEventSubmit(event) {
    console.log('POOP :)', event, this.state.createEventTitle);
  }

  render() {
    return (
      <>
        {this.handlePageRender()}
        {(this.state.page === 'MainPage' || this.state.page === 'Dashboard')
        && (
          <>
            <ModalReuseable
              body={(
                <CreateEvent
                  createEventTitle={this.state.createEventTitle}
                  createEventDescription={this.state.createEventDescription}
                  createEventDate={this.state.createEventDate}
                  createEventTime={this.state.createEventTime}
                  createEventCost={this.state.createEventCost}
                  createEventPrivate={this.state.createEventPrivate}
                  createEventAddress1={this.state.createEventAddress1}
                  createEventAddress2={this.state.createEventAddress2}
                  createEventCity={this.state.createEventCity}
                  createEventState={this.state.createEventState}
                  createEventZipcode={this.state.createEventZipcode}
                  createEventMaxPeople={this.state.createEventMaxPeople}
                  handleCreateEventTitleChange={this.handleCreateEventTitleChange}
                  handleCreateEventDescriptionChange={this.handleCreateEventDescriptionChange}
                  handleCreateEventDateChange={this.handleCreateEventDateChange}
                  handleCreateEventTimeChange={this.handleCreateEventTimeChange}
                  handleCreateEventCostChange={this.handleCreateEventCostChange}
                  handleCreateEventPrivateChange={this.handleCreateEventPrivateChange}
                  handleCreateEventAddress1Change={this.handleCreateEventAddress1Change}
                  handleCreateEventAddress2Change={this.handleCreateEventAddress2Change}
                  handleCreateEventCityChange={this.handleCreateEventCityChange}
                  handleCreateEventStateChange={this.handleCreateEventStateChange}
                  handleCreateEventZipcodeChange={this.handleCreateEventZipcodeChange}
                  handleCreateEventMaxPeopleChange={this.handleCreateEventMaxPeopleChange}
                  handleCreateEventSubmit={this.handleCreateEventSubmit}
                />
              )}
              title="Create Event"
              handleShow={this.openCreateEventModal}
              handleClose={this.closeCreateEventModal}
              show={this.state.createEventDisplayed}
            />

            <button className="event-info-button" type="submit" onClick={this.openEventInfoModal}>See eventInfo</button>

            <ModalReuseable
              body={<EventInfo />}
              title="Event Info"
              handleShow={this.openEventInfoModal}
              handleClose={this.closeEventInfoModal}
              show={this.state.eventInfoDisplayed}
            />
          </>
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
