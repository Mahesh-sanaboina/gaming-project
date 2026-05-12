"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CreditCard, Wallet, Lock, X, Zap, Loader2, Download, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import { jsPDF } from "jspdf";

const PaymentGateway = ({ amount, products, onSuccess, onCancel }) => {
    const [step, setStep] = useState('selection'); // selection, processing, success
    const [loading, setLoading] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState(null);

    const generateInvoice = (details) => {
        const doc = new jsPDF();
        
        // Header
        doc.setFillColor(11, 17, 32);
        doc.rect(0, 0, 210, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.text("AETHER_CORE", 20, 25);
        
        // Content
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.text(`Invoice ID: ${details.transactionId}`, 20, 60);
        doc.text(`Date: ${new Date(details.timestamp).toLocaleString()}`, 20, 70);
        doc.text(`Customer: ${details.userName}`, 20, 80);
        doc.text(`Email: ${details.email}`, 20, 90);
        
        doc.setLineWidth(0.5);
        doc.line(20, 100, 190, 100);
        
        doc.text("Product", 20, 110);
        doc.text("Price", 170, 110);
        
        let y = 120;
        details.products.forEach(p => {
            doc.text(p.name, 20, y);
            doc.text(`₹${p.price}`, 170, y);
            y += 10;
        });
        
        doc.line(20, y, 190, y);
        doc.setFontSize(16);
        doc.text(`Total Amount Paid: ₹${details.amount}`, 20, y + 20);
        doc.setFontSize(10);
        doc.text(`Razorpay ID: ${details.razorpayPaymentId}`, 20, y + 40);
        
        doc.save(`GamingX_Invoice_${details.transactionId}.pdf`);
    };

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            if (document.body.contains(script)) document.body.removeChild(script);
        };
    }, []);

    const handlePay = async () => {
        setLoading(true);
        try {
            const { data: order } = await axios.post('/api/create-order', {
                amount: amount,
                currency: "INR"
            });

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "AetherCore Node",
                description: "Tactical Asset Acquisition",
                order_id: order.id,
                handler: async function (response) {
                    setStep('processing');
                    try {
                        const { data: verification } = await axios.post('/api/verify-payment', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            userName: "Elite Operator", // In a real app, get from session
                            email: "operator@nexus.com",
                            amount: amount,
                            products: products
                        });

                        if (verification.message === "Payment Verified") {
                            setPaymentDetails(verification.payment);
                            setStep('success');
                            // We don't call onSuccess() immediately to allow user to see the success screen
                        }
                    } catch (error) {
                        alert("Verification failed: " + error.message);
                        setStep('selection');
                    }
                },
                prefill: {
                    name: "Operator",
                    email: "operator@gamingx.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#3B82F6",
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Payment Error:", error);
            alert("Payment initialization failed. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl overflow-y-auto">
            <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="glass max-w-2xl w-full p-12 rounded-[3rem] border-accent-blue/30 shadow-glow-blue/20 relative overflow-hidden my-auto"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/10 blur-[60px] rounded-full" />
                
                <button onClick={onCancel} className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors">
                    <X size={24} />
                </button>

                <AnimatePresence mode="wait">
                    {step === 'selection' && (
                        <motion.div key="selection" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className="text-center mb-10">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-blue/10 rounded-2xl mb-6 shadow-glow-blue/10">
                                    <ShieldCheck className="text-accent-blue" size={32} />
                                </div>
                                <h2 className="text-3xl font-orbitron font-black text-white tracking-widest mb-2 uppercase">SECURE_PAYMENT</h2>
                                <p className="text-white/40 font-orbitron text-xs tracking-[0.2em] uppercase">TOTAL_AUTHORIZATION: <span className="text-accent-blue">₹{amount}</span></p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 mb-10">
                                <div className="p-6 glass border-accent-blue/30 rounded-3xl bg-accent-blue/5">
                                    <h4 className="text-xs font-orbitron font-bold text-white mb-4 tracking-widest">ORDER_SUMMARY</h4>
                                    <div className="space-y-3 max-h-32 overflow-y-auto no-scrollbar">
                                        {products.map((p, i) => (
                                            <div key={i} className="flex justify-between text-[10px] font-poppins">
                                                <span className="text-text-muted">{p.name}</span>
                                                <span className="text-white font-bold">₹{p.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-4 mt-4 border-t border-white/5 flex justify-between">
                                        <span className="text-xs font-orbitron font-bold text-white">TOTAL</span>
                                        <span className="text-xs font-orbitron font-black text-accent-blue">₹{amount}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                            <CreditCard className="text-white" size={20} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-orbitron font-black text-white tracking-widest">RAZORPAY_SDK</div>
                                            <div className="text-[10px] text-white/40">v2.9.6_ENCRYPTED</div>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-text-muted font-poppins leading-relaxed">
                                        All transactions are processed through an encrypted Razorpay tunnel. Your financial data is never stored on our local servers.
                                    </p>
                                </div>
                            </div>

                            <button 
                                onClick={handlePay} 
                                disabled={loading}
                                className="w-full py-5 bg-accent-blue text-white font-orbitron font-black tracking-widest hover:scale-[1.02] transition-all shadow-glow-blue flex items-center justify-center gap-3 rounded-2xl disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : <Zap size={18} fill="white" />}
                                {loading ? "INITIALIZING_NODE..." : "CONFIRM & PAY NOW"}
                            </button>
                        </motion.div>
                    )}

                    {step === 'processing' && (
                        <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-20">
                            <div className="relative w-32 h-32 mx-auto mb-10">
                                <div className="absolute inset-0 border-4 border-accent-blue/10 rounded-full" />
                                <div className="absolute inset-0 border-4 border-t-accent-blue rounded-full animate-spin" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Lock className="text-accent-blue animate-pulse" size={32} />
                                </div>
                            </div>
                            <h2 className="text-3xl font-orbitron font-black text-white mb-4 tracking-tighter uppercase">VERIFYING_PAYMENT</h2>
                            <p className="text-accent-blue font-orbitron text-xs tracking-[0.4em] animate-pulse">SYNCHRONIZING_WITH_BANK_NODE...</p>
                        </motion.div>
                    )}

                    {step === 'success' && paymentDetails && (
                        <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-glow-green/30 border border-green-500/30">
                                <CheckCircle2 className="text-green-500" size={48} />
                            </div>
                            <h2 className="text-4xl font-orbitron font-black text-white mb-2 tracking-tighter">ORDER_SECURED</h2>
                            <p className="text-accent-blue font-orbitron text-xs tracking-widest mb-10 uppercase">TRANSACTION_AUTHORIZED_OK</p>
                            
                            <div className="glass bg-white/5 border-white/10 rounded-3xl p-8 mb-10 text-left">
                                <div className="grid grid-cols-2 gap-y-4 text-sm font-poppins">
                                    <span className="text-text-muted">Transaction ID</span>
                                    <span className="text-white font-mono text-xs">{paymentDetails.transactionId}</span>
                                    <span className="text-text-muted">Amount Paid</span>
                                    <span className="text-white font-bold">₹{paymentDetails.amount}</span>
                                    <span className="text-text-muted">Payment Node</span>
                                    <span className="text-white">Razorpay_Terminal</span>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button 
                                    onClick={() => generateInvoice(paymentDetails)}
                                    className="flex-1 py-4 bg-white/5 border border-white/10 text-white font-orbitron font-bold text-xs tracking-widest rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                                >
                                    <Download size={16} /> DOWNLOAD_INVOICE
                                </button>
                                <button 
                                    onClick={() => onSuccess()}
                                    className="flex-1 py-4 bg-accent-blue text-white font-orbitron font-bold text-xs tracking-widest rounded-xl hover:shadow-glow-blue transition-all"
                                >
                                    CONTINUE_GAMING
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default PaymentGateway;
