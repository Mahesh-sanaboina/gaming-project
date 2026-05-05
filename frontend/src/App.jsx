import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const fallbackProducts = [
    { _id: '1', name: 'Quantum Console X', price: 499, description: 'Next-gen performance in a sleek pearl-white design. Optimized for 4K 120Hz gaming.', category: 'console', imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000' },
    { _id: '2', name: 'Aurora Rig Ultra', price: 2499, description: 'Premium water-cooled PC with RTX 5090 and elegant white aesthetics.', category: 'pc', imageUrl: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=1000' },
    { _id: '3', name: 'Zenith Pro Headset', price: 299, description: 'Audiophile-grade wireless headset with pristine sound and cloud-soft comfort.', category: 'accessory', imageUrl: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&q=80&w=1000' },
    { _id: '4', name: 'Cyber-Mechanical Keyboard', price: 189, description: 'Ultra-responsive optical switches with per-key RGB and titanium frame.', category: 'accessory', imageUrl: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=1000' },
    { _id: '5', name: 'Nexus Gaming Monitor', price: 899, description: '32-inch 4K OLED display with 240Hz refresh rate and ultra-low response time.', category: 'accessory', imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=1000' },
    { _id: '6', name: 'Titan Gaming Chair', price: 549, description: 'Ergonomic carbon-fiber design with magnetic memory foam lumbar support.', category: 'accessory', imageUrl: '/cyberpunk_gaming_chair.png' },
    { _id: '7', name: 'Phantom Pro Mouse', price: 149, description: 'Ultra-lightweight wireless esports mouse with an optical sensor and 8000Hz polling rate.', category: 'accessory', imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=1000' },
    { _id: '8', name: 'GlideX Glass Mousepad', price: 99, description: 'Tempered glass surface for frictionless, pixel-perfect tracking and durability.', category: 'accessory', imageUrl: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=1000' },
    { _id: '9', name: 'Aura Studio Mic', price: 199, description: 'Professional XLR/USB microphone with active noise cancellation and RGB shock mount.', category: 'accessory', imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=1000' },
    { _id: '10', name: 'Vortex VR Lens', price: 799, description: 'Next-generation untethered virtual reality with 8K per eye resolution and haptic feedback.', category: 'console', imageUrl: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=1000' }
];

function App() {
  const [products, setProducts] = useState(fallbackProducts);
  const [cart, setCart] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedModule, setSelectedModule] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [playingVideos, setPlayingVideos] = useState({});
  const [checkoutState, setCheckoutState] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
      fullName: '', email: '', phone: '', address: '', city: '', state: '', zip: '',
      cardNumber: '', expiry: '', cvv: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderDetails, setOrderDetails] = useState(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleCheckout = () => {
      if (cart.length === 0) return;
      setCurrentPage('checkout');
      setIsCartOpen(false);
      setCheckoutState(null);
  };

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setCheckoutForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFinalPayment = (e) => {
      e.preventDefault();
      setCheckoutState('processing');
      
      setTimeout(() => {
          const newOrder = {
              id: 'GX-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
              items: cart,
              total: cart.reduce((total, item) => total + (item.price || 0), 0),
              date: new Date().toISOString(),
              billing: checkoutForm,
              payment: paymentMethod
          };
          
          setOrderDetails(newOrder);
          setCheckoutState('success');
          setCart([]);
          
          // Store in local storage
          const history = JSON.parse(localStorage.getItem('orderHistory') || '[]');
          localStorage.setItem('orderHistory', JSON.stringify([...history, newOrder]));
      }, 3000);
  };

  const closeCheckout = () => {
      setCheckoutState(null);
      setIsCartOpen(false);
  };

  const playVideo = (key) => {
      setPlayingVideos(prev => ({ ...prev, [key]: true }));
  };

  const learnModules = {
      aim: {
          title: "NEURAL AIM PROTOCOL",
          content: "Decoding human reaction limits. Learn to synchronize your synaptic responses with 8000Hz polling rates for sub-millisecond precision in FPS titles.",
          videoUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
          youtubeUrl: "https://www.youtube.com/embed/e_E9W2vsRbQ"
      },
      movement: {
          title: "GHOST MOVEMENT MECHANICS",
          content: "Master advanced strafing, slide-canceling, and momentum shifts to make your hitbox virtually untrackable in competitive play.",
          videoUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=800",
          youtubeUrl: "https://www.youtube.com/embed/MmB9b5njVbA"
      },
      strategy: {
          title: "PRO GAME SENSE & MACRO",
          content: "Read the battlefield like a grandmaster. Learn predictive positioning, map control, and how to force enemy errors.",
          videoUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=800",
          youtubeUrl: "https://www.youtube.com/embed/8X2kIfS6fb8"
      },
      optimization: {
          title: "MAX FPS TUNING GUIDE",
          content: "Bypassing standard OS schedulers. A deep dive into IRQ priority management and core parking to eliminate input lag completely.",
          videoUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
          youtubeUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ"
      }
  };



  const API_BASE_URL = 'https://gaming-project-backend.vercel.app';

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/products`);
      if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setProducts(res.data);
      } else {
          setProducts(fallbackProducts);
      }
    } catch (err) {
      console.error('Error fetching products, using fallback:', err);
      setProducts(fallbackProducts);
    }
  };

  useEffect(() => {
    fetchProducts();
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / totalHeight) * 100);
    };
    const handleMouseMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [products, currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const addToCart = (product) => {
      setCart([...cart, product]);
      setIsCartOpen(true);
  };

  const removeFromCart = (indexToRemove) => {
      setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const handleDownloadSDK = () => {
      const element = document.createElement("a");
      const fileContent = `=========================================
 GAMINGX NEURAL SDK & GAME DEV GUIDE v1.0.4
=========================================

Welcome to the Forge. This document contains the essential blueprints for building your first game.

PHASE 1: CHOOSE YOUR ENGINE
-----------------------------------------
1. Unreal Engine 5 (UE5)
   - Best for: AAA graphics, 3D worlds, high realism.
   - Language: C++ and visual "Blueprints".
   - Tip: Start with the First Person template to understand movement physics.

2. Unity Engine
   - Best for: Mobile games, 2D/3D indie games, VR.
   - Language: C#.
   - Tip: Extremely versatile, heavily supported by millions of community tutorials.

3. Godot Engine
   - Best for: 2D masterpieces, lightweight projects, open-source lovers.
   - Language: GDScript (similar to Python), C#, C++.
   - Tip: Extremely fast to learn and completely free with no royalties.

PHASE 2: CORE DEVELOPMENT CYCLE
-----------------------------------------
1. Prototyping: Build the "Core Loop". If your game is a shooter, make a gray-box level where moving and shooting feels fun. Do not worry about art yet.
2. Asset Pipeline: Replace gray boxes with actual 3D models (from Blender/Maya) or 2D sprites (from Aseprite/Photoshop).
3. Scripting & Logic: Program enemy AI behaviors, spawn triggers, and score tracking.
4. Audio & VFX: Add particle systems for explosions and spatial 3D audio for immersion.

PHASE 3: PERFORMANCE TUNING
-----------------------------------------
- Object Pooling: Instead of destroying and recreating bullets, reuse them to save CPU cycles.
- LOD (Level of Detail): Use lower-poly models for objects far away from the camera.
- Baking Lighting: Pre-calculate light maps so the GPU doesn't have to render shadows in real-time.

[OK] Neural logic blueprints loaded.
Your development environment is now ready. Good luck, Operator.
`;
      const file = new Blob([fileContent], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = "GamingX_GameDev_Guide.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
  };

  return (
    <div className="app">
      <div className="custom-cursor" style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}></div>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%`, height: '4px', background: 'var(--accent-cyan)', position: 'fixed', top: 0, zIndex: 3000, boxShadow: '0 0 10px var(--accent-cyan)' }}></div>

      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
          <div className="logo" onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }}>GAMING<span style={{color: 'var(--accent-pink)'}}>X</span></div>
          
          <button className="mobile-menu-btn" onClick={toggleMenu}>
              {isMenuOpen ? '✕' : '☰'}
          </button>

          <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
              <li><button className={`nav-btn ${currentPage === 'home' ? 'active' : ''}`} onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }}>Home</button></li>
              <li><button className={`nav-btn ${currentPage === 'buy' ? 'active' : ''}`} onClick={() => { setCurrentPage('buy'); setIsMenuOpen(false); }}>Buy</button></li>
              <li><button className={`nav-btn ${currentPage === 'learn' ? 'active' : ''}`} onClick={() => { setCurrentPage('learn'); setIsMenuOpen(false); }}>Learn</button></li>
              <li><button className={`nav-btn ${currentPage === 'build' ? 'active' : ''}`} onClick={() => { setCurrentPage('build'); setIsMenuOpen(false); }}>Build</button></li>
              <li><button className={`nav-btn ${currentPage === 'connect' ? 'active' : ''}`} onClick={() => { setCurrentPage('connect'); setIsMenuOpen(false); }}>Connect</button></li>
          </ul>
          
          <div className="cart-status" onClick={() => { setIsCartOpen(true); setIsMenuOpen(false); }} style={{fontSize: '1.2rem', fontWeight: 900, color: 'var(--accent-cyan)', cursor: 'pointer'}}>
              [ STORAGE: {cart.length} ]
          </div>
      </nav>

      {/* Cart Panel Overlay */}
      {isCartOpen && (
          <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
              <div className="cart-panel" onClick={e => e.stopPropagation()}>
                  <div className="cart-header">
                      <h2 style={{color: 'var(--accent-cyan)', fontSize: '2rem'}}>STORAGE UNIT</h2>
                      <button className="close-modal" style={{position: 'static'}} onClick={() => setIsCartOpen(false)}>×</button>
                  </div>
                  <div className="cart-items">
                      {cart.length === 0 ? (
                          <p style={{color: 'var(--text-dim)', textAlign: 'center', marginTop: '2rem'}}>STORAGE IS EMPTY</p>
                      ) : (
                          cart.map((item, index) => (
                              <div className="cart-item" key={index} style={{position: 'relative'}}>
                                  <img src={item.imageUrl} alt={item.name} className="cart-item-img" />
                                  <div className="cart-item-details" style={{flexGrow: 1}}>
                                      <h4>{item.name}</h4>
                                      <p style={{fontWeight: 'bold'}}>${item.price}</p>
                                  </div>
                                  <button 
                                      onClick={() => removeFromCart(index)}
                                      style={{
                                          background: 'transparent', 
                                          border: 'none', 
                                          color: 'var(--accent-pink)', 
                                          cursor: 'pointer',
                                          fontSize: '1.2rem',
                                          padding: '0.5rem'
                                      }}
                                      title="Remove Item"
                                  >
                                      ✕
                                  </button>
                              </div>
                          ))
                      )}
                  </div>
                  <div className="cart-footer">
                      <div className="cart-total">
                          <span>TOTAL</span>
                          <span>${cart.reduce((total, item) => total + (item.price || 0), 0)}</span>
                      </div>
                      <button 
                          className="btn btn-primary" 
                          style={{width: '100%'}} 
                          onClick={handleCheckout}
                          disabled={cart.length === 0 || checkoutState === 'processing'}
                      >
                          {checkoutState === 'processing' ? 'ESTABLISHING SECURE UPLINK...' : 'INITIALIZE SECURE CHECKOUT'}
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* Checkout Success Modal */}
      {checkoutState === 'success' && orderDetails && (
          <div className="modal-overlay" onClick={closeCheckout}>
              <div className="pillar-modal glass fade-in text-center" onClick={e => e.stopPropagation()} style={{maxWidth: '600px', width: '90%'}}>
                  <div className="success-icon" style={{fontSize: '5rem', color: 'var(--accent-cyan)', marginBottom: '1rem'}}>✓</div>
                  <h2 style={{fontSize: '2.5rem', color: 'var(--accent-cyan)', marginBottom: '1rem'}}>TRANSACTION SECURE</h2>
                  <p style={{fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '0.5rem'}}>
                      Order Confirmed: <span style={{color: 'var(--accent-pink)', fontWeight: 'bold'}}>{orderDetails.id}</span>
                  </p>
                  <p style={{fontSize: '1rem', color: 'var(--text-dim)', marginBottom: '2rem'}}>
                      Neural link established. Total of ${orderDetails.total} has been authorized.
                  </p>
                  <button className="btn btn-primary" onClick={closeCheckout}>RETURN TO HUB</button>
              </div>
          </div>
      )}

      {selectedModule && (
          <div className="modal-overlay" onClick={() => setSelectedModule(null)}>
              <div className="pillar-modal glass fade-in" onClick={e => e.stopPropagation()} style={{maxWidth: '1000px', width: '90%'}}>
                  <button className="close-modal" onClick={() => setSelectedModule(null)}>×</button>
                  <h2 style={{fontSize: '3rem', color: 'var(--accent-cyan)', marginBottom: '2rem'}}>{selectedModule.title}</h2>
                  <div className="modal-content-grid">
                      <div className="modal-visual">
                          {selectedModule.type === 'video' && selectedModule.youtubeUrl ? (
                              <iframe width="100%" height="400" src={selectedModule.youtubeUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                          ) : (
                              <img src={selectedModule.imageUrl || selectedModule.videoUrl || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000'} />
                          )}
                      </div>
                      <div className="modal-text">
                          <p style={{fontSize: '1.4rem', lineHeight: '1.6', color: 'var(--text-main)'}}>{selectedModule.content}</p>
                          <button className="btn btn-primary mt-4" onClick={() => setSelectedModule(null)}>DISMISS</button>
                      </div>
                  </div>
              </div>
          </div>
      )}

      <main className="main-content">
          {currentPage === 'checkout' && (
              <div className="checkout-view fade-in-page section">
                  <div className="container">
                      <h1 className="page-title">Secure Checkout</h1>
                      <div className="checkout-grid">
                          {/* Left Column: Form */}
                          <div className="checkout-form-container glass">
                              <form onSubmit={handleFinalPayment}>
                                  <h3 className="section-subtitle">Billing Details</h3>
                                  <div className="form-group">
                                      <input type="text" name="fullName" placeholder="FULL NAME" required value={checkoutForm.fullName} onChange={handleInputChange} className="cyber-input" />
                                  </div>
                                  <div className="form-row">
                                      <input type="email" name="email" placeholder="EMAIL ADDRESS" required value={checkoutForm.email} onChange={handleInputChange} className="cyber-input" />
                                      <input type="tel" name="phone" placeholder="PHONE NUMBER" required value={checkoutForm.phone} onChange={handleInputChange} className="cyber-input" />
                                  </div>
                                  <div className="form-group">
                                      <input type="text" name="address" placeholder="SHIPPING ADDRESS" required value={checkoutForm.address} onChange={handleInputChange} className="cyber-input" />
                                  </div>
                                  <div className="form-row">
                                      <input type="text" name="city" placeholder="CITY" required value={checkoutForm.city} onChange={handleInputChange} className="cyber-input" />
                                      <input type="text" name="state" placeholder="STATE" required value={checkoutForm.state} onChange={handleInputChange} className="cyber-input" />
                                      <input type="text" name="zip" placeholder="ZIP CODE" required value={checkoutForm.zip} onChange={handleInputChange} className="cyber-input" />
                                  </div>

                                  <h3 className="section-subtitle" style={{marginTop: '3rem'}}>Payment Method</h3>
                                  <div className="payment-selector">
                                      <button type="button" className={`pay-method-btn ${paymentMethod === 'card' ? 'active' : ''}`} onClick={() => setPaymentMethod('card')}>CREDIT CARD</button>
                                      <button type="button" className={`pay-method-btn ${paymentMethod === 'upi' ? 'active' : ''}`} onClick={() => setPaymentMethod('upi')}>UPI / NET BANKING</button>
                                      <button type="button" className={`pay-method-btn ${paymentMethod === 'cod' ? 'active' : ''}`} onClick={() => setPaymentMethod('cod')}>CASH ON DELIVERY</button>
                                  </div>

                                  {paymentMethod === 'card' && (
                                      <div className="card-details fade-in">
                                          <div className="form-group">
                                              <input type="text" name="cardNumber" placeholder="CARD NUMBER (XXXX XXXX XXXX XXXX)" required value={checkoutForm.cardNumber} onChange={handleInputChange} className="cyber-input" />
                                          </div>
                                          <div className="form-row">
                                              <input type="text" name="expiry" placeholder="MM/YY" required value={checkoutForm.expiry} onChange={handleInputChange} className="cyber-input" />
                                              <input type="text" name="cvv" placeholder="CVV" required value={checkoutForm.cvv} onChange={handleInputChange} className="cyber-input" />
                                          </div>
                                      </div>
                                  )}

                                  <button type="submit" className="btn btn-primary checkout-pay-btn" disabled={checkoutState === 'processing'}>
                                      {checkoutState === 'processing' ? 'PROCESSING ENCRYPTION...' : 'AUTHORIZE & PAY NOW'}
                                  </button>
                              </form>
                          </div>

                          {/* Right Column: Summary */}
                          <div className="checkout-summary-container">
                              <div className="glass">
                                  <h3 className="section-subtitle">Order Summary</h3>
                                  <div className="summary-items">
                                      {cart.map((item, idx) => (
                                          <div key={idx} className="summary-item">
                                              <div className="summary-item-info">
                                                  <span className="summary-name">{item.name}</span>
                                                  <span className="summary-qty">QTY: 1</span>
                                              </div>
                                              <span className="summary-price">${item.price}</span>
                                          </div>
                                      ))}
                                  </div>
                                  <div className="summary-total">
                                      <span>TOTAL AMOUNT</span>
                                      <span className="total-value">${cart.reduce((total, item) => total + (item.price || 0), 0)}</span>
                                  </div>
                              </div>
                              <div className="security-badge">
                                  <span className="icon">🔒</span> 256-BIT NEURAL ENCRYPTION ACTIVE
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          )}

          {currentPage === 'home' && (
              <div className="fade-in-page">
                  <header className="hero">
                      <div className="hero-bg">
                        <img src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=2000" alt="Cyber Grid" />
                      </div>
                      <div className="overlay"></div>
                      <div className="hero-content">
                          <h1 className="glitch" data-text="EVOLVE">EVOLVE</h1>
                          <p style={{fontSize: '1.5rem', color: 'var(--accent-cyan)', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '3rem'}}>Integrated Gaming Ecosystem v4.0</p>
                          <div className="hero-buttons">
                              <button onClick={() => setCurrentPage('buy')} className="btn btn-primary">ENTER MARKET</button>
                              <button onClick={() => setCurrentPage('build')} className="btn btn-outline" style={{marginLeft: '20px'}}>ACCESS FORGE</button>
                          </div>
                      </div>
                  </header>

                  <div className="stats-ticker">
                    <div className="ticker-content">
                        <span>// SYSTEM_STATUS: OPTIMAL // SYNCING_NEURAL_LINKS... // 50,248_USERS_ACTIVE // LATENCY: 0.4MS //</span>
                        <span>// SYSTEM_STATUS: OPTIMAL // SYNCING_NEURAL_LINKS... // 50,248_USERS_ACTIVE // LATENCY: 0.4MS //</span>
                    </div>
                  </div>

                  <section className="section">
                      <div className="container">
                          <h2 className="page-title" style={{fontSize: '4rem'}}>Core <span style={{color: 'var(--accent-pink)'}}>Sectors</span></h2>
                          <div className="grid">
                              <div className="glass fade-in" onClick={() => setCurrentPage('buy')}>
                                  <div style={{height: '200px', marginBottom: '2rem', overflow: 'hidden'}}>
                                    <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                                  </div>
                                  <h3>Buy</h3>
                                  <p>High-performance consoles and elite PCs delivered from our cloud inventory.</p>
                                  <button className="btn btn-outline mt-4" style={{width: '100%'}}>GO TO STORE</button>
                              </div>
                              <div className="glass fade-in" onClick={() => setCurrentPage('learn')}>
                                  <div style={{height: '200px', marginBottom: '2rem', overflow: 'hidden'}}>
                                    <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                                  </div>
                                  <h3>Learn</h3>
                                  <p>Master your skills with our pro-gaming academy and masterclasses.</p>
                                  <button className="btn btn-outline mt-4" style={{width: '100%'}}>GO TO ACADEMY</button>
                              </div>
                              <div className="glass fade-in" onClick={() => setCurrentPage('build')}>
                                  <div style={{height: '200px', marginBottom: '2rem', overflow: 'hidden'}}>
                                    <img src="https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=600" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                                  </div>
                                  <h3>Build</h3>
                                  <p>Forge your own universe. Access game development engines, coding tutorials, and asset creation guides.</p>
                                  <button className="btn btn-outline mt-4" style={{width: '100%'}}>GO TO GAME FORGE</button>
                              </div>
                          </div>
                      </div>
                  </section>
              </div>
          )}

          {currentPage === 'buy' && (
              <div className="page-view buy-view" style={{paddingTop: '150px'}}>
                  <div className="container">
                      <h1 className="page-title">GamingX <span style={{color: 'var(--accent-pink)'}}>Store</span></h1>
                      <div className="grid">
                          {products.map(p => (
                              <div className="glass fade-in" key={p._id}>
                                  <div style={{height: '250px', overflow: 'hidden', marginBottom: '2rem'}}>
                                      <img src={p.imageUrl} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                                  </div>
                                  <h3>{p.name}</h3>
                                  <div style={{fontSize: '2rem', color: 'var(--accent-cyan)', fontWeight: 900, marginBottom: '1rem'}}>${p.price}</div>
                                  <p style={{marginBottom: '2rem'}}>{p.description}</p>
                                  <button onClick={() => addToCart(p)} className="btn btn-primary" style={{width: '100%'}}>ACQUIRE UNIT</button>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
          )}

          {currentPage === 'learn' && (
              <div className="page-view learn-view" style={{paddingTop: '150px'}}>
                  <div className="container">
                      <h1 className="page-title">GamingX <span style={{color: 'var(--accent-pink)'}}>Academy</span></h1>
                      <div className="grid">
                          <div className="glass fade-in">
                              <div style={{height: '220px', marginBottom: '1.5rem', borderRadius: '4px', overflow: 'hidden', position: 'relative'}}>
                                  {playingVideos['aim'] ? (
                                      <iframe width="100%" height="100%" src={learnModules.aim.youtubeUrl + "?autoplay=1"} title="Aim Protocol" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                  ) : (
                                      <div style={{width: '100%', height: '100%', cursor: 'pointer'}} onClick={() => playVideo('aim')}>
                                          <img src={learnModules.aim.videoUrl} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                                          <div className="play-overlay" style={{width: '60px', height: '60px', fontSize: '1.5rem', background: 'rgba(0,0,0,0.5)', border: '2px solid var(--accent-cyan)'}}>▶</div>
                                      </div>
                                  )}
                              </div>
                              <h4 style={{color: 'var(--accent-pink)', marginBottom: '0.5rem'}}>MODULE_01</h4>
                              <h3>{learnModules.aim.title}</h3>
                              <p>{learnModules.aim.content}</p>
                          </div>
                          <div className="glass fade-in">
                              <div style={{height: '220px', marginBottom: '1.5rem', borderRadius: '4px', overflow: 'hidden', position: 'relative'}}>
                                  {playingVideos['movement'] ? (
                                      <iframe width="100%" height="100%" src={learnModules.movement.youtubeUrl + "?autoplay=1"} title="Ghost Movement" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                  ) : (
                                      <div style={{width: '100%', height: '100%', cursor: 'pointer'}} onClick={() => playVideo('movement')}>
                                          <img src={learnModules.movement.videoUrl} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                                          <div className="play-overlay" style={{width: '60px', height: '60px', fontSize: '1.5rem', background: 'rgba(0,0,0,0.5)', border: '2px solid var(--accent-cyan)'}}>▶</div>
                                      </div>
                                  )}
                              </div>
                              <h4 style={{color: 'var(--accent-pink)', marginBottom: '0.5rem'}}>MODULE_02</h4>
                              <h3>{learnModules.movement.title}</h3>
                              <p>{learnModules.movement.content}</p>
                          </div>
                          <div className="glass fade-in">
                              <div style={{height: '220px', marginBottom: '1.5rem', borderRadius: '4px', overflow: 'hidden', position: 'relative'}}>
                                  {playingVideos['strategy'] ? (
                                      <iframe width="100%" height="100%" src={learnModules.strategy.youtubeUrl + "?autoplay=1"} title="Game Sense" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                  ) : (
                                      <div style={{width: '100%', height: '100%', cursor: 'pointer'}} onClick={() => playVideo('strategy')}>
                                          <img src={learnModules.strategy.videoUrl} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                                          <div className="play-overlay" style={{width: '60px', height: '60px', fontSize: '1.5rem', background: 'rgba(0,0,0,0.5)', border: '2px solid var(--accent-cyan)'}}>▶</div>
                                      </div>
                                  )}
                              </div>
                              <h4 style={{color: 'var(--accent-pink)', marginBottom: '0.5rem'}}>MODULE_03</h4>
                              <h3>{learnModules.strategy.title}</h3>
                              <p>{learnModules.strategy.content}</p>
                          </div>
                          <div className="glass fade-in">
                              <div style={{height: '220px', marginBottom: '1.5rem', borderRadius: '4px', overflow: 'hidden', position: 'relative'}}>
                                  {playingVideos['optimization'] ? (
                                      <iframe width="100%" height="100%" src={learnModules.optimization.youtubeUrl + "?autoplay=1"} title="FPS Optimization" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                  ) : (
                                      <div style={{width: '100%', height: '100%', cursor: 'pointer'}} onClick={() => playVideo('optimization')}>
                                          <img src={learnModules.optimization.videoUrl} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                                          <div className="play-overlay" style={{width: '60px', height: '60px', fontSize: '1.5rem', background: 'rgba(0,0,0,0.5)', border: '2px solid var(--accent-cyan)'}}>▶</div>
                                      </div>
                                  )}
                              </div>
                              <h4 style={{color: 'var(--accent-pink)', marginBottom: '0.5rem'}}>MODULE_04</h4>
                              <h3>{learnModules.optimization.title}</h3>
                              <p>{learnModules.optimization.content}</p>
                          </div>
                      </div>
                  </div>
              </div>
          )}

          {currentPage === 'build' && (
              <div className="page-view build-view" style={{paddingTop: '150px'}}>
                  <div className="container">
                      <h1 className="page-title">Game <span style={{color: 'var(--accent-pink)'}}>Development Forge</span></h1>
                      <div className="glass fade-in p-5">
                          <div className="build-grid">
                              <div className="build-steps">
                                  <div className="step active">ENGINE_INITIALIZATION</div>
                                  <div className="step">ASSET_PIPELINE</div>
                                  <div className="step">COMPILE_&_RENDER</div>
                              </div>
                              <div className="visual-forge text-center">
                                  <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=800" style={{width: '100%', borderRadius: '10px', border: '1px solid var(--accent-cyan)'}} />
                                  <p className="mt-4" style={{color: 'var(--accent-cyan)', fontWeight: 800, letterSpacing: '5px'}}>COMPILING_SOURCE_CODE...</p>
                                  <div style={{marginTop: '2rem', textAlign: 'left', background: 'rgba(0,0,0,0.5)', padding: '2rem', borderRadius: '8px', borderLeft: '4px solid var(--accent-pink)'}}>
                                      <h3 style={{color: 'var(--accent-pink)', marginBottom: '1rem'}}>START BUILDING YOUR GAME</h3>
                                      <p style={{color: 'var(--text-main)', lineHeight: '1.6'}}>
                                          Whether you are using Unreal Engine 5 for photorealistic graphics, Unity for versatile cross-platform deployment, or Godot for lightweight 2D masterpieces, the Forge is your starting point. Connect with our neural network of developers to access proprietary scripts, 3D character models, and logic blueprints to bring your vision to life.
                                      </p>
                                      <button className="btn btn-primary mt-4" onClick={handleDownloadSDK}>DOWNLOAD SDK</button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          )}

          {currentPage === 'connect' && (
              <div className="page-view connect-view" style={{paddingTop: '150px'}}>
                  <div className="container">
                      <h1 className="page-title">The <span style={{color: 'var(--accent-pink)'}}>Nexus Hub</span></h1>
                      <div className="grid">
                          <div className="glass fade-in text-center">
                              <h3>Global Nexus</h3>
                              <p>Connect with 1.2M elite operators across the network.</p>
                              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-4" style={{display: 'inline-block'}}>JOIN DISCORD</a>
                          </div>
                          <div className="glass fade-in text-center">
                              <h3>Live Stream</h3>
                              <p>Watching: NEURAL_CHAMPIONSHIPS_2026</p>
                              <a href="https://twitch.tv" target="_blank" rel="noopener noreferrer" className="btn btn-outline mt-4" style={{display: 'inline-block'}}>TUNE IN</a>
                          </div>
                      </div>
                  </div>
              </div>
          )}
      </main>

      <footer className="footer">
          <div className="container text-center">
              <div className="logo" style={{marginBottom: '2rem'}}>GAMING<span style={{color: 'var(--accent-pink)'}}>X</span></div>
              <p style={{color: 'var(--text-dim)', marginBottom: '2rem'}}>© 2026 GAMINGX_PORTAL. ALL_RIGHTS_RESERVED. [OS_v4.2.1]</p>
              <button className="nav-btn" onClick={() => setIsAdmin(true)} style={{fontSize: '0.8rem'}}>[ ADMIN_ACCESS ]</button>
          </div>
      </footer>
    </div>
  );
}

export default App;
