import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectCartItems,
  selectCartTotal,
} from './CartSlice.jsx';

export default function CartItem() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const [checkoutMessage, setCheckoutMessage] = useState('');

  return (
    <main className="page-content cart-page">
      <section className="page-heading cart-heading">
        <p className="eyebrow">YOUR LITTLE GREEN COLLECTION</p>
        <h1>Shopping <em>cart.</em></h1>
        <p>Every plant is one step closer to a greener space.</p>
      </section>

      {items.length === 0 ? (
        <section className="empty-state">
          <div className="empty-icon">🪴</div>
          <h2>Your cart is ready to grow.</h2>
          <p>You haven't added any plants just yet.</p>
          <Link to="/plants" className="button button-green">Continue shopping <span>→</span></Link>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-list" aria-label="Cart items">
            {items.map((item) => (
              <article className="cart-row" key={item.id}>
                <img
                  className="cart-image"
                  src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=300&q=80`}
                  alt={item.name}
                />
                <div className="cart-product-info">
                  <h3>{item.name}</h3>
                  <p>Unit price: ₹{item.price.toLocaleString('en-IN')}</p>
                  <button className="text-button delete-button" onClick={() => dispatch(removeFromCart(item.id))}>
                    Remove item
                  </button>
                </div>
                <div className="quantity-controls" aria-label={`Quantity for ${item.name}`}>
                  <button aria-label={`Decrease ${item.name} quantity`} onClick={() => dispatch(decreaseQuantity(item.id))} disabled={item.quantity <= 1}>−</button>
                  <span>{item.quantity}</span>
                  <button aria-label={`Increase ${item.name} quantity`} onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
                </div>
                <strong className="item-subtotal">₹{(item.price * item.quantity).toLocaleString('en-IN')}</strong>
              </article>
            ))}
          </section>

          <aside className="order-summary">
            <p className="eyebrow">ORDER SUMMARY</p>
            <h2>Your total</h2>
            <div className="summary-line"><span>Items ({items.reduce((sum, item) => sum + item.quantity, 0)})</span><span>₹{total.toLocaleString('en-IN')}</span></div>
            <div className="summary-line"><span>Delivery</span><span className="free-label">Calculated later</span></div>
            <div className="summary-total"><span>Total</span><strong>₹{total.toLocaleString('en-IN')}</strong></div>
            <button className="button button-green checkout-button" onClick={() => setCheckoutMessage('Coming Soon! Checkout will be available soon.')}>Checkout <span>→</span></button>
            {checkoutMessage && <p className="checkout-message" role="status">{checkoutMessage}</p>}
            <Link className="continue-link" to="/plants">← Continue shopping</Link>
          </aside>
        </div>
      )}
    </main>
  );
}
