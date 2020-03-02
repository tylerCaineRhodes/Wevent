import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
// import 'react-big-calendar/lib/sass/styles';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const eventsList = [
  {
    start: new Date(),
    end: new Date(),
    title: 'SAMPLE EVENT',
  },
];

export default function MainCalendar(props) {
  return (
    <Calendar
      localizer={localizer}
      defaultDate={new Date()}
      defaultView="month"
      events={eventsList}
      style={{ height: '100vh' }}
    />
  );
}
