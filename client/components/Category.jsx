import React from 'react';

const Category = ({
  handleFilterCategoryChange,
  filterCategoryValue,
}) => (
  <div>
    <form>
      <label htmlFor="category">
        Category:
        <select value={filterCategoryValue} onChange={(e) => handleFilterCategoryChange(e.target.value)}>
          <option>  </option>
          <option>TX</option>
          <option>AZ</option>
          <option>TN</option>
          <option>HI</option>
          <option>NY</option>
          <option>HI</option>
          <option>MA</option>
        </select>
      </label>
    </form>
  </div>
);

export default Category;
