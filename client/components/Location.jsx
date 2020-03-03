import React from 'react';

const Location = () => (
  <form>
    <label htmlFor="city">
      City:
      <input type="text" />
    </label>
    <label htmlFor="state">
      State:
      <select>
        <option>TX</option>
        <option>AZ</option>
        <option>TN</option>
        <option>NY</option>
        <option>HI</option>
        <option>MA</option>
      </select>
    </label>
    <input type="submit" />
  </form>
);

export default Location;
