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
    eventPropGetter={(event) => ({
      style: {
        backgroundColor: event.private === 0
          ? 'rgba(138, 71, 228, 0.4)'
          : 'rgba(11, 173, 135, 0.4)',
        color: 'white',
      },
    })}

  />
);

export default MainCalendar;
