"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, CreditCard, ChevronRight, Search, Filter, Loader2, FileText, CheckCircle2, XCircle, Clock } from 'lucide-react';
import axios from 'axios';
import { jsPDF } from "jspdf";

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const { data } = await axios.get('/api/payments/history');
                setPayments(data);
            } catch (error) {
                console.error("Failed to fetch payments", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPayments();
    }, []);

    const generateInvoice = (details) => {
        const doc = new jsPDF();
        doc.setFillColor(11, 17, 32);
        doc.rect(0, 0, 210, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.text("GAMINGX NEXUS", 20, 25);
        
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.text(`Invoice ID: ${details.transactionId}`, 20, 60);
        doc.text(`Date: ${new Date(details.timestamp).toLocaleString()}`, 20, 70);
        doc.text(`Customer: ${details.userName}`, 20, 80);
        
        doc.setLineWidth(0.5);
        doc.line(20, 100, 190, 100);
        
        let y = 110;
        details.products.forEach(p => {
            doc.text(p.name, 20, y);
            doc.text(`₹${p.price}`, 170, y);
            y += 10;
        });
        
        doc.line(20, y, 190, y);
        doc.setFontSize(16);
        doc.text(`Total Amount Paid: ₹${details.amount}`, 20, y + 20);
        doc.save(`GamingX_Invoice_${details.transactionId}.pdf`);
    };

    const filteredPayments = payments.filter(p => 
        p.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.products.some(prod => prod.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading) return (
        <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-accent-blue" size={48} />
        </div>
    );

    return (
        <section className="py-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                    <h2 className="text-4xl font-orbitron font-black text-white mb-2 uppercase">BILLING_RECORDS</h2>
                    <p className="text-text-muted font-orbitron text-[10px] tracking-[0.4em] uppercase">Tactical_Transaction_History</p>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                        <input 
                            type="text" 
                            placeholder="SEARCH_BY_ID_OR_UNIT..." 
                            className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-xl font-orbitron text-[10px] tracking-widest focus:border-accent-blue outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="glass-card rounded-[2.5rem] overflow-hidden border-white/5">
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/10">
                                <th className="p-6 font-orbitron text-[10px] tracking-widest text-text-muted uppercase">TRANSACTION_ID</th>
                                <th className="p-6 font-orbitron text-[10px] tracking-widest text-text-muted uppercase">GEAR_UNITS</th>
                                <th className="p-6 font-orbitron text-[10px] tracking-widest text-text-muted uppercase">AMOUNT</th>
                                <th className="p-6 font-orbitron text-[10px] tracking-widest text-text-muted uppercase">TIMESTAMP</th>
                                <th className="p-6 font-orbitron text-[10px] tracking-widest text-text-muted uppercase">STATUS</th>
                                <th className="p-6 font-orbitron text-[10px] tracking-widest text-text-muted uppercase text-right">PROTOCOL</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            <AnimatePresence>
                                {filteredPayments.map((payment, i) => (
                                    <motion.tr 
                                        key={payment._id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="hover:bg-white/[0.02] transition-colors group"
                                    >
                                        <td className="p-6 font-mono text-xs text-white/60 tracking-tighter">
                                            {payment.transactionId}
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col gap-1">
                                                {payment.products.slice(0, 2).map((prod, idx) => (
                                                    <span key={idx} className="text-[10px] font-orbitron text-white font-bold">{prod.name}</span>
                                                ))}
                                                {payment.products.length > 2 && (
                                                    <span className="text-[8px] text-accent-blue font-bold">+{payment.products.length - 2} MORE UNITS</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className="text-sm font-orbitron font-black text-accent-blue">₹{payment.amount}</span>
                                        </td>
                                        <td className="p-6 text-[10px] font-poppins text-text-muted uppercase">
                                            {new Date(payment.timestamp).toLocaleDateString()}
                                            <br />
                                            {new Date(payment.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2">
                                                {payment.status === 'success' ? (
                                                    <>
                                                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                                        <span className="text-[10px] font-orbitron font-bold text-green-500 tracking-widest">AUTHORIZED</span>
                                                    </>
                                                ) : payment.status === 'failed' ? (
                                                    <>
                                                        <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,44,44,0.5)]" />
                                                        <span className="text-[10px] font-orbitron font-bold text-red-500 tracking-widest">REJECTED</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                                                        <span className="text-[10px] font-orbitron font-bold text-yellow-500 tracking-widest">PENDING</span>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-6 text-right">
                                            <button 
                                                onClick={() => generateInvoice(payment)}
                                                className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl inline-flex items-center justify-center text-text-muted hover:text-white hover:bg-accent-blue hover:border-accent-blue transition-all group-hover:scale-110"
                                            >
                                                <Download size={16} />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
                {filteredPayments.length === 0 && (
                    <div className="py-32 text-center">
                        <FileText size={48} className="mx-auto mb-6 text-white/10" />
                        <h3 className="text-xl font-orbitron font-bold text-white/20 uppercase tracking-[0.2em]">NO_RECORDS_FOUND</h3>
                    </div>
                )}
            </div>
        </section>
    );
};

export default PaymentHistory;
