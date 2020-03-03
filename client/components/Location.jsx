import React from 'react';

const Location = ({
  handleFilterCityChange,
  filterCityValue,
  handleFilterStateChange,
  filterStateValue,
}) => (
  <form>
    <label htmlFor="city">
      City:
      <input type="text" value={filterCityValue} onChange={(e) => handleFilterCityChange(e.target.value)} />
    </label>
    <label htmlFor="state">
      State:
      <select value={filterStateValue} onInput={(e) => handleFilterStateChange(e.target.value)}>
        <option>TX</option>
        <option>AZ</option>
        <option>TN</option>
        <option>NY</option>
        <option>HI</option>
        <option>MA</option>
      </select>
    </label>
  </form>
);

export default Location;
