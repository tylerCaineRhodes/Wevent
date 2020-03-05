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
      page: 'LandingPage',
      userId: '',
      calendarEvents: [],
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

      filterDropdownCategories: [],

      filterCityValue: '',
      filterStateValue: '',
      filterCategoryValue: {
        name: '',
        id: '',
      },
      filterNumOfPeopleValues: [0, 100],
      filterCostValue: 100,
      filterPublicValue: true,
      filterPrivateValue: true,
      filterToDValue: '',
      states: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA',
        'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
        'VT', 'VA', 'WA', 'WV', 'WI', 'WY'],

      eventInfoAccess: '',
      eventInfo: '',

      createEventTitle: '',
      createEventDescription: '',
      createEventCategory: '',
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
    this.handleCreateEventCategoryChange = this.handleCreateEventCategoryChange.bind(this);
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
    this.handleSignUpDisplaynameChange = this.handleSignUpDisplaynameChange.bind(this);
    this.handleSignUpPasswordChange = this.handleSignUpPasswordChange.bind(this);
    this.handleSignUpCityNameChange = this.handleSignUpCityNameChange.bind(this);
    this.handleSignUpStateNameChange = this.handleSignUpStateNameChange.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
    this.getAllEvents = this.getAllEvents.bind(this);
    this.filterEvents = this.filterEvents.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.handleGuestSubmit = this.handleGuestSubmit.bind(this);
  }

  componentDidMount() {
    this.getAllEvents();
    this.getCategories();
  }


  getAllEvents() {
    axios.get('/GetAllEvents')
      .then((res) => {
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
            category_ids: res.data[i].category_ids.split(','),
          });
        }
        this.setState({
          calendarEvents: results,
          filteredEvents: results,
        });
      })
      .then((res) => {
        this.filterEvents();
      })
      .catch((err) => {
        if (err) {
          console.log('didn\'t work from front');
        }
      });
  }

  getCategories() {
    axios.get('/getCategories')
      .then((res) => {
        this.setState({ filterDropdownCategories: res.data });
      })
      .catch((err) => {
        console.log('nope for the categories from front end', err);
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


  closeCreateEventModal() {
    this.setState({
      createEventDisplayed: false,
    });
  }

  openCreateEventModal() {
    this.setState({
      createEventDisplayed: true,
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
          handleGuestSubmit={this.handleGuestSubmit}
        />
      );
    }
    if (this.state.page === 'MainPage') {
      return (
        <MainPage
          filterEvents={this.filterEvents}
          calendarEvents={this.state.filteredEvents}
          handleCalendarEventClick={this.handleCalendarEventClick}

          loginDisplayName={this.state.loginDisplayName}

          filterDropdownCategories={this.state.filterDropdownCategories}
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

  filterEvents() {
    let storage = [];
    //if city is initial value, ignore
    for (let i = 0; i < this.state.calendarEvents.length; i++) {
      if (this.state.calendarEvents[i].city === this.state.filterCityValue || this.state.filterCityValue === '') {
        if (this.state.calendarEvents[i].state === this.state.filterStateValue || this.state.filterStateValue === '') {
          if (((this.state.calendarEvents[i].attendance_current >= this.state.filterNumOfPeopleValues[0]) && (this.state.calendarEvents[i].attendance_current <= this.state.filterNumOfPeopleValues[1])) || this.state.calendarEvents[i].attendance_current === null) {
            if (this.state.calendarEvents[i].price <= this.state.filterCostValue) {
              if (this.state.calendarEvents[i].category_ids.indexOf((this.state.filterCategoryValue.id).toString()) !== -1 || this.state.filterCategoryValue.id === '') {
                const display = moment(this.state.calendarEvents[i].start).format('hh:mm:ss');
                const timeArray = this.state.filterToDValue.split('-');
                if ((display >= timeArray[0] && display <= timeArray[1]) || (this.state.filterToDValue.length === 0)) {
                  //check and see for time of day or empty string
                  if ((this.state.calendarEvents[i].private === 1 && this.state.filterPrivateValue) && (this.state.loginDisplayName !== 'Guest')) {
                    storage.push(this.state.calendarEvents[i]);
                  }
                  if (this.state.calendarEvents[i].private === 0 && this.state.filterPublicValue) {
                    storage.push(this.state.calendarEvents[i]);
                  }
                }
              }
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

    if (signUpData.DisplayName === '' || signUpData.password === '' || signUpData.city === '' || signUpData.state === '') {
      this.setState({
        signUpDisplayName: '',
        signUpPassword: '',
        signUpCity: '',
        signUpState: '',
      }, () => {
        // eslint-disable-next-line no-alert
        alert('Please fill out all fields');
      });
    } else {
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
  }

  openEventInfoModal(eventId) {
    axios.get('/eventInfo', {
      params: {
        userId: this.state.userId,
        eventId,
      },
    })
      .then((res) => {
        console.log('Clicking Calendar - openEventInfoModal retrieving from DB');
        console.log(res.data);
        this.setState({
          eventInfoAccess: res.data.access,
          eventInfo: res.data.eventInfo[0],
          eventInfoDisplayed: true,
        });
      })
      .catch((err) => {
        if (err) {
          console.log('openEventInfoModal - Error retrieving from DB');
        }
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
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
    // DO ALL THE API CALLS TO VERIFY USER THEN SET PAGE STATE TO PAGE OR WHATEVER
  }

  handleGuestSubmit(event) {
    this.setState({
      loginDisplayName: 'Guest',
      page: 'MainPage',
    }, () => {
      this.filterEvents();
    });
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
    this.openEventInfoModal(event.eventId);
  }

  handleCreateEventTitleChange(newValue) {
    this.setState({ createEventTitle: newValue });
  }

  handleCreateEventDescriptionChange(newValue) {
    this.setState({ createEventDescription: newValue });
  }

  handleCreateEventCategoryChange(newValue) {
    this.setState({ createEventCategory: newValue });
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
    event.preventDefault();
    if (
      this.state.createEventTitle === ''
      || this.state.createEventState === ''
      || this.state.createEventDescription === ''
      || this.state.createEventCategory === ''
      || this.state.createEventDate === ''
      || this.state.createEventTime === ''
      || this.state.createEventCity === ''
      || this.state.userId === ''
    ) {
      // eslint-disable-next-line no-alert
      alert('Please fill out all fields.');
    } else {
      const createEventData = {
        userId: this.state.userId,
        title: this.state.createEventTitle,
        description: this.state.createEventDescription,
        category: this.state.createEventCategory,
        date: this.state.createEventDate,
        time: this.state.createEventTime,
        cost: this.state.createEventCost,
        privateEvent: this.state.createEventPrivate,
        address1: this.state.createEventAddress1,
        address2: this.state.createEventAddress2,
        city: this.state.createEventCity,
        state: this.state.createEventState,
        zipcode: this.state.createEventZipcode,
        maxPeople: this.state.createEventMaxPeople,
      };
      axios.post('/createEvent', createEventData)
        .then(() => {
          this.setState({
            createEventDisplayed: false,
            createEventTitle: '',
            createEventDescription: '',
            createEventCategory: '',
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
          }, () => {
            this.getAllEvents();
            // eslint-disable-next-line no-alert
            alert('Event Created!');
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
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
                  createEventCategory={this.state.createEventCategory}
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
                  handleCreateEventCategoryChange={this.handleCreateEventCategoryChange}
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
              body={(
                <EventInfo
                  eventInfoAccess={this.state.eventInfoAccess}
                  eventInfo={this.state.eventInfo}
                />
              )}
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
              states={this.state.states}
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
