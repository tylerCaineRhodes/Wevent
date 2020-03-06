import React from 'react';
import moment from 'moment';
import { Slider, Switch } from '@material-ui/core';

const CreateEvent = ({
  handleStateChange,
  createEventTitle,
  createEventDescription,
  createEventCategory,
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
  handleCreateEventSubmit,
}) => (
  <div id="createEventDiv">
    <form id="createEventForm">
      <span>Event Title:</span>
      <input required type="text" id="createEventTitle" name="Event Title" defaultValue={createEventTitle} onChange={(e) => handleStateChange(e.target.value, 'createEventTitle')} />
      <span>Event Category:</span>
      <select required id="createEventCategory" name="Event Category" defaultValue={createEventCategory} onChange={(e) => handleStateChange(e.target.value, 'createEventCategory')}>
        <option>  </option>
        <option>TX</option>
        <option>AZ</option>
        <option>TN</option>
        <option>HI</option>
        <option>NY</option>
        <option>HI</option>
        <option>MA</option>
      </select>
      <span>Event Date:</span>
      <input required type="date" id="createEventDate" name="Event Date" defaultValue={moment().format('YYYY-MM-DD')} onChange={(e) => handleStateChange(e.target.value, 'createEventDate')} />
      <span>Event Time:</span>
      <input required type="time" id="createEventTime" name="Event Time" defaultValue={moment().format('hh:mm')} onChange={(e) => handleStateChange(e.target.value, 'createEventTime')} />
      <span>Event Cost:</span>
      <Slider id="createEventCost" name="Event Cost" valueLabelDisplay="auto" aria-labelledby="range-slider" value={createEventCost} onChange={(e, v) => handleStateChange(v, 'createEventCost')} />
      <span>Event Private?</span>
      <Switch id="createEventPrivate" name="Event Private" size="medium" label="Private" checked={createEventPrivate} onChange={(e, v) => handleStateChange(v, 'createEventPrivate')} />
      <span>Event Address 1:</span>
      <input required type="text" id="createEventAddress1" name="Event Address 1" defaultValue={createEventAddress1} onChange={(e) => handleStateChange(e.target.value, 'createEventAddress1')} />
      <span>Event Address 2:</span>
      <input required type="text" id="createEventAddress2" name="Event Address 2" defaultValue={createEventAddress2} onChange={(e) => handleStateChange(e.target.value, 'createEventAddress2')} />
      <span>Event City:</span>
      <input required type="text" id="createEventCity" name="Event City" defaultValue={createEventCity} onChange={(e) => handleStateChange(e.target.value, 'createEventCity')} />
      <span>Event State:</span>
      <select required id="createEventState" name="Event State" defaultValue={createEventState} onChange={(e) => handleStateChange(e.target.value, 'createEventState')}>
        <option>TX</option>
        <option>AZ</option>
        <option>TN</option>
        <option>NY</option>
        <option>HI</option>
        <option>MA</option>
      </select>
      <span>Event Zipcode:</span>
      <input required type="number" id="createEventZipcode" name="Event Zipcode" defaultValue={createEventZipcode} onChange={(e) => handleStateChange(e.target.value, 'createEventZipcode')} />
      <span>Event Max People:</span>
      <Slider id="createEventMaxPeople" name="Event Max People" valueLabelDisplay="auto" aria-labelledby="range-slider" value={createEventMaxPeople} onChange={(e, v) => handleStateChange(v, 'createEventMaxPeople')} />
      <span>Event Description:</span>
      <textarea required id="createEventDescription" name="Event Description" defaultValue={createEventDescription} onChange={(e) => handleStateChange(e.target.value, 'createEventDescription')} />
    </form>
    <button type="submit" id="createEventSubmit" name="Event Submit" onClick={(e) => handleCreateEventSubmit(e)} style={{ backgroundColor: 'orange', color: 'white' }}>Create Event</button>
  </div>
);

export default CreateEvent;
