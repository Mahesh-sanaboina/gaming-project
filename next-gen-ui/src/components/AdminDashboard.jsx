"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Activity, 
  Plus, 
  Trash2, 
  X, 
  ArrowLeft, 
  TrendingUp, 
  DollarSign, 
  ShieldCheck, 
  Download,
  Search
} from 'lucide-react';
import { jsPDF } from "jspdf";

const AdminDashboard = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState('overview'); // overview, products, financials, subscribers
    const [products, setProducts] = useState([]);
    const [subscribers, setSubscribers] = useState([]);
    const [payments, setPayments] = useState([]);
    const [logs, setLogs] = useState([
        { id: 1, time: new Date().toLocaleTimeString(), msg: 'SYSTEM_BOOT: Admin Command Center active.' },
        { id: 2, time: new Date().toLocaleTimeString(), msg: 'ENCRYPTION: 256-bit neural link established.' }
    ]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'accessory', description: '', imageUrl: '' });
    const [paymentSearch, setPaymentSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const prodRes = await axios.get('/api/products');
                setProducts(prodRes.data);
                const subRes = await axios.get('/api/subscribers');
                setSubscribers(subRes.data);
                const payRes = await axios.get('/api/payments/history'); // Admin version should ideally fetch all
                setPayments(payRes.data);
                addLog('DATA_SYNC: All database records synchronized.');
            } catch (err) {
                addLog('CRITICAL_ERROR: Failed to fetch database records.');
            }
        };
        fetchData();
    }, []);

    const addLog = (msg) => {
        setLogs(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg }, ...prev.slice(0, 19)]);
    };

    const generateInvoice = (details) => {
        const doc = new jsPDF();
        doc.setFillColor(11, 17, 32);
        doc.rect(0, 0, 210, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.text("AETHER_CORE", 20, 25);
        doc.setTextColor(0, 0, 0);
        doc.text(`Invoice ID: ${details.transactionId}`, 20, 60);
        doc.save(`Admin_Copy_${details.transactionId}.pdf`);
    };

    const totalRevenue = payments.reduce((sum, p) => sum + (p.status === 'success' ? p.amount : 0), 0);

    return (
        <div className="fixed inset-0 z-[10000] bg-[#050505] overflow-y-auto no-scrollbar font-poppins">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(13,10,25,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(13,10,25,0.8)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none opacity-20" />
            
            <div className="container mx-auto px-6 py-12 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-orbitron font-black text-white glitch" data-text="ADMIN_DASHBOARD">ADMIN_DASHBOARD</h1>
                        <div className="flex items-center gap-3 mt-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <p className="text-accent-cyan font-orbitron text-xs tracking-[0.3em]">SECURE_ROOT_ACCESS [AUTHORIZED]</p>
                        </div>
                    </div>
                    {onBack && (
                        <button onClick={onBack} className="group flex items-center gap-2 px-6 py-3 glass border-white/5 rounded-full text-white/50 hover:text-white transition-all">
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
                            <span className="font-orbitron text-xs tracking-widest">EXIT_TERMINAL</span>
                        </button>
                    )}
                </div>

                {/* Navigation Tabs */}
                <div className="flex gap-4 mb-12 overflow-x-auto no-scrollbar pb-4 border-b border-white/5">
                    {[
                        { id: 'overview', label: 'OVERVIEW', icon: LayoutDashboard },
                        { id: 'products', label: 'INVENTORY', icon: Package },
                        { id: 'financials', label: 'FINANCIALS', icon: DollarSign },
                        { id: 'subscribers', label: 'DATABASE', icon: Users },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-orbitron text-[10px] tracking-widest transition-all ${
                                activeTab === tab.id ? 'bg-accent-blue text-white shadow-glow-blue' : 'text-white/40 hover:text-white'
                            }`}
                        >
                            <tab.icon size={14} /> {tab.label}
                        </button>
                    ))}
                </div>

                {activeTab === 'overview' && (
                    <div className="space-y-12">
                        <div className="grid md:grid-cols-4 gap-8">
                            {[
                                { label: 'TOTAL_REVENUE', value: `$${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: 'accent-cyan' },
                                { label: 'ACTIVE_USERS', value: subscribers.length.toString(), icon: Users, color: 'accent-purple' },
                                { label: 'TOTAL_ORDERS', value: payments.length.toString(), icon: ShieldCheck, color: 'accent-blue' },
                                { label: 'DB_UPTIME', value: '99.99%', icon: Activity, color: 'accent-pink' },
                            ].map((stat) => (
                                <div key={stat.label} className="glass p-8 rounded-[2rem] border-white/5 relative group">
                                    <div className={`absolute top-0 left-0 w-1 h-full bg-${stat.color} opacity-30`} />
                                    <stat.icon className={`text-${stat.color} mb-4`} size={24} />
                                    <h3 className="text-white/40 font-orbitron text-[10px] tracking-widest mb-2">{stat.label}</h3>
                                    <div className="text-3xl font-orbitron font-black text-white">{stat.value}</div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="grid lg:grid-cols-2 gap-8">
                            <div className="glass rounded-[2.5rem] p-10 border-white/5">
                                <h3 className="text-xs font-orbitron font-bold tracking-widest text-white mb-8">RECENT_TRANSACTIONS</h3>
                                <div className="space-y-4">
                                    {payments.slice(0, 5).map(pay => (
                                        <div key={pay._id} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-accent-blue/10 rounded-xl flex items-center justify-center text-accent-blue">
                                                    <DollarSign size={18} />
                                                </div>
                                                <div>
                                                    <div className="text-xs font-orbitron font-bold text-white tracking-widest">{pay.userName}</div>
                                                    <div className="text-[10px] text-white/30 uppercase">{new Date(pay.timestamp).toLocaleDateString()}</div>
                                                </div>
                                            </div>
                                            <div className="text-sm font-orbitron font-black text-white">₹{pay.amount}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="glass rounded-[2.5rem] p-10 border-white/5 bg-black/40">
                                <h3 className="text-xs font-orbitron font-bold tracking-widest text-accent-pink mb-8 flex items-center gap-2">
                                    <Activity size={14} /> SYSTEM_ACTIVITY_LOGS
                                </h3>
                                <div className="space-y-3 h-[300px] overflow-y-auto no-scrollbar font-mono text-[10px]">
                                    {logs.map(log => (
                                        <div key={log.id} className="flex gap-3 text-white/40">
                                            <span className="text-accent-cyan">[{log.time}]</span>
                                            <span>{log.msg}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'products' && (
                    <div className="glass rounded-[2.5rem] p-10 border-white/5">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-orbitron font-bold tracking-widest text-white">INVENTORY_DATABASE</h3>
                            <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-accent-blue text-white font-orbitron font-black text-[10px] tracking-widest rounded-xl hover:shadow-glow-blue transition-all">
                                <Plus size={14} /> INTEGRATE_NEW_UNIT
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="border-b border-white/5 text-white/20 font-orbitron text-[10px] tracking-widest">
                                    <tr>
                                        <th className="pb-6">UNIT_MODEL</th>
                                        <th className="pb-6">CREDITS</th>
                                        <th className="pb-6">SECTOR</th>
                                        <th className="pb-6 text-right">PROTOCOL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(p => (
                                        <tr key={p._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                                            <td className="py-6 text-white font-bold">{p.name}</td>
                                            <td className="py-6 text-accent-blue font-orbitron font-black">₹{p.price}</td>
                                            <td className="py-6"><span className="px-3 py-1 bg-white/5 rounded text-[8px] font-orbitron font-bold text-white/40 uppercase">{p.category}</span></td>
                                            <td className="py-6 text-right">
                                                <button onClick={() => {/* Delete logic */}} className="text-white/10 hover:text-accent-pink transition-colors">
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'financials' && (
                    <div className="glass rounded-[2.5rem] p-10 border-white/5">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                            <div>
                                <h3 className="text-xl font-orbitron font-bold tracking-widest text-white">FINANCIAL_REPORTS</h3>
                                <p className="text-[10px] text-white/40 font-orbitron mt-2">TOTAL_REVENUE_CAPTURED: <span className="text-accent-cyan">₹{totalRevenue}</span></p>
                            </div>
                            <div className="relative w-full md:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                                <input 
                                    type="text" 
                                    placeholder="FILTER_BY_TXN_OR_USER..." 
                                    className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-xl font-orbitron text-[10px] tracking-widest outline-none"
                                    value={paymentSearch}
                                    onChange={e => setPaymentSearch(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="border-b border-white/5 text-white/20 font-orbitron text-[10px] tracking-widest">
                                    <tr>
                                        <th className="pb-6">OPERATOR</th>
                                        <th className="pb-6">TRANSACTION_ID</th>
                                        <th className="pb-6">AMOUNT</th>
                                        <th className="pb-6">STATUS</th>
                                        <th className="pb-6 text-right">ARCHIVE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.filter(p => p.transactionId.includes(paymentSearch) || p.userName.toLowerCase().includes(paymentSearch.toLowerCase())).map(p => (
                                        <tr key={p._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                            <td className="py-6">
                                                <div className="text-white font-bold">{p.userName}</div>
                                                <div className="text-[10px] text-white/30">{p.email}</div>
                                            </td>
                                            <td className="py-6 font-mono text-[10px] text-accent-blue">{p.transactionId}</td>
                                            <td className="py-6 text-white font-orbitron font-black">₹{p.amount}</td>
                                            <td className="py-6">
                                                <span className={`px-3 py-1 rounded text-[8px] font-orbitron font-black ${
                                                    p.status === 'success' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                                                }`}>
                                                    {p.status.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="py-6 text-right">
                                                <button onClick={() => generateInvoice(p)} className="text-white/20 hover:text-white"><Download size={18} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'subscribers' && (
                    <div className="glass rounded-[2.5rem] p-10 border-white/5">
                        <h3 className="text-xl font-orbitron font-bold tracking-widest text-white mb-8">USER_DATABASE</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {subscribers.map(sub => (
                                <div key={sub._id} className="p-6 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white/20 group-hover:text-accent-blue transition-colors">
                                            <Users size={18} />
                                        </div>
                                        <div className="text-xs text-white/60 font-medium truncate max-w-[150px]">{sub.email}</div>
                                    </div>
                                    <div className="text-[8px] font-orbitron text-white/20">VERIFIED</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Add Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-[11000] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass max-w-lg w-full p-10 rounded-[3rem] border-accent-blue/20">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-orbitron font-black text-accent-blue">INTEGRATE_UNIT</h2>
                                <button onClick={() => setIsAddModalOpen(false)} className="text-white/20 hover:text-white"><X /></button>
                            </div>
                            <form onSubmit={e => {/* Logic here */}} className="space-y-4">
                                <input type="text" placeholder="UNIT_MODEL" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl font-orbitron text-xs focus:border-accent-blue outline-none" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="number" placeholder="CREDITS" className="bg-white/5 border border-white/10 p-4 rounded-xl font-orbitron text-xs focus:border-accent-blue outline-none" />
                                    <select className="bg-white/5 border border-white/10 p-4 rounded-xl font-orbitron text-xs outline-none">
                                        <option value="console">CONSOLE</option>
                                        <option value="pc">ELITE_PC</option>
                                        <option value="accessory">ACCESSORY</option>
                                    </select>
                                </div>
                                <textarea placeholder="MISSION_SPECIFICATIONS" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl font-orbitron text-xs focus:border-accent-blue outline-none h-32" />
                                <button type="submit" className="w-full py-5 bg-accent-blue text-white font-orbitron font-black tracking-widest hover:shadow-glow-blue transition-all rounded-xl">INITIALIZE_SYNC</button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
