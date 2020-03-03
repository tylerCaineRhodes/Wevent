import React from 'react';

const TimeOfDay = ({
  handleFilterToDChange,
  filterToDValue,
}) => (
  <div>
    <form>
      <label htmlFor="timeofday">
        Time of day:
        <select value={filterToDValue} onChange={(e) => handleFilterToDChange(e.target.value)}>
          <option>Morning</option>
          <option>Afternoon</option>
          <option>Night</option>
        </select>
      </label>
    </form>
  </div>
);

export default TimeOfDay;
