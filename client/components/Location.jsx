import React from 'react';

const Location = ({
  handleStateChange,
  filterCityValue,
  filterStateValue,
  filterEvents,
}) => (
  <form>
    <label htmlFor="city">
      City:
      <input type="text" value={filterCityValue} onChange={(e) => handleStateChange(e.target.value, 'filterCityValue', filterEvents)} />
    </label>
    <label htmlFor="state">
      State:
      <select value={filterStateValue} onChange={(e) => handleStateChange(e.target.value, 'filterStateValue', filterEvents)}>
        <option> </option>
        <option>TX</option>
        <option>AZ</option>
        <option>HI</option>
        <option>TN</option>
        <option>NY</option>
        <option>MA</option>
      </select>
    </label>
  </form>
);

export default Location;
