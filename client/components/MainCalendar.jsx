import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
// import 'react-big-calendar/lib/sass/styles';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const MainCalendar = ({
  calendarEvents,
}) => (
  <Calendar
    localizer={localizer}
    defaultDate={new Date()}
    defaultView="month"
    events={calendarEvents}
    style={{ height: '100vh' }}
    onSelectEvent={(e) => console.log('POOP :)', e)}
  />
);

export default MainCalendar;
