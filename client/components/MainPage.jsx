import React from 'react';
import Title from './Title.jsx';
import Filter from './Filter.jsx';
import MainCalendar from './MainCalendar.jsx';

const MainPage = ({
  calendarEvents,
  handleCalendarEventClick,
  openCreateEventModal,
  handleFilterCityChange,
  filterCityValue,
  handleFilterStateChange,
  filterStateValue,
  handleFilterCategoryChange,
  filterCategoryValue,
  handleFilterNumOfPeopleChange,
  filterNumOfPeopleValues,
  handleFilterCostChange,
  filterCostValue,
  handleFilterPublicChange,
  filterPublicValue,
  handleFilterPrivateChange,
  filterPrivateValue,
  handleFilterToDChange,
  filterToDValue,
  handleFilterSubmit,
  filterDropdownCategories
}) => (
  <>
    <Title buttonText="Create New Event" buttonClass="createNewEvent-button" onClick={openCreateEventModal} />
    <div style={{ width: '33%', display: 'inline-block' }}>
      <Filter
        handleFilterCityChange={handleFilterCityChange}
        filterCityValue={filterCityValue}
        handleFilterStateChange={handleFilterStateChange}
        filterStateValue={filterStateValue}
        handleFilterCategoryChange={handleFilterCategoryChange}
        filterCategoryValue={filterCategoryValue}
        handleFilterNumOfPeopleChange={handleFilterNumOfPeopleChange}
        filterNumOfPeopleValues={filterNumOfPeopleValues}
        handleFilterCostChange={handleFilterCostChange}
        filterCostValue={filterCostValue}
        handleFilterPublicChange={handleFilterPublicChange}
        filterPublicValue={filterPublicValue}
        handleFilterPrivateChange={handleFilterPrivateChange}
        filterPrivateValue={filterPrivateValue}
        handleFilterToDChange={handleFilterToDChange}
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
