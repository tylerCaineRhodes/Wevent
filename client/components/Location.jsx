import React from 'react';

const Location = ({
  handleStateChange,
  filterCityValue,
  filterStateValue,
  filterEvents,
  states,
}) => (
  <form>
    <label htmlFor="city">
      <span>City:</span>
      <input type="text" value={filterCityValue} onChange={(e) => handleStateChange(e.target.value, 'filterCityValue', filterEvents)} />
    </label>
    <label htmlFor="state">
      State:
      <select value={filterStateValue} onChange={(e) => handleStateChange(e.target.value, 'filterStateValue', filterEvents)}>
        <option>Select State</option>
        {states.map((state, index) => (
          <option key={state.state_id}>{state.state_name}</option>
        ))}
      </select>
    </label>
  </form>
);

export default Location;
