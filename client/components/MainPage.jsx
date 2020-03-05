import React from 'react';
import Title from './Title.jsx';
import Filter from './Filter.jsx';
import MainCalendar from './MainCalendar.jsx';

const MainPage = ({
  handleStateChange,
  calendarEvents,
  handleCalendarEventClick,
  openCreateEventModal,
  filterCityValue,
  filterStateValue,
  filterCategoryValue,
  filterNumOfPeopleValues,
  filterCostValue,
  filterPublicValue,
  filterPrivateValue,
  filterToDValue,
  handleFilterSubmit,
  filterDropdownCategories,
  changePage,
  loginDisplayName,
}) => (
  <>
    <Title buttonText="Create New Event" buttonClass="createNewEvent-button" onClick={openCreateEventModal} changePage={changePage} page="MainPage" />
    <div style={{ width: '33%', display: 'inline-block' }}>
      <Filter
        loginDisplayName={loginDisplayName}
        handleStateChange={handleStateChange}
        filterCityValue={filterCityValue}
        filterStateValue={filterStateValue}
        filterCategoryValue={filterCategoryValue}
        filterNumOfPeopleValues={filterNumOfPeopleValues}
        filterCostValue={filterCostValue}
        filterPublicValue={filterPublicValue}
        filterPrivateValue={filterPrivateValue}
        filterToDValue={filterToDValue}
        handleFilterSubmit={handleFilterSubmit}
        filterDropdownCategories={filterDropdownCategories}
      />
    </div>
    <div style={{ width: '66%', float: 'right' }}>
      <MainCalendar
        calendarEvents={calendarEvents}
        handleCalendarEventClick={handleCalendarEventClick}
      />
    </div>
  </>
);

export default MainPage;
