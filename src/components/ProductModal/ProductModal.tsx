import React from 'react'
import { Product } from 'data/menuData'

// Define the expected props for the modal component
interface ProductModalProps {
  product: Product | null
  closeModal: () => void
}

const ProductModal: React.FC<ProductModalProps> = ({ product, closeModal }) => {
  // If no product is selected, don't render the modal
  if (!product) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal" onClick={closeModal}>
          X
        </button>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>Price: {product.price} $</p>
        <button onClick={() => closeModal()}>Close</button>
      </div>
    </div>
  )
}

export default ProductModal
