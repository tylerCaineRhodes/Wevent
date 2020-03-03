import React from 'react';

const Category = () => (
  <div>
    <span>A way to save the categories...</span>

    <form>
      <label htmlFor="category">
        Category:
        <select>
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
);

export default Category;
