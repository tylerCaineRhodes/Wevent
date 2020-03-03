import React from 'react';
import Cost from './Cost.jsx';
import PrivateOrPublic from './PrivateOrPublic.jsx';
import NumberOfPeople from './NumberOfPeople.jsx';

const CreateEvent = (props) => (
  <div id="createEvent">
    <form>
      <input type="text" id="createEventTitle" name="Event Title" />
      <input type="text" id="createEventAddress1" name="Address 1" />
      <input type="text" id="createEventAddress2" name="Address 2" />
      <input type="text" id="createEventCity" name="City" />
      <input type="text" id="createEventState" name="State" />
      <input type="text" id="createEventZip" name="Zipcode" />
      <input type="text" id="createEventTime" name="Time" />
    </form>
    <Cost />
    <PrivateOrPublic />
    <NumberOfPeople />
    <button type="submit">Create Event</button>
  </div>
);

export default CreateEvent;
