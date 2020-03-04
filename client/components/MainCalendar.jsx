import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
// import 'react-big-calendar/lib/sass/styles';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const MainCalendar = ({
  calendarEvents,
  handleCalendarEventClick,
}) => (
  <Calendar
    localizer={localizer}
    defaultDate={new Date()}
    defaultView="month"
    events={calendarEvents}
    style={{ height: '100vh' }}
    onSelectEvent={(e) => handleCalendarEventClick(e)}
    eventPropGetter={event => ({
      style: {
          backgroundColor: event.private === 0
              ? 'orange'
              : 'red',
      }
     
  })}
  
  />
);

export default MainCalendar;
