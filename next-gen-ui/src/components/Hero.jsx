"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, PlayCircle, Shield, Zap, Target } from "lucide-react";

const Hero = ({ onExplore }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0B1120]">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-blue/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-purple/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-20 items-center">
        {/* Left Side: Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="w-2 h-2 bg-accent-cyan rounded-full animate-ping" />
            <span className="text-[10px] font-orbitron font-bold tracking-[0.3em] text-accent-cyan uppercase">System_Active_v5.0</span>
          </div>

          <h1 className="text-7xl md:text-9xl font-orbitron font-black leading-[0.9] mb-8 tracking-tighter text-white">
            BEYOND <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan">LIMITS.</span>
          </h1>

          <p className="text-lg md:text-xl text-secondary-text font-poppins max-w-xl mb-12 leading-relaxed opacity-80">
            The next generation of high-fidelity gaming is here. Experience zero-latency performance, neural-link connectivity, and photorealistic environments.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 mb-16">
            <button 
              onClick={onExplore}
              className="group relative px-10 py-5 bg-accent-blue rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-glow-blue"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent-purple opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 text-white font-orbitron font-black tracking-widest flex items-center gap-2">
                ENTER_STATION <ChevronRight size={18} />
              </span>
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 text-white font-orbitron font-bold tracking-widest rounded-2xl hover:bg-white/10 transition-all flex items-center gap-3">
              WATCH_TRAILER <PlayCircle size={20} className="text-accent-cyan" />
            </button>
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-3 gap-8 border-t border-white/5 pt-12">
            {[
              { label: 'ACTIVE_PLAYERS', value: '2.4M', icon: Zap },
              { label: 'SERVER_PING', value: '0.4MS', icon: Target },
              { label: 'UPTIME', value: '99.9%', icon: Shield },
            ].map((stat, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                key={stat.label}
              >
                <div className="flex items-center gap-2 text-accent-blue mb-1">
                  <stat.icon size={14} />
                  <span className="text-[10px] font-orbitron font-black tracking-widest">{stat.value}</span>
                </div>
                <div className="text-[9px] text-text-muted font-orbitron uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Visuals */}
        <div className="relative hidden lg:block h-[800px]">
          <motion.div style={{ y: y1 }} className="absolute top-20 right-0 z-20 w-[450px]">
            <div className="glass-card rounded-[3rem] p-4 overflow-hidden transform rotate-6 border-white/20 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800" 
                className="w-full h-[500px] object-cover rounded-[2.5rem]"
              />
              <div className="absolute bottom-10 left-10 right-10 p-6 glass-card rounded-2xl">
                <div className="text-[10px] text-accent-cyan font-orbitron font-bold mb-2 uppercase">Featured_Combat</div>
                <div className="text-2xl font-orbitron font-black text-white uppercase">NEURAL_VOID</div>
              </div>
            </div>
          </motion.div>

          <motion.div style={{ y: y2 }} className="absolute bottom-40 -left-10 z-10 w-[350px]">
            <div className="glass-card rounded-[2.5rem] p-3 overflow-hidden transform -rotate-12 border-white/10 opacity-60">
              <img 
                src="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=800" 
                className="w-full h-[400px] object-cover rounded-[2rem]"
              />
            </div>
          </motion.div>

          {/* Decorative Floating Shapes */}
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-40 left-20 w-32 h-32 bg-accent-blue/20 blur-2xl rounded-full"
          />
          <motion.div
            animate={{ 
              y: [0, 30, 0],
              rotate: [0, -15, 0]
            }}
            transition={{ duration: 7, repeat: Infinity }}
            className="absolute bottom-20 right-20 w-48 h-48 bg-accent-purple/20 blur-3xl rounded-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
