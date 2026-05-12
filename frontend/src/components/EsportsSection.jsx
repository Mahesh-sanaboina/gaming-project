"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, Users, Radio, ChevronRight, Globe } from "lucide-react";

const EsportsSection = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-[#0B1120]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Radio size={16} className="text-red-500 animate-pulse" />
              <span className="text-xs font-orbitron font-bold text-red-500 tracking-[0.3em] uppercase">Live_Transmission</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-orbitron font-black text-white uppercase tracking-tighter">
              NEURAL <span className="text-accent-blue">CHAMPIONSHIPS</span>
            </h2>
          </div>
          <button className="px-10 py-4 bg-white/5 border border-white/10 text-white font-orbitron font-black text-[10px] tracking-widest rounded-xl hover:bg-accent-blue transition-all">
            VIEW_FULL_BRACKET
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Broadcast View */}
            <a 
              href="https://twitch.tv" 
              target="_blank" 
              rel="noopener noreferrer"
              className="lg:col-span-2 group relative aspect-video rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl block"
            >
              <img 
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt="Live Broadcast"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              
              <div className="absolute top-8 left-8 flex gap-4">
                <div className="px-4 py-2 bg-red-600 text-white font-orbitron font-black text-[10px] tracking-widest rounded-lg flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" /> LIVE
                </div>
                <div className="px-4 py-2 bg-black/60 backdrop-blur-md text-white font-orbitron font-bold text-[10px] tracking-widest rounded-lg">
                  842.5K VIEWERS
                </div>
              </div>

              <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                <div>
                  <h3 className="text-3xl font-orbitron font-black text-white mb-2">NEURAL FINALS 2026</h3>
                  <p className="text-text-muted font-poppins text-sm">TEAM_NEXUS vs TEAM_VOID | MAP: CYBER_CITY</p>
                </div>
                <div className="w-16 h-16 bg-accent-blue rounded-2xl flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                  <Radio size={24} />
                </div>
              </div>
            </a>

          {/* Tournament Sidebar */}
          <div className="space-y-6">
            {[
              { team1: 'OMEGA', team2: 'ALPHA', time: 'UPCOMING', prize: '$50,000' },
              { team1: 'STORM', team2: 'GHOST', time: 'UPCOMING', prize: '$25,000' },
              { team1: 'ZENITH', team2: 'VOX', time: 'COMPLETED', prize: '$100,000' },
            ].map((match, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 rounded-[2rem] border-white/5 hover:border-accent-blue/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-orbitron font-bold text-accent-cyan tracking-widest uppercase">{match.time}</span>
                  <span className="text-[10px] font-orbitron font-bold text-text-muted">{match.prize}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-orbitron font-black text-white group-hover:text-accent-blue transition-colors">{match.team1}</div>
                  <div className="text-[10px] font-orbitron font-black text-text-muted">VS</div>
                  <div className="text-lg font-orbitron font-black text-white group-hover:text-accent-blue transition-colors">{match.team2}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EsportsSection;
