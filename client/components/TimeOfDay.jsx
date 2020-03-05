import React from 'react';

const TimeOfDay = ({
  handleStateChange,
  filterToDValue,
  filterEvents,
}) => (
  <div>
    <form>
      <label htmlFor="timeofday">
        <select value={filterToDValue} onChange={(e) => handleStateChange(e.target.value, 'filterToDValue', filterEvents)}>
          <option></option>
          <option>05:00-08:00</option>
          <option>08:00-11:00</option>
          <option>11:00-13:00</option>
          <option>13:00-16:00-</option>
          <option>16:00-18:00</option>
          <option>18:00-22:00</option>
          <option>22:00-02:00</option>
        </select>
      </label>
    </form>
  </div>
);

export default TimeOfDay;
