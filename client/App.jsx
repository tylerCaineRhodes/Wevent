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
        {
          start: new Date(),
          end: new Date(),
          title: 'SAMPLE EVENT',
          eventId: 1,
        },
      ],
      filteredEvents: [],
      loginDisplayName: '',
      loginPassword: '',

      signUpDisplayName: '',
      signUpPassword: '',
      signUpCity: '',
      signUpState: '',

      createEventDisplayed: false,
      signUpDisplayed: false,
      eventInfoDisplayed: false,


      filterCityValue: '',
      filterStateValue: '',
      filterCategoryValue: '',
      filterNumOfPeopleValues: [15, 40],
      filterCostValue: 100,
      filterPublicValue: false,
      filterPrivateValue: false,
      filterToDValue: '',
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
    this.handleSignUpDisplaynameChange = this.handleSignUpDisplaynameChange.bind(this);
    this.handleSignUpPasswordChange = this.handleSignUpPasswordChange.bind(this);
    this.handleSignUpCityNameChange = this.handleSignUpCityNameChange.bind(this);
    this.handleSignUpStateNameChange = this.handleSignUpStateNameChange.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
    this.getAllEvents = this.getAllEvents.bind(this);
    this.filterEvents = this.filterEvents.bind(this);
  }

  componentDidMount() {
    this.getAllEvents();
    this.filterEvents();
  }


  getAllEvents() {
    axios.get('/GetAllEvents')
      .then((res) => {
        console.log(res.data);
        const results = [];
        for (let i = 0; i < res.data.length; i++) {
          const time = res.data[i].time.split(':');
          const momentTime = moment(res.data[i].date);
          momentTime.add(time[0], 'h')
            .add(time[1], 'm')
            .add(time[2], 's');
          // console.log(momentTime.toDate());

          results.push({
            start: momentTime.toDate(),
            end: momentTime.toDate(),
            title: res.data[i].title,
            eventId: res.data[i].event_id,
            city: res.data[i].city,
            state: res.data[i].state,
            price: res.data[i].price,
            attendance_max: res.data[i].attendance_max,
            attendance_current: res.data[i].attendance_current,
            private: res.data[i].private,
          });
        }
        this.setState({
          calendarEvents: results,
          filteredEvents: results,
        });
      })
      .catch((err) => {
        if (err) {
          console.log('didn\'t work from front');
        }
      });
  }

  filterEvents() {
    let storage = [];
    for (let i = 0; i < this.state.calendarEvents.length; i++) {
      if (this.state.calendarEvents[i].city === this.state.filterCityValue) {
        if (this.state.calendarEvents[i].state === this.state.filterStateValue) {
          if ((this.state.calendarEvents[i].attendance_current > this.state.filterNumOfPeopleValues[0]) && (this.state.calendarEvents[i].attendance_current <= this.state.filterNumOfPeopleValues[1])) {
            if (this.state.calendarEvents[i].price <= this.state.filterCostValue) {
              storage.push(this.state.calendarEvents[i]);
              //add filter for public/private
            }
          }
        }
      }
    }
    this.setState({
      filteredEvents: storage,
    }, () => {
      storage = [];
    });
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
          filterEvents={this.filterEvents}
          calendarEvents={this.state.filteredEvents}
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

  handleSignUpDisplaynameChange(newValue) {
    this.setState({ signUpDisplayName: newValue });
  }

  handleSignUpPasswordChange(newValue) {
    this.setState({ signUpPassword: newValue });
  }

  handleSignUpCityNameChange(newValue) {
    this.setState({ signUpCity: newValue });
  }

  handleSignUpStateNameChange(newValue) {
    this.setState({ signUpState: newValue });
  }

  handleSignUpSubmit(event) {
    event.preventDefault();
    const signUpData = {
      displayName: this.state.signUpDisplayName,
      password: this.state.signUpPassword,
      city: this.state.signUpCity,
      state: this.state.signUpState,
    };
    axios.get('/signup', {
      params: {
        displayName: signUpData.displayName,
      },
    })
      .then((res) => {
        if (!res.data[0]) {
          axios.post('/signup', signUpData)
            .then(() => {
              this.setState({
                signUpDisplayName: '',
                signUpPassword: '',
                signUpCity: '',
                signUpState: '',
                signUpDisplayed: false,
              }, () => {
                // eslint-disable-next-line no-alert
                alert('User Created, Login please!');
              });
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          // eslint-disable-next-line no-alert
          alert('Display Name Already Taken!');
          this.setState({
            signUpDisplayName: '',
            signUpPassword: '',
          });
        }
      })
      .catch((error) => {
        console.error(error);
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
    this.filterEvents();
  }

  handleCalendarEventClick(event) {
    console.log('POOP :)', event, this.state.calendarEvents);
  }

  render() { 
    return (
      <>
        {this.handlePageRender()}
        {(this.state.page === 'MainPage' || this.state.page === 'Dashboard')
        && (
          <>
            <ModalReuseable
              body={<CreateEvent />}
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
          body={(
            <Signup
              signUpDisplayName={this.state.signUpDisplayName}
              signUpPassword={this.state.signUpPassword}
              signUpCity={this.state.signUpCity}
              signUpState={this.state.signUpState}
              handleSignUpDisplaynameChange={this.handleSignUpDisplaynameChange}
              handleSignUpPasswordChange={this.handleSignUpPasswordChange}
              handleSignUpCityNameChange={this.handleSignUpCityNameChange}
              handleSignUpStateNameChange={this.handleSignUpStateNameChange}
              handleSignUpSubmit={this.handleSignUpSubmit}
            />
          )}
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
