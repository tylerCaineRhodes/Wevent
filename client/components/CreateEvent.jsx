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
  handleCreateEventTitleChange,
  handleCreateEventDescriptionChange,
  handleCreateEventDateChange,
  handleCreateEventTimeChange,
  handleCreateEventCostChange,
  handleCreateEventPrivateChange,
  handleCreateEventAddress1Change,
  handleCreateEventAddress2Change,
  handleCreateEventCityChange,
  handleCreateEventStateChange,
  handleCreateEventZipcodeChange,
  handleCreateEventMaxPeopleChange,
  handleCreateEventSubmit,
}) => (
  <div id="createEventDiv">
    <form id="createEventForm">
      <span>Event Title:</span>
      <input type="text" id="createEventTitle" name="Event Title" defaultValue={createEventTitle} onChange={(e) => handleCreateEventTitleChange(e.target.value)} />
      <span>Event Description:</span>
      <textarea id="createEventDescription" name="Event Description" defaultValue={createEventDescription} onChange={(e) => handleCreateEventDescriptionChange(e.target.value)} />
      <span>Event Date:</span>
      <input type="date" id="createEventDate" name="Event Date" defaultValue={moment().format('YYYY-MM-DD')} onChange={(e) => handleCreateEventDateChange(e.target.value)} />
      <span>Event Time:</span>
      <input type="time" id="createEventTime" name="Event Time" defaultValue={moment().format('hh:mm')} onChange={(e) => handleCreateEventTimeChange(e.target.value)} />
      <span>Event Cost:</span>
      <Slider id="createEventCost" name="Event Cost" valueLabelDisplay="auto" aria-labelledby="range-slider" value={createEventCost} onChange={(e, v) => handleCreateEventCostChange(v)} />
      <span>Event Private?</span>
      <Switch id="createEventPrivate" name="Event Private" size="medium" label="Private" checked={createEventPrivate} onChange={(e, v) => handleCreateEventPrivateChange(v)} />
      <span>Event Address 1:</span>
      <input type="text" id="createEventAddress1" name="Event Address 1" defaultValue={createEventAddress1} onChange={(e) => handleCreateEventAddress1Change(e.target.value)} />
      <span>Event Address 2:</span>
      <input type="text" id="createEventAddress2" name="Event Address 2" defaultValue={createEventAddress2} onChange={(e) => handleCreateEventAddress2Change(e.target.value)} />
      <span>Event City:</span>
      <input type="text" id="createEventCity" name="Event City" defaultValue={createEventCity} onChange={(e) => handleCreateEventCityChange(e.target.value)} />
      <span>Event State:</span>
      <select id="createEventState" name="Event State" defaultValue={createEventState} onChange={(e) => handleCreateEventStateChange(e.target.value)}>
        <option>TX</option>
        <option>AZ</option>
        <option>TN</option>
        <option>NY</option>
        <option>HI</option>
        <option>MA</option>
      </select>
      <span>Event Zipcode:</span>
      <input type="number" id="createEventZipcode" name="Event Zipcode" defaultValue={createEventZipcode} onChange={(e) => handleCreateEventZipcodeChange(e.target.value)} />
      <span>Event Max People:</span>
      <Slider id="createEventMaxPeople" name="Event Max People" valueLabelDisplay="auto" aria-labelledby="range-slider" value={createEventMaxPeople} onChange={(e, v) => handleCreateEventMaxPeopleChange(v)} />
    </form>
    <button type="submit" id="createEventSubmit" name="Event Submit" onClick={(e) => handleCreateEventSubmit(e)}>Create Event</button>
  </div>
);

export default CreateEvent;
