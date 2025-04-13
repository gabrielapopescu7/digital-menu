import React from 'react'
import './CartSummary.style.css'
import { Product } from '../../data/menuData'

interface Props {
  cart: Product[]
  removeFromCart: (index: number) => void
  totalPrice: number
  // Added a callback to handle placing the order
  onPlaceOrder: () => void
}

const CartSummary: React.FC<Props> = ({
  cart,
  removeFromCart,
  totalPrice,
  onPlaceOrder
}) => {
  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <div className="cart-list">
        {cart.length === 0 ? (
          <p className="empty">The cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <span>
                  {item.name} - {item.price} $
                </span>
                <button onClick={() => removeFromCart(index)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <h3>Total: {totalPrice.toFixed(2)} $</h3>
      {/* Added a button for placing orders */}
      <button
        onClick={onPlaceOrder}
        className="place-order-btn"
        disabled={cart.length === 0}
      >
        Place Order
      </button>
    </div>
  )
}

export default CartSummary
