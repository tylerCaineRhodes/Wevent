import React from 'react';

const Category = ({
  handleFilterCategoryChange,
  filterCategoryValue,
  filterDropdownCategories,
}) => (
  <div>
    <form>
      <label htmlFor="category">
        Category:
        <select value={filterCategoryValue.name} data-id={filterCategoryValue.id} onChange={(e) => handleFilterCategoryChange({ name: e.target.value, id: e.target.selectedIndex })}>
          <option> </option>
          {filterDropdownCategories.map((category) => (
            <option key={category.category_id}>{category.category_name}</option>
          ))}
        </select>
      </label>
    </form>
  </div>
);

export default Category;
