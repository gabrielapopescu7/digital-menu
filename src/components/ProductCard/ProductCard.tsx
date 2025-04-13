import React, { useState } from 'react'
import '../ProductCard/ProductCard.style.css'

import { Product } from 'data/menuData'

interface ProductCardProps {
  product: Product
  addToCart: (product: Product) => void
  onClick?: () => void
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  addToCart,
  onClick
}) => {
  // Initialized local state for product availability toggle
  const [isAvailable, setIsAvailable] = useState<boolean>(product.available)

  // Handle availability toggle
  const toggleAvailability = () => {
    setIsAvailable((prev) => !prev)
  }

  return (
    <div className="product-card" onClick={onClick}>
      {' '}
      {/* Bind onClick here */}
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: {product.price} $</p>
      <p>Status: {isAvailable ? 'Available' : 'Out of stock'}</p>
      {/* Availability toggle */}
      <div className="availability-toggle">
        <label htmlFor={`toggle-${product.id}`}>Available</label>
        <input
          type="checkbox"
          id={`toggle-${product.id}`}
          checked={isAvailable}
          onChange={toggleAvailability}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation()
          addToCart(product)
        }}
        className="add-to-cart-btn"
        disabled={!isAvailable}
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard
