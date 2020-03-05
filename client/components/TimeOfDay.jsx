import React from 'react';

const TimeOfDay = ({
  handleStateChange,
  filterToDValue,
}) => (
  <div>
    <form>
      <label htmlFor="timeofday">
        Time of day:
        <select value={filterToDValue} onChange={(e) => handleStateChange(e.target.value, 'filterToDValue')}>
          <option>Morning</option>
          <option>Afternoon</option>
          <option>Night</option>
        </select>
      </label>
    </form>
  </div>
);

export default TimeOfDay;
