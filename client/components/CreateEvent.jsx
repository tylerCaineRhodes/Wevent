import React from 'react';
import moment from 'moment';
import { Slider, Switch } from '@material-ui/core';

const CreateEvent = ({
  createEventTitle,
  createEventDescription,
  createEventDate,
  createEventTime,
  createEventCost,
  createEventPrivate,
  createEventAddress1,
  createEventAddress2,
  createEventCity,
  createEventState,
  createEventZipcode,
  createEventMaxPeople,
}) => (
  <div id="createEventDiv">
    <form id="createEventForm">
      <span>Event Title:</span>
      <input type="text" id="createEventTitle" name="Event Title" defaultValue={createEventTitle} />
      <span>Event Description:</span>
      <textarea id="createEventDescription" name="Event Description" defaultValue={createEventDescription} />
      <span>Event Date:</span>
      <input type="date" id="createEventDate" name="Event Date" defaultValue={moment().format('YYYY-MM-DD')} />
      <span>Event Time:</span>
      <input type="time" id="createEventTime" name="Event Time" defaultValue={moment().format('hh:mm')} />
      <span>Event Cost:</span>
      <Slider id="createEventCost" name="Event Cost" valueLabelDisplay="auto" aria-labelledby="range-slider" defaultValue={createEventCost} />
      <span>Event Private?</span>
      <Switch id="createEventPrivate" name="Event Private" size="medium" label="Private" defaultChecked={createEventPrivate} />
      <span>Event Address 1:</span>
      <input type="text" id="createEventAddress1" name="Event Address 1" defaultValue={createEventAddress1} />
      <span>Event Address 2:</span>
      <input type="text" id="createEventAddress2" name="Event Address 2" defaultValue={createEventAddress2} />
      <span>Event City:</span>
      <input type="text" id="createEventCity" name="Event City" defaultValue={createEventCity} />
      <span>Event State:</span>
      <select id="createEventState" name="Event State" defaultValue={createEventState}>
        <option>TX</option>
        <option>AZ</option>
        <option>TN</option>
        <option>NY</option>
        <option>HI</option>
        <option>MA</option>
      </select>
      <span>Event Zipcode:</span>
      <input type="number" id="createEventZipcode" name="Event Zipcode" defaultValue={createEventZipcode} />
      <span>Event Max People:</span>
      <Slider id="createEventMaxPeople" name="Event Max People" valueLabelDisplay="auto" aria-labelledby="range-slider" defaultValue={createEventMaxPeople} />
    </form>
    <button type="submit" id="createEventSubmit" name="Event Submit">Create Event</button>
  </div>
);

export default CreateEvent;
