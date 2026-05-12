"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, ShoppingCart, ArrowRight } from "lucide-react";

const GameCard = ({ title, price, image, rating, category, onAdd }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      className="group relative min-w-[320px] md:min-w-[400px] h-[500px] rounded-[2.5rem] overflow-hidden glass-card border-white/10 transition-all duration-500"
    >
      {/* Background Image */}
      <img 
        src={image} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0" 
      />
      
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
      
      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="flex items-center justify-between mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <span className="px-3 py-1 bg-accent-blue/20 backdrop-blur-md text-accent-blue text-[10px] font-orbitron font-bold rounded-lg border border-accent-blue/20 uppercase tracking-widest">
            {category}
          </span>
          <div className="flex items-center gap-1">
            <Star size={12} fill="#FACC15" className="text-yellow-400" />
            <span className="text-[10px] font-orbitron font-bold text-white">{rating}</span>
          </div>
        </div>

        <h3 className="text-2xl font-orbitron font-black text-white mb-2 leading-tight uppercase tracking-tighter group-hover:text-accent-cyan transition-colors">
          {title}
        </h3>
        
        <p className="text-text-muted text-xs font-poppins mb-6 line-clamp-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          Deploy into high-fidelity environments with zero latency and neural-optimized hardware.
        </p>

        <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700">
          <div className="text-2xl font-orbitron font-black text-white">₹{price}</div>
          
          <button 
            onClick={(e) => { e.stopPropagation(); onAdd(); }}
            className="flex items-center gap-2 px-6 py-3 bg-accent-blue hover:bg-accent-purple text-white text-[10px] font-orbitron font-black rounded-xl transition-all shadow-glow-blue"
          >
            ACQUIRE <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Hover Border Glow */}
      <div className="absolute inset-0 rounded-[2.5rem] border-2 border-accent-blue/0 group-hover:border-accent-blue/30 transition-all duration-500 pointer-events-none" />
    </motion.div>
  );
};

export default GameCard;
