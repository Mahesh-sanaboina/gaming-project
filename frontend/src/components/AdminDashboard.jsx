import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = ({ onBack }) => {
    const [products, setProducts] = useState([]);
    const [subscribers, setSubscribers] = useState([]);
    const [logs, setLogs] = useState([
        { id: 1, time: new Date().toLocaleTimeString(), msg: 'SYSTEM_BOOT: Admin Command Center active.' },
        { id: 2, time: new Date().toLocaleTimeString(), msg: 'ENCRYPTION: 256-bit neural link established.' }
    ]);
    const [stats, setStats] = useState({
        revenue: 125400,
        operators: 50248,
        inventory: 85
    });
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'accessory', description: '', imageUrl: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const prodRes = await axios.get('/api/products');
                setProducts(prodRes.data);
                const subRes = await axios.get('/api/subscribers');
                setSubscribers(subRes.data);
                
                addLog('DATA_SYNC: Products and subscribers loaded.');
            } catch (err) {
                addLog('CRITICAL_ERROR: Failed to fetch database records.');
            }
        };
        fetchData();

        // Simulate some live activity
        const interval = setInterval(() => {
            const msgs = [
                'USER_AUTH: Operator session renewed.',
                'SYNC: Database mirror updated.',
                'SIGNAL: Pinging global nodes...',
                'SECURITY: Blocked unauthorized access attempt from 192.168.0.x'
            ];
            addLog(msgs[Math.floor(Math.random() * msgs.length)]);
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    const addLog = (msg) => {
        setLogs(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg }, ...prev.slice(0, 19)]);
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm('PERMANENTLY DELETE THIS UNIT?')) {
            try {
                await axios.delete(`/api/products/${id}`);
                setProducts(products.filter(p => p._id !== id));
                addLog(`PURGE: Product ${id} removed from matrix.`);
            } catch (err) {
                addLog('ERROR: Purge sequence failed.');
            }
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/products', newProduct);
            setProducts([...products, res.data]);
            setIsAddModalOpen(false);
            setNewProduct({ name: '', price: '', category: 'accessory', description: '', imageUrl: '' });
            addLog(`SYNC: New unit "${res.data.name}" integrated into inventory.`);
        } catch (err) {
            addLog('ERROR: Data integration failed.');
        }
    };

    console.log('AdminDashboard rendering, onBack:', onBack);

    return (
        <div className="admin-dashboard fade-in-page" style={{ 
            paddingTop: onBack ? '100px' : '0px', 
            paddingBottom: '100px', 
            background: onBack ? 'radial-gradient(circle at top, #1a0b2e 0%, #050505 100%)' : 'transparent', 
            minHeight: '600px' 
        }}>
            <div className="container" style={{ padding: onBack ? '0 4rem' : '0' }}>
                <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div>
                        <h1 className="glitch" data-text="ADMIN_DASHBOARD" style={{ fontSize: onBack ? '3rem' : '2.5rem' }}>ADMIN_DASHBOARD</h1>
                        <p style={{ color: 'var(--accent-cyan)', letterSpacing: '3px' }}>SYSTEM_MANAGEMENT_v8.2.1</p>
                    </div>
                    {onBack && <button className="btn btn-outline" onClick={onBack}>RETURN_TO_STATION</button>}
                </div>

                {/* Stats Grid */}
                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                    <div className="glass p-4 text-center" style={{ borderLeft: '4px solid var(--accent-cyan)' }}>
                        <h4 style={{ color: 'var(--text-dim)' }}>NET_REVENUE</h4>
                        <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent-cyan)' }}>${stats.revenue.toLocaleString()}</div>
                        <div className="mini-chart" style={{ height: '5px', background: 'rgba(255,255,255,0.1)', marginTop: '1rem', position: 'relative' }}>
                            <div style={{ position: 'absolute', width: '75%', height: '100%', background: 'var(--accent-cyan)', boxShadow: '0 0 10px var(--accent-cyan)' }}></div>
                        </div>
                    </div>
                    <div className="glass p-4 text-center" style={{ borderLeft: '4px solid var(--accent-pink)' }}>
                        <h4 style={{ color: 'var(--text-dim)' }}>ACTIVE_OPERATORS</h4>
                        <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent-pink)' }}>{stats.operators.toLocaleString()}</div>
                        <div className="mini-chart" style={{ height: '5px', background: 'rgba(255,255,255,0.1)', marginTop: '1rem', position: 'relative' }}>
                            <div style={{ position: 'absolute', width: '92%', height: '100%', background: 'var(--accent-pink)', boxShadow: '0 0 10px var(--accent-pink)' }}></div>
                        </div>
                    </div>
                    <div className="glass p-4 text-center" style={{ borderLeft: '4px solid #f2ff00' }}>
                        <h4 style={{ color: 'var(--text-dim)' }}>STORAGE_CAPACITY</h4>
                        <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#f2ff00' }}>{stats.inventory}%</div>
                        <div className="mini-chart" style={{ height: '5px', background: 'rgba(255,255,255,0.1)', marginTop: '1rem', position: 'relative' }}>
                            <div style={{ position: 'absolute', width: '85%', height: '100%', background: '#f2ff00', boxShadow: '0 0 10px #f2ff00' }}></div>
                        </div>
                    </div>
                </div>

                <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                    {/* Product Management */}
                    <div className="glass p-4 overflow-hidden">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h3 style={{ color: 'var(--accent-cyan)' }}>// INVENTORY_MANAGER</h3>
                            <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={() => setIsAddModalOpen(true)}>ADD NEW PRODUCT</button>
                        </div>

                        {isAddModalOpen && (
                            <div className="modal-overlay" style={{ background: 'rgba(0,0,0,0.9)', zIndex: 6000 }} onClick={() => setIsAddModalOpen(false)}>
                                <div className="glass fade-in" style={{ width: '500px', padding: '2rem' }} onClick={e => e.stopPropagation()}>
                                    <h2 style={{ color: 'var(--accent-cyan)', marginBottom: '2rem' }}>INTEGRATE_NEW_UNIT</h2>
                                    <form onSubmit={handleAddProduct}>
                                        <input type="text" placeholder="PRODUCT_NAME" required className="cyber-input mb-3" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} style={{width: '100%', marginBottom: '1rem'}} />
                                        <input type="number" placeholder="PRICE_CREDITS" required className="cyber-input mb-3" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} style={{width: '100%', marginBottom: '1rem'}} />
                                        <select className="cyber-input mb-3" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} style={{width: '100%', marginBottom: '1rem'}}>
                                            <option value="console">CONSOLE</option>
                                            <option value="pc">ELITE_PC</option>
                                            <option value="accessory">ACCESSORY</option>
                                        </select>
                                        <textarea placeholder="UNIT_DESCRIPTION" required className="cyber-input mb-3" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} style={{width: '100%', height: '80px', marginBottom: '1rem'}} />
                                        <input type="text" placeholder="IMAGE_URL" required className="cyber-input mb-4" value={newProduct.imageUrl} onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})} style={{width: '100%', marginBottom: '2rem'}} />
                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>INITIATE</button>
                                            <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setIsAddModalOpen(false)}>ABORT</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)', color: 'var(--text-dim)' }}>
                                        <th style={{ padding: '1rem' }}>UNIT_NAME</th>
                                        <th style={{ padding: '1rem' }}>CREDITS</th>
                                        <th style={{ padding: '1rem' }}>CATEGORY</th>
                                        <th style={{ padding: '1rem' }}>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(p => (
                                        <tr key={p._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: '0.3s' }}>
                                            <td style={{ padding: '1rem', fontWeight: 600 }}>{p.name}</td>
                                            <td style={{ padding: '1rem', color: 'var(--accent-cyan)' }}>${p.price}</td>
                                            <td style={{ padding: '1rem' }}><span style={{ padding: '0.2rem 0.6rem', border: '1px solid var(--text-dim)', fontSize: '0.7rem', textTransform: 'uppercase' }}>{p.category}</span></td>
                                            <td style={{ padding: '1rem' }}>
                                                <button style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', marginRight: '1rem' }}>EDIT</button>
                                                <button onClick={() => handleDeleteProduct(p._id)} style={{ background: 'transparent', border: 'none', color: 'var(--accent-pink)', cursor: 'pointer' }}>PURGE</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Activity Log & Subscribers */}
                    <div className="grid" style={{ gridTemplateColumns: '1fr', gap: '2rem' }}>
                        <div className="glass p-4" style={{ background: 'rgba(0,0,0,0.8)', border: '1px solid var(--accent-cyan)' }}>
                            <h3 style={{ color: 'var(--accent-cyan)', marginBottom: '1.5rem', fontSize: '1rem' }}>SYSTEM_ACTIVITY_LOGS</h3>
                            <div className="log-container" style={{ height: '250px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                                {logs.map(log => (
                                    <div key={log.id} style={{ marginBottom: '0.5rem', color: log.msg.includes('ERROR') ? 'var(--accent-pink)' : '#aaa' }}>
                                        <span style={{ color: 'var(--accent-cyan)' }}>[{log.time}]</span> {log.msg}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass p-4">
                            <h3 style={{ color: 'var(--accent-pink)', marginBottom: '1.5rem', fontSize: '1rem' }}>SUBSCRIBER_DATABASE</h3>
                            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                {subscribers.length === 0 ? (
                                    <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>No data records found.</p>
                                ) : (
                                    subscribers.map(sub => (
                                        <div key={sub._id} style={{ padding: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem' }}>
                                            {sub.email}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
