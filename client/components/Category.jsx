import React from 'react';

export default function Category() {
  return (
    <div>
      <span>A way to save the categories...</span>
  
    <form>
      <label>
        Category:
        <select >
          <option>TX</option>
          <option>AZ</option>
          <option>TN</option>
          <option>NY</option>
          <option>HI</option>
          <option>MA</option>
        </select>
      </label>
      <input type="submit" value="set" />
    </form>
    </div>
  )
}