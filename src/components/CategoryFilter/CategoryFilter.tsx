import React from 'react'
import './CategoryFilter.style.css'

import { MenuCategory } from 'data/menuData'

// Define props for the CategoryFilter component
interface CategoryFilterProps {
  categories: MenuCategory[]
  setFilteredCategory: (category: string) => void
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  setFilteredCategory
}) => {
  return (
    <div className="category-filter">
      <button onClick={() => setFilteredCategory('All')}>All</button>

      {/* Dynamically render a button for each category */}
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setFilteredCategory(category.category)}
        >
          {category.category}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
