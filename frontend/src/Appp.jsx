import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

function App() {
    const [products, setProducts] = useState([]);
    const [email, setEmail] = useState('');
    const [subscribeMessage, setSubscribeMessage] = useState('');
    const [scrolled, setScrolled] = useState(false);

    // Fetch products from backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('https://cf3d442c45582833-124-123-145-113.serveousercontent.com/api/products');
                setProducts(res.data);
            } catch (err) {
                console.error('Error fetching products:', err);
            }
        };
        fetchProducts();
    }, []);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle intersection observer for fade-in animations
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const elementsToAnimate = document.querySelectorAll('.fade-in');
        elementsToAnimate.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, [products]); // Re-run when products load so they get observed

    const handleSubscribe = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://e19e530135377559-124-123-145-113.serveousercontent.com/api/subscribe', { email });
            setSubscribeMessage(res.data.message);
            setEmail('');
        } catch (err) {
            setSubscribeMessage(err.response?.data?.message || 'Subscription failed');
        }
    };

    const consolesAndPCs = products.filter(p => p.category === 'console' || p.category === 'pc');

    return (
        <div>
            {/* Navbar */}
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="logo">
                    <span className="neon-text">GAMING</span>
                </div>
                <ul className="nav-links">
                    <li><a href="#systems">Systems</a></li>
                    <li><a href="#accessories">Accessories</a></li>
                    <li><a href="#features">Features</a></li>
                </ul>
                <a href="#systems" className="btn btn-primary">Shop Now</a>
            </nav>

            {/* Stats Ticker */}
            <div className="stats-ticker">
                <div className="ticker-content">
                    <span>🔥 50,000+ Gamers Online</span>
                    <span>⚡ 1.2M Custom Rigs Built</span>
                    <span>⭐ 4.9/5 Average Rating</span>
                    <span>🚀 99.9% Performance Uptime</span>
                    <span>🔥 50,000+ Gamers Online</span>
                    <span>⚡ 1.2M Custom Rigs Built</span>
                </div>
            </div>

            {/* Hero Section */}
            <header className="hero">
                <div className="hero-bg">
                    <img src="https://images.unsplash.com/photo-1578632292335-df3abbb0d586?auto=format&fit=crop&q=80&w=2000" alt="Unique anime city background" />
                    <div className="overlay"></div>
                </div>
                <div className="unique-orb"></div>
                <div className="particles">
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                    <div className="particle"></div>
                </div>
                <div className="hero-content">
                    <h1 className="glitch" data-text="BEYOND REALITY">BEYOND REALITY</h1>
                    <p>Elevate your gameplay with cutting-edge performance. Engineered for those who demand the absolute best.</p>
                    <div className="hero-buttons">
                        <a href="#systems" className="btn btn-primary glow-btn">Explore Systems</a>
                        <a href="#features" className="btn btn-secondary">Learn More</a>
                    </div>
                </div>
            </header>

            {/* Featured Systems from Database */}
            <section id="systems" className="section">
                <div className="container">
                    <h2 className="section-title fade-in">Next-Gen <span className="neon-text">Power</span></h2>
                    <div className="grid">
                        {consolesAndPCs.length > 0 ? (
                            consolesAndPCs.map(product => (
                                <div className="card glass fade-in" key={product._id}>
                                    <div className="card-img">
                                        <img src={product.imageUrl} alt={product.name} />
                                    </div>
                                    <div className="card-info">
                                        <h3>{product.name}</h3>
                                        <p>{product.description}</p>
                                        <a href="#" className="btn btn-outline">View Details</a>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={{ textAlign: 'center', width: '100%' }}>Loading products from database...</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Accessories */}
            <section id="accessories" className="section dark-section">
                <div className="container">
                    <h2 className="section-title fade-in">Premium <span className="neon-text">Gear</span></h2>
                    <div className="accessory-banner glass fade-in">
                        <div className="accessory-content">
                            <h3>Tactical Advantage</h3>
                            <p>Complete your setup with our line of audiophile-grade headsets and pro-level controllers. Precision engineered for competitive play.</p>
                            <ul className="feature-list">
                                <li><span>✓</span> Ultra-low latency</li>
                                <li><span>✓</span> Premium build quality</li>
                                <li><span>✓</span> Fully customizable RGB</li>
                            </ul>
                            <a href="#" className="btn btn-primary glow-btn mt-4">Shop Accessories</a>
                        </div>
                        <div className="accessory-img">
                            <img src="https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&q=80&w=1000" alt="Premium gaming headset and controller" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="section dark-section">
                <div className="container">
                    <h2 className="section-title fade-in">Gamers' <span className="neon-text">Voices</span></h2>
                    <div className="grid">
                        <div className="testimonial-card glass fade-in">
                            <p>"The performance is unmatched. My custom PC runs everything at 4K without breaking a sweat."</p>
                            <div className="user-info">
                                <h5>Alex Thorne</h5>
                                <span>Professional Streamer</span>
                            </div>
                        </div>
                        <div className="testimonial-card glass fade-in">
                            <p>"The white aesthetic fits my setup perfectly. It's not just a console, it's a piece of art."</p>
                            <div className="user-info">
                                <h5>Sarah Jenkins</h5>
                                <span>Esports Athlete</span>
                            </div>
                        </div>
                        <div className="testimonial-card glass fade-in">
                            <p>"Best customer support I've ever experienced. They helped me pick the perfect rig for my needs."</p>
                            <div className="user-info">
                                <h5>Marcus Dax</h5>
                                <span>Casual Gamer</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Community Section */}
            <section className="section community-section">
                <div className="container text-center">
                    <h2 className="section-title fade-in">Join the <span className="neon-text">Hype</span></h2>
                    <p className="fade-in">Connect with millions of gamers across our global community channels.</p>
                    <div className="social-grid fade-in">
                        <div className="social-box discord">
                            <h4>Discord</h4>
                            <p>Chat with developers and pros.</p>
                            <a href="#" className="btn btn-outline">Join Server</a>
                        </div>
                        <div className="social-box twitch">
                            <h4>Twitch</h4>
                            <p>Watch live tournaments daily.</p>
                            <a href="#" className="btn btn-outline">Follow Us</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="section">
                <div className="container">
                    <div className="features-grid">
                        <div className="feature-box fade-in">
                            <div className="feature-icon">⚡</div>
                            <h4>Hyper Speed</h4>
                            <p>State-of-the-art SSDs and optimized architectures ensure you never wait on a loading screen again.</p>
                        </div>
                        <div className="feature-box fade-in">
                            <div className="feature-icon">👁️</div>
                            <h4>Ray Tracing</h4>
                            <p>Immerse yourself in lifelike environments with real-time ray tracing and advanced lighting engines.</p>
                        </div>
                        <div className="feature-box fade-in">
                            <div className="feature-icon">🌐</div>
                            <h4>Ecosystem</h4>
                            <p>Seamlessly connect your console, PC, and mobile devices through our unified network.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container footer-content">
                    <div className="footer-brand">
                        <div className="logo">
                            <span className="neon-text">GAMING</span>
                        </div>
                        <p>Pushing the boundaries of interactive entertainment.</p>
                    </div>
                    <div className="footer-links">
                        <h4>Products</h4>
                        <ul>
                            <li><a href="#">Consoles</a></li>
                            <li><a href="#">Custom PCs</a></li>
                            <li><a href="#">Accessories</a></li>
                            <li><a href="#">Merch</a></li>
                        </ul>
                    </div>
                    <div className="footer-links">
                        <h4>Support</h4>
                        <ul>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">Warranty</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>
                    <div className="footer-newsletter">
                        <h4>Stay Updated</h4>
                        <form onSubmit={handleSubscribe} className="input-group">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                aria-label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit" className="btn btn-primary">Subscribe</button>
                        </form>
                        {subscribeMessage && <p style={{ marginTop: '10px', color: 'var(--neon-cyan)', fontSize: '0.9rem' }}>{subscribeMessage}</p>}
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 Gaming. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default App;
