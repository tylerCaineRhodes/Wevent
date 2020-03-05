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
