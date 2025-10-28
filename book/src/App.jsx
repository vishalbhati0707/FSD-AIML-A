import { useState, useEffect, useRef } from "react";
import "./App.css";

const books = [
  {
    id: 1,
    name: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
  },
  {
    id: 2,
    name: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 22.5,
    image:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
  },
  {
    id: 3,
    name: "1984",
    author: "George Orwell",
    price: 18.75,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
  },
  {
    id: 4,
    name: "Pride and Prejudice",
    author: "Jane Austen",
    price: 21.25,
    image:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
  },
  {
    id: 5,
    name: "The Catcher in the Rye",
    author: "J.D. Salinger",
    price: 20.0,
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop",
  },
  {
    id: 6,
    name: "Lord of the Flies",
    author: "William Golding",
    price: 17.99,
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
  },
  {
    id: 7,
    name: "Animal Farm",
    author: "George Orwell",
    price: 16.5,
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=600&fit=crop",
  },
  {
    id: 8,
    name: "The Hobbit",
    author: "J.R.R. Tolkien",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=600&fit=crop",
  },
];

function BookCard({ book, isInCart, onAddToCart, onRemoveFromCart }) {
  return (
    <div className="book-card">
      <div className="book-image-container">
        <img src={book.image} alt={book.name} className="book-image" />
        <div className="book-overlay">
          <p className="book-author">{book.author}</p>
        </div>
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.name}</h3>
        <p className="book-author-text">{book.author}</p>
        <div className="book-footer">
          <span className="book-price">${book.price.toFixed(2)}</span>
          {isInCart ? (
            <button
              className="btn-remove"
              onClick={() => onRemoveFromCart(book.id)}
            >
              Remove
            </button>
          ) : (
            <button className="btn-add" onClick={() => onAddToCart(book.id)}>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function CartModal({ isOpen, onClose, cartItems, onRemoveItem, onCheckout }) {
  const cartTotal = cartItems.reduce((total, book) => total + book.price, 0);

  if (!isOpen) return null;

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-modal-header">
          <h2>Shopping Cart</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="cart-modal-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <span>Add some books to get started!</span>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((book) => (
                  <div key={book.id} className="cart-item">
                    <img
                      src={book.image}
                      alt={book.name}
                      className="cart-item-image"
                    />
                    <div className="cart-item-info">
                      <h4>{book.name}</h4>
                      <p>{book.author}</p>
                      <span className="cart-item-price">
                        ${book.price.toFixed(2)}
                      </span>
                    </div>
                    <button
                      className="cart-item-remove"
                      onClick={() => onRemoveItem(book.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="summary-row total-row">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <button className="checkout-btn" onClick={onCheckout}>
                Proceed to Checkout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  // Initialize cart from localStorage or empty Set
  const getInitialCart = () => {
    const savedCart = localStorage.getItem("bookCart");
    if (savedCart) {
      try {
        const cartArray = JSON.parse(savedCart);
        return new Set(cartArray);
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
    return new Set();
  };

  const [cart, setCart] = useState(getInitialCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const isInitialMount = useRef(true);

  // Save cart to localStorage whenever it changes (but skip initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const cartArray = Array.from(cart);
    localStorage.setItem("bookCart", JSON.stringify(cartArray));
  }, [cart]);

  const handleAddToCart = (bookId) => {
    setCart(new Set(cart).add(bookId));
  };

  const handleRemoveFromCart = (bookId) => {
    const newCart = new Set(cart);
    newCart.delete(bookId);
    setCart(newCart);
  };

  const handleCheckout = () => {
    setIsCheckout(true);
    setIsCartOpen(false);
  };

  const handleCompleteOrder = () => {
    alert("Order placed successfully! Thank you for your purchase.");
    setCart(new Set());
    localStorage.removeItem("bookCart");
    setIsCheckout(false);
  };

  const cartTotal = books
    .filter((book) => cart.has(book.id))
    .reduce((total, book) => total + book.price, 0);

  const cartItems = books.filter((book) => cart.has(book.id));

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1 className="logo">BookStore</h1>
          <div
            className="cart-info"
            onClick={() => setIsCartOpen(true)}
            style={{ cursor: "pointer" }}
          >
            <span className="cart-icon">🛒</span>
            <span className="cart-count">{cart.size}</span>
            <span className="cart-label">items in cart</span>
            {cart.size > 0 && (
              <span className="cart-total">${cartTotal.toFixed(2)}</span>
            )}
          </div>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <div className="book-grid">
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                isInCart={cart.has(book.id)}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
              />
            ))}
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 BookStore. All rights reserved.</p>
        </div>
      </footer>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      {isCheckout && (
        <div className="checkout-overlay">
          <div className="checkout-modal">
            <div className="checkout-header">
              <h2>Checkout</h2>
              <button
                className="close-btn"
                onClick={() => setIsCheckout(false)}
              >
                ×
              </button>
            </div>

            <div className="checkout-content">
              <div className="order-summary">
                <h3>Order Summary</h3>
                {cartItems.map((book) => (
                  <div key={book.id} className="checkout-item">
                    <img
                      src={book.image}
                      alt={book.name}
                      className="checkout-item-image"
                    />
                    <div className="checkout-item-details">
                      <p className="checkout-item-name">{book.name}</p>
                      <p className="checkout-item-author">{book.author}</p>
                      <p className="checkout-item-price">
                        ${book.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="shipping-form">
                <h3>Shipping Information</h3>
                <div className="form-row">
                  <input type="text" placeholder="Full Name" />
                  <input type="email" placeholder="Email" />
                </div>
                <div className="form-row">
                  <input type="text" placeholder="Address" />
                  <input type="text" placeholder="City" />
                </div>
                <div className="form-row">
                  <input type="text" placeholder="State" />
                  <input type="text" placeholder="ZIP Code" />
                </div>
              </div>

              <div className="payment-info">
                <h3>Payment Details</h3>
                <input type="text" placeholder="Card Number" />
                <div className="form-row">
                  <input type="text" placeholder="Expiry Date" />
                  <input type="text" placeholder="CVV" />
                </div>
              </div>

              <div className="checkout-total">
                <div className="total-row">
                  <span>Total</span>
                  <span className="total-amount">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                className="complete-order-btn"
                onClick={handleCompleteOrder}
              >
                Complete Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
