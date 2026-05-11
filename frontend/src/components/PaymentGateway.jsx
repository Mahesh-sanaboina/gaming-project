import React, { useState } from 'react';

const PaymentGateway = ({ amount, onSucess, onCancel }) => {
    const [step, setStep] = useState('selection'); // selection, processing, success
    const [cardData, setCardData] = useState({ number: '', expiry: '', cvv: '' });

    const handlePay = () => {
        setStep('processing');
        setTimeout(() => {
            setStep('success');
            setTimeout(() => {
                onSucess();
            }, 2000);
        }, 3000);
    };

    return (
        <div className="payment-gateway-overlay" style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0, 0, 0, 0.95)', zIndex: 10000,
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            backdropFilter: 'blur(10px)'
        }}>
            <div className="gateway-modal glass" style={{
                width: '450px', padding: '3rem', border: '2px solid var(--accent-cyan)',
                boxShadow: '0 0 50px rgba(0, 242, 255, 0.3)', position: 'relative'
            }}>
                <button className="close-modal" onClick={onCancel} style={{ position: 'absolute', top: '1rem', right: '1rem' }}>×</button>
                
                {step === 'selection' && (
                    <div className="fade-in">
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ color: 'var(--accent-cyan)', letterSpacing: '4px' }}>SECURE_PAYMENT</h2>
                            <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>TOTAL DUE: <span style={{ color: 'var(--accent-pink)' }}>${amount}</span></p>
                        </div>

                        <div className="payment-options" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div className="glass p-3" style={{ cursor: 'pointer', border: '1px solid var(--glass-border)' }}>
                                <h4 style={{ color: 'var(--accent-cyan)' }}>// NEURAL_CREDIT</h4>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Instant synaptic authorization</p>
                            </div>
                            <div className="glass p-3" style={{ cursor: 'pointer', border: '1px solid var(--accent-cyan)' }}>
                                <h4 style={{ color: 'var(--accent-cyan)' }}>// CRYPTO_GENESIS</h4>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Zero-knowledge proof transaction</p>
                            </div>
                        </div>

                        <div style={{ marginTop: '2rem' }}>
                            <h4 style={{ marginBottom: '1rem', fontSize: '0.8rem', color: 'var(--text-dim)' }}>CREDIT_OR_DEBIT_CARD</h4>
                            <input type="text" placeholder="CARD_NUMBER" className="cyber-input mb-2" style={{width: '100%', marginBottom: '0.5rem'}} />
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <input type="text" placeholder="MM/YY" className="cyber-input" style={{flex: 1}} />
                                <input type="text" placeholder="CVV" className="cyber-input" style={{flex: 1}} />
                            </div>
                        </div>

                        <button className="btn btn-primary mt-4" style={{ width: '100%' }} onClick={handlePay}>CONFIRM & PAY</button>
                    </div>
                )}

                {step === 'processing' && (
                    <div className="text-center fade-in">
                        <div className="glitch" data-text="PROCESSING" style={{ fontSize: '2rem' }}>PROCESSING</div>
                        <div className="loader-ring" style={{
                            width: '80px', height: '80px', border: '4px solid transparent',
                            borderTopColor: 'var(--accent-cyan)', borderRadius: '50%',
                            margin: '2rem auto', animation: 'spin 1s linear infinite'
                        }}></div>
                        <p style={{ color: 'var(--accent-cyan)', fontFamily: 'monospace' }}>SECURING_TRANSACTION...</p>
                    </div>
                )}

                {step === 'success' && (
                    <div className="text-center fade-in">
                        <div style={{ fontSize: '5rem', color: 'var(--accent-cyan)' }}>✓</div>
                        <h2 style={{ color: 'var(--accent-cyan)' }}>LINK_SECURED</h2>
                        <p style={{ color: 'var(--text-main)', marginTop: '1rem' }}>Transaction authorized. Syncing with database...</p>
                    </div>
                )}
            </div>
            
            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                .close-modal { background: none; border: none; color: white; fontSize: 2rem; cursor: pointer; }
            `}</style>
        </div>
    );
};

export default PaymentGateway;
