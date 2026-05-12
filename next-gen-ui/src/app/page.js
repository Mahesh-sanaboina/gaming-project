"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { 
  ShoppingBag, 
  X, 
  Trash2, 
  CheckCircle, 
  ChevronRight, 
  Send, 
  Play, 
  ShieldCheck, 
  MessageSquare,
  Radio,
  Mail,
  Zap,
  Target,
  Globe
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GameCard from "@/components/GameCard";
import EsportsSection from "@/components/EsportsSection";
import AdminDashboard from "@/components/AdminDashboard";
import PaymentGateway from "@/components/PaymentGateway";
import PaymentHistory from "@/components/PaymentHistory";

const API_BASE_URL = "http://localhost:5000";
axios.defaults.baseURL = API_BASE_URL;

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isGatewayOpen, setIsGatewayOpen] = useState(false);
  const [checkoutState, setCheckoutState] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [playingVideos, setPlayingVideos] = useState({});

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

  const playVideo = (key) => {
    setPlayingVideos(prev => ({ ...prev, [key]: true }));
  };

  const handleDownloadSDK = () => {
    const element = document.createElement("a");
    const fileContent = `=========================================
 AETHER CORE NEURAL SDK & DEV GUIDE v1.0.4
=========================================
// ACCESS_GRANTED: USER_OPERATOR_01
`;
    const file = new Blob([fileContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "AetherCore_Neural_Guide.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`/api/products`);
        if (res.data && res.data.length > 0) setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (idx) => {
    setCart(cart.filter((_, i) => i !== idx));
  };

  const executeOrderSync = () => {
    setCheckoutState('success');
    setCart([]);
    setIsGatewayOpen(false);
  };

  return (
    <main className="relative min-h-screen bg-[#0B1120] text-[#F9FAFB] font-poppins selection:bg-accent-blue/30 overflow-x-hidden">
      <Navbar 
        cartCount={cart.length} 
        onCartOpen={() => setIsCartOpen(true)} 
        onPageChange={setCurrentPage} 
        onAdminOpen={() => setIsAdmin(true)}
      />

      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Hero onExplore={() => setCurrentPage('buy')} />
            
            {/* Featured Collection - Horizontal Scroll */}
            <div className="py-32 relative overflow-hidden">
              <div className="container mx-auto px-6 mb-16 flex justify-between items-end">
                <div>
                  <h2 className="text-5xl font-orbitron font-black text-white uppercase tracking-tighter mb-4">
                    FEATURED <span className="text-accent-blue">UNITS</span>
                  </h2>
                  <p className="text-text-muted font-orbitron text-[10px] tracking-[0.4em] uppercase">High-Performance Neural Gear</p>
                </div>
                <button onClick={() => setCurrentPage('buy')} className="group flex items-center gap-2 text-accent-cyan font-orbitron text-[10px] font-black tracking-widest hover:text-white transition-all">
                  VIEW_ALL_STOCK <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              <div className="flex overflow-x-auto gap-8 px-6 pb-12 no-scrollbar cursor-grab active:cursor-grabbing">
                {products.slice(0, 6).map((p, i) => (
                  <GameCard key={p._id} title={p.name} price={p.price} image={p.imageUrl} rating={4.8} category={p.category} onAdd={() => addToCart(p)} />
                ))}
              </div>
            </div>

            {/* Trending Section - Carousel Style */}
            <section className="py-32 bg-white/[0.02]">
              <div className="container mx-auto px-6 mb-20 text-center">
                <h2 className="text-4xl font-orbitron font-black text-white uppercase mb-4 tracking-tight">TRENDING_NOW</h2>
                <div className="w-20 h-1 bg-accent-purple mx-auto" />
              </div>
              <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {products.slice(6, 9).map((p, i) => (
                  <motion.div 
                    key={p._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -10 }}
                    className="relative group rounded-[2.5rem] overflow-hidden glass-card h-[400px]"
                  >
                    <img src={p.imageUrl} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="text-[10px] font-orbitron font-bold text-accent-purple mb-2">#0{i+1}_TRENDING</div>
                      <h3 className="text-2xl font-orbitron font-black text-white mb-4">{p.name}</h3>
                      <button onClick={() => addToCart(p)} className="text-white font-orbitron text-[10px] font-black tracking-widest flex items-center gap-2 group-hover:text-accent-cyan transition-colors">
                        ACQUIRE_NOW <ChevronRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <EsportsSection />

            {/* Community Section - Discord Inspired */}
            <section className="py-32 relative overflow-hidden">
              <div className="container mx-auto px-6">
                <div className="glass-card rounded-[4rem] p-16 relative overflow-hidden border-white/5">
                  <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-accent-blue/5 blur-[100px] rounded-full" />
                  <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
                    <div>
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-[#5865F2] rounded-2xl flex items-center justify-center text-white">
                          <MessageSquare size={24} />
                        </div>
                        <span className="text-white font-orbitron font-black tracking-widest uppercase">The_Nexus_Network</span>
                      </div>
                      <h2 className="text-5xl font-orbitron font-black text-white mb-8 tracking-tighter leading-tight">
                        JOIN THE <br />
                        <span className="text-accent-blue">COMMUNITY.</span>
                      </h2>
                      <p className="text-text-muted font-poppins text-lg mb-12 leading-relaxed">
                        Connect with 2.4M elite operators. Share strategies, form squads, and dominate the leaderboards in real-time.
                      </p>
                      <div className="flex items-center gap-8 mb-12">
                        <div>
                          <div className="text-3xl font-orbitron font-black text-white">1.2M</div>
                          <div className="text-[10px] text-text-muted font-orbitron tracking-widest">ONLINE_OPERATORS</div>
                        </div>
                        <div className="w-px h-10 bg-white/10" />
                        <div>
                          <div className="text-3xl font-orbitron font-black text-white">450+</div>
                          <div className="text-[10px] text-text-muted font-orbitron tracking-widest">ACTIVE_SQUADS</div>
                        </div>
                      </div>
                      <a 
                        href="https://discord.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-12 py-5 bg-[#5865F2] hover:bg-[#4752C4] text-white font-orbitron font-black tracking-widest rounded-2xl transition-all shadow-glow-blue flex items-center gap-3 w-fit"
                      >
                        JOIN_DISCORD <ChevronRight size={18} />
                      </a>
                    </div>
                    <div className="relative">
                      {/* Floating Avatars Grid */}
                      <div className="grid grid-cols-3 gap-4">
                        {[1,2,3,4,5,6,7,8,9].map(i => (
                          <motion.div
                            key={i}
                            animate={{ y: [0, Math.sin(i) * 20, 0] }}
                            transition={{ duration: 3 + i, repeat: Infinity }}
                            className="aspect-square rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
                          >
                            <img src={`https://i.pravatar.cc/150?u=${i}`} className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {currentPage === 'buy' && (
          <motion.div key="buy" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pt-32 pb-24 container mx-auto px-6">
            <div className="text-center mb-20">
              <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-6 tracking-tighter">THE <span className="text-accent-blue">STORE</span></h1>
              <p className="text-text-muted font-orbitron tracking-[0.4em] text-xs uppercase">Official_Neural_Hardware_Source</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {products.map(p => (
                <GameCard key={p._id} title={p.name} price={p.price} image={p.imageUrl} rating={4.9} category={p.category} onAdd={() => addToCart(p)} />
              ))}
            </div>
          </motion.div>
        )}

        {currentPage === 'checkout' && (
          <motion.div key="checkout" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 pb-24 container mx-auto px-6">
             <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20">
                <div className="bg-card-bg p-12 rounded-[2.5rem] border border-white/5 shadow-premium">
                  <h2 className="text-3xl font-orbitron font-black mb-10 text-white tracking-widest">ORDER_DETAILS</h2>
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-orbitron text-text-muted tracking-widest">FULL_NAME</label>
                      <input type="text" className="w-full bg-background border border-white/5 p-4 font-poppins text-sm rounded-xl focus:border-accent-blue outline-none transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[10px] font-orbitron text-text-muted tracking-widest">EMAIL_ADDRESS</label>
                        <input type="email" className="w-full bg-background border border-white/5 p-4 font-poppins text-sm rounded-xl focus:border-accent-blue outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-orbitron text-text-muted tracking-widest">PHONE_UNIT</label>
                        <input type="tel" className="w-full bg-background border border-white/5 p-4 font-poppins text-sm rounded-xl focus:border-accent-blue outline-none" />
                      </div>
                    </div>
                    <button onClick={() => setIsGatewayOpen(true)} className="w-full py-5 premium-gradient text-white font-orbitron font-black tracking-widest rounded-2xl hover:scale-[1.02] transition-all shadow-glow-blue mt-6">
                      COMPLETE AUTHORIZATION
                    </button>
                  </div>
                </div>
                <div className="space-y-10">
                  <div className="bg-card-bg p-10 rounded-[2.5rem] border border-white/5 shadow-premium">
                    <h3 className="text-xs font-orbitron font-bold mb-8 text-text-muted tracking-widest">CART_SUMMARY</h3>
                    <div className="space-y-6 mb-10">
                      {cart.map((item, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                          <span className="font-poppins text-white/80">{item.name}</span>
                          <span className="text-white font-orbitron font-bold">${item.price}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-8 border-t border-white/5">
                      <span className="text-xs font-orbitron font-bold text-text-muted">GRAND TOTAL</span>
                      <span className="text-3xl font-orbitron font-black text-accent-blue">${cart.reduce((t, i) => t + (i.price || 0), 0)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-orbitron text-text-muted tracking-widest px-6">
                    <ShieldCheck size={18} className="text-accent-blue" /> ENCRYPTED TRANSACTION SECURE
                  </div>
                </div>
             </div>
          </motion.div>
        )}

        {currentPage === 'learn' && (
          <motion.div key="learn" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pt-32 pb-24 container mx-auto px-6">
            <div className="text-center mb-20">
              <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-6 tracking-tighter">THE <span className="text-accent-blue">ACADEMY</span></h1>
              <p className="text-text-muted font-orbitron tracking-[0.4em] text-xs uppercase">NEURAL_SKILL_ACQUISITION</p>
            </div>
            <div className="grid md:grid-cols-2 gap-10">
              {Object.entries(learnModules).map(([key, module]) => (
                <div key={key} className="bg-card-bg rounded-[2.5rem] border border-white/5 overflow-hidden group">
                  <div className="aspect-video relative overflow-hidden">
                    {playingVideos[key] ? (
                      <iframe className="w-full h-full" src={`${module.youtubeUrl}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    ) : (
                      <div className="w-full h-full cursor-pointer group" onClick={() => playVideo(key)}>
                        <img src={module.videoUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 bg-accent-blue rounded-full flex items-center justify-center text-white shadow-glow-blue transition-transform group-hover:scale-110">
                            <Play size={32} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-10">
                    <h3 className="text-2xl font-orbitron font-black text-white mb-4 uppercase">{module.title}</h3>
                    <p className="text-text-muted leading-relaxed font-poppins">{module.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {currentPage === 'build' && (
          <motion.div key="build" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="pt-32 pb-24 container mx-auto px-6">
            <div className="max-w-5xl mx-auto bg-card-bg p-16 rounded-[3rem] border border-white/5 shadow-premium text-center">
              <div className="w-full h-[500px] rounded-3xl overflow-hidden mb-12 border border-white/10 relative">
                <img src="/build-forge.png" className="w-full h-full object-cover" alt="The Build Matrix" />
                <div className="absolute inset-0 bg-gradient-to-t from-card-bg via-transparent to-transparent opacity-60" />
              </div>
              <div className="w-20 h-20 bg-accent-blue/10 rounded-3xl flex items-center justify-center text-accent-blue mx-auto mb-10">
                <Send size={40} />
              </div>
              <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-8 tracking-tighter">THE <span className="text-accent-blue">BUILD</span></h1>
              <p className="text-xl text-text-muted max-w-2xl mx-auto mb-12 font-poppins leading-relaxed">
                Forge your own digital universe. Access proprietary SDKs, logic blueprints, and advanced asset creation guides.
              </p>
              <div className="bg-background/50 rounded-2xl p-8 border border-white/5 mb-12 text-left font-mono text-xs text-accent-cyan/80 leading-relaxed">
                <p>// INITIALIZING_SDK_COMPILATION...</p>
                <p>// NEURAL_LOGIC_BLUEPRINTS_LOADED [OK]</p>
                <p>// ACCESS_GRANTED: USER_OPERATOR_01</p>
              </div>
              <button onClick={handleDownloadSDK} className="px-12 py-6 premium-gradient text-white font-orbitron font-black tracking-widest rounded-2xl hover:scale-105 transition-all shadow-glow-blue">
                DOWNLOAD NEURAL SDK
              </button>
            </div>
          </motion.div>
        )}

        {currentPage === 'connect' && (
          <motion.div key="connect" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 pb-24 container mx-auto px-6">
            <div className="text-center mb-20">
              <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-6 tracking-tighter"><span className="text-accent-blue">CONNECT</span></h1>
              <p className="text-text-muted font-orbitron tracking-[0.4em] text-xs uppercase">GLOBAL_OPERATOR_NETWORK</p>
            </div>
            <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
              <div className="bg-card-bg p-12 rounded-[2.5rem] border border-white/5 shadow-premium text-center hover:border-accent-blue/30 transition-all group">
                <MessageSquare size={48} className="text-accent-blue mx-auto mb-8 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-orbitron font-black text-white mb-4">DISCORD_NET</h3>
                <p className="text-text-muted mb-8 font-poppins">Join 1.2M+ operators in our encrypted tactical communication hub.</p>
                <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="inline-block px-10 py-4 bg-white/5 border border-white/10 text-white font-orbitron font-bold text-xs tracking-widest rounded-xl hover:bg-accent-blue transition-all">JOIN_LINK</a>
              </div>
              <div className="bg-card-bg p-12 rounded-[2.5rem] border border-white/5 shadow-premium text-center hover:border-accent-blue/30 transition-all group">
                <Play size={48} className="text-accent-blue mx-auto mb-8 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-orbitron font-black text-white mb-4">TWITCH_LIVE</h3>
                <p className="text-text-muted mb-8 font-poppins">Watch the neural championships live and participate in global drops.</p>
                <a href="https://twitch.tv" target="_blank" rel="noopener noreferrer" className="inline-block px-10 py-4 bg-white/5 border border-white/10 text-white font-orbitron font-bold text-xs tracking-widest rounded-xl hover:bg-accent-blue transition-all">TUNE_IN</a>
              </div>
            </div>
          </motion.div>
        )}

        {currentPage === 'billing' && (
          <motion.div key="billing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pt-32 pb-24 container mx-auto px-6">
            <PaymentHistory />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[2000] flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="relative w-full max-w-md bg-card-bg h-full shadow-2xl border-l border-white/5 p-8 flex flex-col">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-orbitron font-black text-white tracking-widest">STORAGE_UNIT</h2>
                <button onClick={() => setIsCartOpen(false)} className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto no-scrollbar space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-text-muted">
                    <ShoppingBag size={48} className="mb-4 opacity-20" />
                    <p className="font-orbitron text-xs tracking-widest uppercase">STORAGE_EMPTY</p>
                  </div>
                ) : (
                  cart.map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 glass-card rounded-2xl group border-white/5">
                      <img src={item.imageUrl} className="w-20 h-20 object-cover rounded-xl" />
                      <div className="flex-1">
                        <h4 className="text-white font-orbitron font-bold text-xs uppercase mb-1">{item.name}</h4>
                        <p className="text-accent-blue font-orbitron font-black">₹{item.price}</p>
                      </div>
                      <button onClick={() => removeFromCart(i)} className="text-red-500/50 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
              {cart.length > 0 && (
                <div className="pt-8 mt-auto border-t border-white/5">
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-text-muted font-orbitron text-[10px] tracking-widest">SUBTOTAL</span>
                    <span className="text-2xl font-orbitron font-black text-white">₹{cart.reduce((t, i) => t + (i.price || 0), 0)}</span>
                  </div>
                  <button onClick={() => { setIsCartOpen(false); setCurrentPage('checkout'); }} className="w-full py-5 premium-gradient text-white font-orbitron font-black tracking-widest rounded-2xl hover:scale-[1.02] transition-all shadow-glow-blue">
                    INITIALIZE_CHECKOUT
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Payment Gateway Modal */}
      {isGatewayOpen && (
        <PaymentGateway 
          onCancel={() => setIsGatewayOpen(false)} 
          onSuccess={executeOrderSync} 
          amount={cart.reduce((t, i) => t + (i.price || 0), 0)}
          products={cart}
        />
      )}

      {/* Admin Dashboard Overlay */}
      {isAdmin && <AdminDashboard onBack={() => setIsAdmin(false)} />}

      {/* Success Modal */}
      {checkoutState === 'success' && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center bg-background/95 backdrop-blur-3xl p-6">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-card-bg max-w-lg w-full p-16 rounded-[3rem] text-center border border-white/10 shadow-2xl">
            <CheckCircle size={64} className="text-accent-blue mx-auto mb-8" />
            <h2 className="text-4xl font-orbitron font-black text-white mb-4">SUCCESS!</h2>
            <p className="text-text-muted mb-10 font-poppins text-lg">Your order is being processed. View details in your Billing section.</p>
            <button onClick={() => setCheckoutState(null)} className="w-full py-5 bg-white text-black font-orbitron font-black tracking-widest rounded-2xl hover:bg-accent-blue hover:text-white transition-all">BACK TO HOME</button>
          </motion.div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-24 bg-[#080C16] border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-white/10 to-transparent" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-white/10 to-transparent" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-white/10 to-transparent" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-4 gap-20 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-accent-blue rounded-xl flex items-center justify-center text-white font-black text-xl">A</div>
                <span className="text-2xl font-orbitron font-bold tracking-tight text-white uppercase">AETHER<span className="text-accent-blue">_CORE</span></span>
              </div>
              <p className="text-text-muted max-w-md font-poppins leading-relaxed text-lg mb-10 opacity-80">
                The global benchmark for high-fidelity neural ecosystems. Engineered for operators who demand absolute precision, zero latency, and photorealistic dominance.
              </p>
              <div className="flex gap-4">
                {[
                  { Icon: X, href: "https://twitter.com" },
                  { Icon: Radio, href: "https://twitch.tv" },
                  { Icon: MessageSquare, href: "https://discord.com" },
                  { Icon: Mail, href: "mailto:support@aether-core.com" }
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-text-muted hover:text-white hover:bg-accent-blue hover:shadow-glow-blue transition-all border border-white/10"
                  >
                    <social.Icon size={24} />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-xs font-orbitron font-black text-white mb-10 tracking-[0.4em] uppercase">NETWORK_NODES</h4>
              <ul className="space-y-6">
                {['Global Leaderboards', 'Tournament Schedule', 'Regional Connect', 'Neural Hardware', 'Beta Access'].map(link => (
                  <li key={link}>
                    <a href="#" className="text-text-muted hover:text-accent-cyan transition-colors font-poppins flex items-center gap-2 group">
                      <div className="w-0 group-hover:w-4 h-px bg-accent-cyan transition-all" /> {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-orbitron font-black text-white mb-10 tracking-[0.4em] uppercase">SYSTEM_SUPPORT</h4>
              <ul className="space-y-6">
                {['Direct Terminal', 'Neural Link Setup', 'Hardware Warranty', 'operator Protocol', 'Secure Sync'].map(link => (
                  <li key={link}>
                    <a href="#" className="text-text-muted hover:text-accent-blue transition-colors font-poppins flex items-center gap-2 group">
                      <div className="w-0 group-hover:w-4 h-px bg-accent-blue transition-all" /> {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-8">
            <p className="text-[10px] font-orbitron text-text-muted tracking-[0.3em] uppercase">© 2026 AETHER CORE GRID. [OPERATOR_PROTOCOL_SECURED]</p>
            <div className="flex gap-10 text-[10px] font-orbitron text-text-muted tracking-[0.3em] uppercase">
              <a href="#" className="hover:text-white transition-colors">TERMS_OF_SERVICE</a>
              <a href="#" className="hover:text-white transition-colors">PRIVACY_ENCRYPTION</a>
              <a href="#" className="hover:text-white transition-colors">COOKIE_LOGS</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
