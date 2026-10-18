import React from 'react';
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartCount } from './CartSlice.jsx';
import AboutUs from './AboutUs.jsx';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';
import './App.css';

function Navbar() {
  const cartCount = useSelector(selectCartCount);
  return (
    <header className="site-header">
      <Link to="/" className="brand" aria-label="Paradise Nursery home">
        <span className="brand-mark">✿</span>
        <span>Paradise <b>Nursery</b></span>
      </Link>
      <nav className="main-nav" aria-label="Main navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/plants">Plants</NavLink>
        <NavLink to="/cart" className="cart-nav">
          <span aria-hidden="true">🛒</span> Cart <span className="cart-badge">{cartCount}</span>
        </NavLink>
      </nav>
    </header>
  );
}

function Home() {
  const navigate = useNavigate();
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">GROW A HAPPIER HOME</p>
          <h1>Bring nature<br />a little <em>closer.</em></h1>
          <p className="hero-description">
            Find your next favourite plant and make every corner feel more alive.
          </p>
          <button className="button button-light" onClick={() => navigate('/plants')}>
            Get Started <span aria-hidden="true">→</span>
          </button>
        </div>
        <div className="hero-note">
          <span>01</span><span>Plants that make a space feel like home.</span>
        </div>
      </section>
      <AboutUs />
      <section className="home-cta">
        <div>
          <p className="eyebrow">YOUR GREEN CORNER AWAITS</p>
          <h2>Ready to find your plant?</h2>
        </div>
        <Link className="button button-green" to="/plants">Explore plants <span>→</span></Link>
      </section>
    </main>
  );
}

function NotFound() {
  return <main className="empty-state"><h1>Page not found</h1><Link className="button button-green" to="/">Return home</Link></main>;
}

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plants" element={<ProductList />} />
        <Route path="/cart" element={<CartItem />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <footer className="site-footer">
        <Link to="/" className="footer-brand">✿ Paradise Nursery</Link>
        <span>Grow at your own pace. © {new Date().getFullYear()} Paradise Nursery</span>
      </footer>
    </div>
  );
}
