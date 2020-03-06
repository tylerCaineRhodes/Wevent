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
      states: [],

      eventInfoAccess: '',
      eventInfo: '',
      eventId: '',

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

    this.handleStateChange = this.handleStateChange.bind(this);

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handlePageRender = this.handlePageRender.bind(this);
    this.openCreateEventModal = this.openCreateEventModal.bind(this);
    this.closeCreateEventModal = this.closeCreateEventModal.bind(this);
    this.openSignUpModal = this.openSignUpModal.bind(this);
    this.closeSignUpModal = this.closeSignUpModal.bind(this);
    this.openEventInfoModal = this.openEventInfoModal.bind(this);
    this.closeEventInfoModal = this.closeEventInfoModal.bind(this);
    this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
    this.handleCalendarEventClick = this.handleCalendarEventClick.bind(this);
    this.handleCreateEventSubmit = this.handleCreateEventSubmit.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
    this.getAllEvents = this.getAllEvents.bind(this);
    this.filterEvents = this.filterEvents.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.handleGuestSubmit = this.handleGuestSubmit.bind(this);
    this.openCreateEventModal = this.openCreateEventModal.bind(this);
    this.changePage = this.changePage.bind(this);
    this.getEventsForDashboard = this.getEventsForDashboard.bind(this);
    this.getAllStates = this.getAllStates.bind(this);
    this.handleGuestBackToLandingPage = this.handleGuestBackToLandingPage.bind(this);
    this.handleRemoveGuest = this.handleRemoveGuest.bind(this);
    this.handleAttendEvent = this.handleAttendEvent.bind(this);
    this.handleAcceptPending = this.handleAcceptPending.bind(this);
  }

  componentDidMount() {
    this.getAllEvents();
    this.getCategories();
    this.getAllStates();
  }

  getAllStates() {
    axios.get('/getallstates')
      .then((response) => {
        this.setState({
          states: response.data,
        });
      })
      .catch((err) => {
        console.log('getAllStates error', err);
      });
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

  getEventsForDashboard() {
    const { userId } = this.state;
    axios.get('/dashboard', { params: { userId } })
      .then((data) => {
        this.setState({ dashboardInfo: data.data });
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
          handleStateChange={this.handleStateChange}
          loginDisplayName={this.state.loginDisplayName}
          loginPassword={this.state.loginPassword}
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
          states={this.state.states}
          handleStateChange={this.handleStateChange}
          filterEvents={this.filterEvents}
          calendarEvents={this.state.filteredEvents}
          handleCalendarEventClick={this.handleCalendarEventClick}

          loginDisplayName={this.state.loginDisplayName}

          handleGuestBackToLandingPage={this.handleGuestBackToLandingPage}
          filterDropdownCategories={this.state.filterDropdownCategories}
          filterCityValue={this.state.filterCityValue}
          filterStateValue={this.state.filterStateValue}
          filterCategoryValue={this.state.filterCategoryValue}
          filterNumOfPeopleValues={this.state.filterNumOfPeopleValues}
          filterCostValue={this.state.filterCostValue}
          filterPublicValue={this.state.filterPublicValue}
          filterPrivateValue={this.state.filterPrivateValue}
          filterToDValue={this.state.filterToDValue}
          handleFilterSubmit={this.handleFilterSubmit}
          openCreateEventModal={this.openCreateEventModal}
          changePage={this.changePage}
        />
      );
    }
    if (this.state.page === 'Dashboard') {
      return (
        <Dashboard info={this.state.dashboardInfo} changePage={this.changePage} openEventInfoModal={this.openEventInfoModal} closeEventInfoModal={this.closeEventInfoModal} />
      );
    }
  }

  filterEvents() {
    let storage = [];
    //if city is initial value, ignore
    for (let i = 0; i < this.state.calendarEvents.length; i++) {
      if (this.state.calendarEvents[i].city.toUpperCase() === this.state.filterCityValue.toUpperCase() || this.state.filterCityValue === '') {
        if (this.state.calendarEvents[i].state === this.state.filterStateValue || this.state.filterStateValue === '' || this.state.filterStateValue === 'Select State') {
          if (((this.state.calendarEvents[i].attendance_current >= this.state.filterNumOfPeopleValues[0]) && (this.state.calendarEvents[i].attendance_current <= this.state.filterNumOfPeopleValues[1])) || this.state.calendarEvents[i].attendance_current === null) {
            if (this.state.calendarEvents[i].price <= this.state.filterCostValue) {
              if (this.state.calendarEvents[i].category_ids.indexOf((this.state.filterCategoryValue.id).toString()) !== -1 || this.state.filterCategoryValue.id === '' || this.state.filterCategoryValue.id === 0) {
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

  handleGuestBackToLandingPage() {
    this.setState({ page: 'LandingPage', loginDisplayName: '' });
  }

  changePage() {
    if (this.state.page === 'MainPage') {
      this.setState({ page: 'Dashboard' });
    } else {
      this.setState({ page: 'MainPage' });
    }
  }

  handleStateChange(newValue, stateToChange, cb) {
    const newState = {};
    newState[stateToChange] = newValue;
    this.setState(newState, cb);
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
    const params = { eventId };
    if (!this.state.userId) {
      params.userId = 0;
    } else {
      params.userId = this.state.userId;
    }
    axios.get('/eventInfo', {
      params,
    })
      .then((res) => {
<<<<<<< HEAD
        // console.log(res.data); //<-------------------------Remove
=======
        console.log(res.data);
>>>>>>> fa4311a8199342add0da0065d0659fe4bf689c92
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

  handleRemoveGuest(event) {
    let id = (event.target.id.substring(0, event.target.id.length - 1));
    let displayName = (document.getElementById(id).childNodes[0].innerHTML);
    // console.log(displayName);
    // console.log(this.state.eventId);
    axios.delete('/pending', {
      params: {
        displayName,
        eventId: this.state.eventId,
      },
    })
      .then((res) => {
        // console.log(res.data); //<-------------------------Remove
        this.openEventInfoModal(this.state.eventId);
      })
      .catch((err) => {
        if (err) {
          console.log('handleRemoveGuest - Error delete pend/attend from DB');
        }
      });
  }

  handleAttendEvent(event) {
    axios.post('/pending', {
        userId: this.state.userId,
        eventId: this.state.eventId,
    })
      .then((res) => {
        // console.log(res.data); //<-------------------------Remove
        this.openEventInfoModal(this.state.eventId);
      })
      .catch((err) => {
        if (err) {
          console.log('handleAttendEvent - Error post attending user to DB');
        }
      });
  }

  handleAcceptPending(event) {
    let id = (event.target.id.substring(0, event.target.id.length - 1));
    let displayName = (document.getElementById(id).childNodes[0].innerHTML);
    axios.put('/pending', {
        displayName,
        eventId: this.state.eventId,
    })
      .then((res) => {
        // console.log(res.data); //<-------------------------Remove
        this.openEventInfoModal(this.state.eventId);
      })
      .catch((err) => {
        if (err) {
          console.log('handleAttendPending - Error put pending user to DB');
        }
      });
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
          }, this.getEventsForDashboard);
        }
      })
      .then(() => {
        this.filterEvents();
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

  handleFilterSubmit() {
    // console.log('DO ALL THE THINGS TO THE FILTER STATES. Sample filter state:', this.state.filterCityValue);
    this.filterEvents();
  }

  handleCalendarEventClick(event) {
    this.setState({
      eventId: event.eventId,
    }, () => {
      this.openEventInfoModal(event.eventId);
    });
  }
    //console.log('POOP :)', event, this.state.calendarEvents);
    

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
            this.getEventsForDashboard();
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
                    filterDropdownCategories={this.state.filterDropdownCategories}
                    states={this.state.states}
                    handleStateChange={this.handleStateChange}
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
                    handleCreateEventSubmit={this.handleCreateEventSubmit}
                  />
                )}
               // title="Create Event"
                handleShow={this.openCreateEventModal}
                handleClose={this.closeCreateEventModal}
                show={this.state.createEventDisplayed}
              />

              <ModalReuseable
                body={(
                  <EventInfo
                    eventInfoAccess={this.state.eventInfoAccess}
                    eventInfo={this.state.eventInfo}
                    handleRemoveGuest={this.handleRemoveGuest}
                    handleAttendEvent={this.handleAttendEvent}
                    handleAcceptPending={this.handleAcceptPending}
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
                  handleStateChange={this.handleStateChange}
                  signUpDisplayName={this.state.signUpDisplayName}
                  signUpPassword={this.state.signUpPassword}
                  signUpCity={this.state.signUpCity}
                  states={this.state.states}
                  handleSignUpSubmit={this.handleSignUpSubmit}
                />
              )}
              // title="Sign Up!"
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
