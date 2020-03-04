import React from 'react';

const Category = ({
  handleFilterCategoryChange,
  filterCategoryValue,
  filterDropdownCategories
}) => (
  <div>
    <form>
      <label htmlFor="category">
        Category:
        <select value={filterCategoryValue} onChange={(e) => handleFilterCategoryChange(e.target.value)}>
          <option> </option>
          {filterDropdownCategories.map( category => (
            <option key={category.category_id}>{category.category_name}</option>
          ))}
        </select>
      </label>
    </form>
  </div>
);

export default Category;
