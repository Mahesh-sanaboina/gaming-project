"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ShoppingBag, Menu, X, User } from "lucide-react";
import Link from "next/link";

const Navbar = ({ cartCount, onCartOpen, onPageChange, onAdminOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
        isScrolled ? "py-4 bg-background/80 backdrop-blur-xl border-b border-white/5 shadow-premium" : "py-8 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
          onClick={() => onPageChange('home')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 bg-accent-blue rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12">
            <span className="text-white font-orbitron font-black text-lg">A</span>
          </div>
          <span className="text-xl font-orbitron font-bold tracking-tight text-white uppercase">
            AETHER<span className="text-accent-blue">_CORE</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {["HOME", "STORE", "ACADEMY", "BUILD", "CONNECT", "BILLING"].map((item) => (
            <button
              key={item}
              onClick={() => {
                const map = { HOME: 'home', STORE: 'buy', ACADEMY: 'learn', BUILD: 'build', CONNECT: 'connect', BILLING: 'billing' };
                onPageChange(map[item]);
              }}
              className="text-xs font-orbitron font-bold tracking-[0.2em] text-text-muted hover:text-white transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-accent-blue transition-all group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-6">
          <button className="text-text-muted hover:text-white transition-colors">
            <Search size={18} />
          </button>
          <button onClick={onCartOpen} className="text-text-muted hover:text-accent-blue transition-colors relative">
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent-blue text-[10px] w-4 h-4 rounded-full flex items-center justify-center text-white font-bold">
                {cartCount}
              </span>
            )}
          </button>
          <div className="h-4 w-px bg-white/10" />
          <button
            onClick={onAdminOpen}
            className="flex items-center gap-2 text-xs font-orbitron font-bold tracking-widest text-white/50 hover:text-white transition-colors"
          >
            <User size={16} /> ADMIN
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden absolute top-full left-0 w-full bg-background border-b border-white/5 p-8 flex flex-col gap-6 shadow-2xl"
        >
          {["HOME", "STORE", "ACADEMY", "FORGE", "CONNECT", "BILLING"].map((item) => (
            <button
              key={item}
              onClick={() => {
                const map = { HOME: 'home', STORE: 'buy', ACADEMY: 'learn', FORGE: 'build', CONNECT: 'connect', BILLING: 'billing' };
                onPageChange(map[item]);
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-lg font-orbitron font-bold tracking-widest text-white"
            >
              {item}
            </button>
          ))}
          <button onClick={onAdminOpen} className="text-left text-sm font-orbitron font-bold text-accent-blue tracking-widest">
            ADMIN_ACCESS
          </button>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
