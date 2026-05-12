"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Swords, Trophy, Map, Ghost, Users, Cpu, Layers } from "lucide-react";

const categories = [
  { name: "FPS", icon: Target, color: "text-accent-blue" },
  { name: "BATTLE ROYALE", icon: Swords, color: "text-accent-purple" },
  { name: "ESPORTS", icon: Trophy, color: "text-accent-cyan" },
  { name: "OPEN WORLD", icon: Map, color: "text-green-400" },
  { name: "NEURAL", icon: Cpu, color: "text-pink-500" },
  { name: "SYSTEMS", icon: Layers, color: "text-yellow-400" },
];

const CategoryGrid = ({ onSelect }) => {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px w-20 bg-accent-blue" />
          <h2 className="text-4xl font-orbitron font-black text-white uppercase tracking-tighter">
            EXPLORE <span className="text-accent-blue">SECTORS</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              onClick={onSelect}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="group relative cursor-pointer"
            >
              <div className="aspect-square glass-card rounded-[2rem] flex flex-col items-center justify-center transition-all duration-500 group-hover:bg-white/5 border-white/5 group-hover:border-accent-blue/50 group-hover:shadow-glow-blue overflow-hidden">
                <div className={`mb-4 ${cat.color} group-hover:scale-110 transition-transform duration-500`}>
                  <cat.icon size={40} strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-orbitron font-black tracking-[0.2em] text-text-muted group-hover:text-white transition-colors text-center px-4">
                  {cat.name}
                </span>
                
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-accent-blue/0 group-hover:border-accent-blue/50 transition-all rounded-tr-[2rem]" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-accent-blue/0 group-hover:border-accent-blue/50 transition-all rounded-bl-[2rem]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
