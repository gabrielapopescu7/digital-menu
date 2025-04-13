import React, { useState, useEffect } from 'react'
import ProductCard from '../../components/ProductCard/ProductCard'
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter'
import CartSummary from '../../components/CartSummary/CartSummary'
import './Menu.css'
import { menuData, MenuCategory, Product } from 'data/menuData'

const Menu = () => {
  const [filteredCategory, setFilteredCategory] = useState<string>('All')
  const [showOrders, setShowOrders] = useState<boolean>(false)
  const [cart, setCart] = useState<Product[]>([])
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false)
  const [placedOrder, setPlacedOrder] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState('ascending')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  //added useEffect for stopping scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isModalOpen])
  //toggle the visibility of the orders section
  const handleToggleOrders = () => {
    setShowOrders((prev) => !prev)
  }

  //adding a product to the cart
  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product])
  }

  //added the remove implementation for a product from the cart by index
  const removeFromCart = (indexToRemove: number) => {
    setCart((prevCart) =>
      prevCart.filter((_, index) => index !== indexToRemove)
    )
  }

  //place the order and clear the cart after
  const placeOrder = () => {
    setPlacedOrder([...cart])
    setOrderPlaced(true)
    setCart([])
  }

  //implemented filter by selected category
  const filteredMenu =
    filteredCategory === 'All'
      ? menuData.filter((category) => category.products.length > 0)
      : menuData.filter((category) => category.category === filteredCategory)

  //implemented search filter to the menu
  const filteredAndSearchedMenu = filteredMenu.map((category) => ({
    ...category,
    products: category.products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }))

  //added the functionality to sort products by price
  const sortProducts = (products: Product[]) => {
    if (sortOption === 'ascending') {
      return [...products].sort((a, b) => a.price - b.price)
    } else if (sortOption === 'descending') {
      return [...products].sort((a, b) => b.price - a.price)
    }
    return products
  }

  //calculate quantity of a product for using in placed order
  const calculateQuantity = (product: Product) => {
    return placedOrder.filter((item) => item.id === product.id).length
  }
  // calculate the subtotal price for a product
  const calculateSubtotal = (product: Product) => {
    const quantity = calculateQuantity(product)
    return product.price * quantity
  }

  //added the functionality to calculate the total price of an order
  const calculateTotalPrice = () => {
    return placedOrder.reduce((total, product) => total + product.price, 0)
  }

  // Implemented a discount where for every 3 identical products, the customer only pays for 2
  const calculateTotalPriceWithDiscount = () => {
    const productMap: Record<string, { product: Product; quantity: number }> =
      {}

    //group products by id and count quantities
    placedOrder.forEach((product) => {
      if (productMap[product.id]) {
        productMap[product.id].quantity += 1
      } else {
        productMap[product.id] = { product, quantity: 1 }
      }
    })

    let total = 0
    //here is the discount logic
    Object.values(productMap).forEach(({ product, quantity }) => {
      const freeItems = Math.floor(quantity / 3)
      const paidItems = quantity - freeItems
      total += paidItems * product.price
    })

    return total
  }

  //open the modal and showing the details of an product
  const openProductModal = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }
  //close the modal
  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  const totalPrice = cart.reduce((acc, product) => acc + product.price, 0)

  return (
    <div className="menu-container">
      <h1>Our Menu</h1>
      {/* Search input */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a product"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      {/* Sort options */}
      <div className="sort-container">
        <label htmlFor="sort-select">Sort by Price:</label>
        <select
          id="sort-select"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="ascending">Price: Low to High</option>
          <option value="descending">Price: High to Low</option>
        </select>
      </div>
      {/* Toggle order view */}
      <button onClick={handleToggleOrders} className="orders-btn">
        {showOrders ? 'Hide Orders' : 'View Orders'}
      </button>
      {/* Orders section */}
      {showOrders && (
        <div className="orders">
          <h3>My Orders</h3>
          {orderPlaced ? (
            <>
              <p>Your order has been placed successfully!</p>
              <h4>Order Details:</h4>
              <ul>
                {Array.from(new Set(placedOrder.map((p) => p.id))).map(
                  (productId) => {
                    const product = placedOrder.find((p) => p.id === productId)
                    if (product) {
                      const quantity = calculateQuantity(product)
                      const subtotal = calculateSubtotal(product)
                      return (
                        <li key={productId}>
                          <p>{product.name}</p>
                          <p>Quantity: {quantity}</p>
                          <p>Subtotal: {subtotal.toFixed(2)} $</p>
                        </li>
                      )
                    }
                    return null
                  }
                )}
              </ul>
              <h3>
                Total Price: {calculateTotalPriceWithDiscount().toFixed(2)} $
              </h3>
              <h3>
                Discount:{' '}
                {(
                  calculateTotalPrice() - calculateTotalPriceWithDiscount()
                ).toFixed(2)}{' '}
                $
              </h3>
            </>
          ) : cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((product, index) => (
              <div key={index}>
                <p>{product.name}</p>
                <p>Price: {product.price} $</p>
              </div>
            ))
          )}
        </div>
      )}
      {/* Category filter section */}
      <CategoryFilter
        categories={menuData}
        setFilteredCategory={setFilteredCategory}
      />
      <div className="main-content">
        <div className="product-grid">
          {filteredAndSearchedMenu
            .filter((category) => category.products.length > 0)
            .map((category: MenuCategory) => (
              <div key={category.id} className="category-section">
                <h2>{category.category}</h2>
                {category.products.length > 0 ? (
                  sortProducts(category.products).map((product: Product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      addToCart={addToCart}
                      onClick={() => openProductModal(product)}
                    />
                  ))
                ) : (
                  <p>No products found.</p>
                )}
              </div>
            ))}
        </div>

        {/* Sidebar with cart summary */}
        <div className="sidebar">
          <CartSummary
            cart={cart}
            removeFromCart={removeFromCart}
            totalPrice={totalPrice}
            onPlaceOrder={placeOrder}
          />
        </div>
      </div>

      {/*implemented modal for viewing full product details*/}
      {isModalOpen && selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              X
            </button>
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
            <p>Price: {selectedProduct.price} $</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Menu
