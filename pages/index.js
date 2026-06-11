import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products from API
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load products:', err);
        setLoading(false);
      });

    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartCount(JSON.parse(savedCart).length);
    }
  }, []);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    setCartCount(cart.length);
    alert(`${product.name} added to cart!`);
  };

  return (
    <>
      <Head>
        <title>Desires — Intimacy, Refined</title>
        <meta name="description" content="Premium intimacy products for every body. Body-safe, discreetly shipped, fairly priced." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Navbar */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(250, 246, 244, 0.97)', borderBottom: '1px solid #e8cdd4', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 3rem', height: '68px' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.7rem', fontStyle: 'italic', color: '#4a1c35', margin: 0 }}>Desires</h1>
        <div style={{ display: 'flex', gap: '2.4rem', listStyle: 'none' }}>
          <a href="#shop" style={{ fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8a7880', textDecoration: 'none' }}>Shop</a>
          <a href="#collections" style={{ fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8a7880', textDecoration: 'none' }}>Collections</a>
          <a href="#story" style={{ fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8a7880', textDecoration: 'none' }}>Story</a>
        </div>
        <button style={{ background: '#4a1c35', color: '#fff', border: 'none', padding: '0.45rem 1.2rem', borderRadius: '30px', fontFamily: 'Jost, sans-serif', fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>Bag ({cartCount})</button>
      </nav>

      {/* Hero */}
      <section style={{ display: 'grid', gridTemplateColumns: '55% 45%', minHeight: '88vh' }}>
        <div style={{ background: 'linear-gradient(135deg, #2a0a1e 0%, #4a1c35 50%, #1c0d16 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '3.5rem', color: '#fff' }}>
          <p style={{ fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#c8a882', marginBottom: '1rem' }}>New Arrivals — Summer 2026</p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.6rem, 4.5vw, 4.4rem)', fontWeight: 400, lineHeight: 1.08, color: '#fff', marginBottom: '1.1rem' }}>Desires.<br />Your pleasure,<br />your way.</h1>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.68)', maxWidth: '380px', lineHeight: 1.8, marginBottom: '2rem' }}>Premium intimacy products for every body — body-safe, discreetly shipped, and priced for real people.</p>
          <div style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap' }}>
            <button style={{ padding: '0.75rem 2rem', borderRadius: '1px', fontFamily: 'Jost, sans-serif', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', border: 'none', background: '#4a1c35', color: '#fff' }}>Shop Now</button>
            <button style={{ padding: '0.75rem 2rem', borderRadius: '1px', fontFamily: 'Jost, sans-serif', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', border: '1px solid rgba(255, 255, 255, 0.4)', background: 'transparent', color: 'rgba(255, 255, 255, 0.85)' }}>Our Story</button>
          </div>
        </div>
        <div style={{ background: '#f5eaed', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 3.5rem', gap: '1.8rem' }}>
          <p style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9b5e72' }}>Featured This Week</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.9rem', color: '#4a1c35', lineHeight: 1.2 }}>Hand-picked<br />for you</h2>
          <div style={{ background: '#fff', borderRadius: '3px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(74, 28, 53, 0.1)', display: 'flex' }}>
            <div style={{ width: '130px', height: '130px', flexShrink: 0, background: 'linear-gradient(135deg, #2a0a1e, #4a1c35)' }} />
            <div style={{ padding: '1.1rem 1.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ fontSize: '0.67rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9b5e72', marginBottom: '0.25rem' }}>Desires</p>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: '#4a1c35', marginBottom: '0.3rem' }}>Glow Rose Vibrator</h3>
              <p style={{ fontSize: '0.8rem', color: '#8a7880', marginBottom: '0.5rem' }}>10 modes · Glow-in-dark · USB rechargeable</p>
              <p style={{ fontSize: '1rem', fontWeight: 500, color: '#4a1c35' }}>$18.99</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="shop" style={{ padding: '5rem 3.5rem', background: '#f5eaed' }}>
        <div style={{ marginBottom: '2.8rem' }}>
          <p style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9b5e72', marginBottom: '0.6rem' }}>Our Collection</p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', fontWeight: 400, color: '#4a1c35' }}>Everything in Stock</h2>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#4a1c35' }}>Loading products...</p>
        ) : products.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#4a1c35' }}>No products available yet.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.6rem' }}>
            {products.map((product) => (
              <div key={product._id} style={{ background: '#fff', borderRadius: '3px', overflow: 'hidden', cursor: 'pointer', transition: 'box-shadow 0.25s, transform 0.25s', boxShadow: '0 4px 12px rgba(74, 28, 53, 0.08)' }}>
                <div style={{ position: 'relative', aspectRatio: '1 / 1', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
                  {product.flag && (
                    <span style={{ position: 'absolute', top: '0.8rem', left: '0.8rem', background: '#4a1c35', color: '#fff', fontSize: '0.63rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.25rem 0.65rem', borderRadius: '1px', zIndex: 1 }}>
                      {product.flag}
                    </span>
                  )}
                  {product.images && product.images[0] ? (
                    <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ fontSize: '3rem' }}>📦</div>
                  )}
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <p style={{ fontSize: '0.67rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9b5e72', marginBottom: '0.25rem' }}>{product.brand || 'Desires'}</p>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: '#4a1c35', marginBottom: '0.4rem' }}>{product.name}</h3>
                  <p style={{ fontSize: '0.8rem', color: '#8a7880', lineHeight: 1.65, marginBottom: '0.9rem' }}>{product.description ? product.description.substring(0, 100) + '...' : ''}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1rem', fontWeight: 500, color: '#4a1c35' }}>${product.price}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#4a1c35', color: '#fff', border: 'none', fontSize: '1.1rem', cursor: 'pointer', transition: 'background 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer style={{ background: '#1c1418', color: '#e8cdd4', padding: '3.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '2rem' }}>
          <div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1rem', color: '#e8cdd4' }}>Desires</h3>
            <p style={{ fontSize: '0.8rem', color: '#8a7880', lineHeight: 1.75 }}>Premium intimacy products for every body.</p>
          </div>
          <div>
            <h4 style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 400, color: '#9b5e72', marginBottom: '1rem' }}>Shop</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: 0 }}>
              <li><a href="#" style={{ fontSize: '0.8rem', color: '#8a7880', textDecoration: 'none' }}>Vibrators</a></li>
              <li><a href="#" style={{ fontSize: '0.8rem', color: '#8a7880', textDecoration: 'none' }}>Couples Play</a></li>
              <li><a href="#" style={{ fontSize: '0.8rem', color: '#8a7880', textDecoration: 'none' }}>Accessories</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 400, color: '#9b5e72', marginBottom: '1rem' }}>Help</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: 0 }}>
              <li><a href="#" style={{ fontSize: '0.8rem', color: '#8a7880', textDecoration: 'none' }}>FAQ</a></li>
              <li><a href="#" style={{ fontSize: '0.8rem', color: '#8a7880', textDecoration: 'none' }}>Shipping</a></li>
              <li><a href="#" style={{ fontSize: '0.8rem', color: '#8a7880', textDecoration: 'none' }}>Returns</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 400, color: '#9b5e72', marginBottom: '1rem' }}>Legal</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: 0 }}>
              <li><a href="#" style={{ fontSize: '0.8rem', color: '#8a7880', textDecoration: 'none' }}>Privacy</a></li>
              <li><a href="#" style={{ fontSize: '0.8rem', color: '#8a7880', textDecoration: 'none' }}>Terms</a></li>
            </ul>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(232, 205, 212, 0.08)', paddingTop: '1.1rem' }}>
          <p style={{ fontSize: '0.73rem', color: '#8a7880' }}>© 2026 Desires. All rights reserved. Adults 18+ only.</p>
        </div>
      </footer>
    </>
  );
}
