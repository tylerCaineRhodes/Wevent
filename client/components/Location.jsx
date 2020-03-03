import React from 'react';

export default function Location() {
  return (
    <form>
      <label>
        City:
        <input type="text" />
      </label>
      <label>
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
  )
}