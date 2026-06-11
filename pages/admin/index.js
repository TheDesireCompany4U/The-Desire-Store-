import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AdminDashboard() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [formData, setFormData] = useState({ name: '', price: '', inventory: '', description: '' });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      setAuthenticated(true);
      fetchProducts();
      fetchOrders();
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      setProducts(await res.json());
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      setOrders(await res.json());
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormData({ name: '', price: '', inventory: '', description: '' });
        setShowAddProduct(false);
        fetchProducts();
      }
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  if (!authenticated) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '2px solid #4a1c35', paddingBottom: '1rem' }}>
        <h1 style={{ color: '#4a1c35' }}>Admin Dashboard</h1>
        <button onClick={handleLogout} style={{ background: '#4a1c35', color: '#fff', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '3px', cursor: 'pointer' }}>Logout</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <section style={{ background: '#f5eaed', padding: '1.5rem', borderRadius: '3px' }}>
          <h2 style={{ color: '#4a1c35', marginBottom: '1rem' }}>Products ({products.length})</h2>
          <button onClick={() => setShowAddProduct(!showAddProduct)} style={{ background: '#4a1c35', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '3px', cursor: 'pointer', marginBottom: '1rem' }}>+ Add Product</button>

          {showAddProduct && (
            <form onSubmit={handleAddProduct} style={{ background: '#fff', padding: '1rem', borderRadius: '3px', marginBottom: '1rem' }}>
              <input type="text" placeholder="Product Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required style={{ width: '100%', padding: '0.6rem', marginBottom: '0.8rem', border: '1px solid #e8cdd4', borderRadius: '3px', fontFamily: 'inherit' }} />
              <input type="number" placeholder="Price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required style={{ width: '100%', padding: '0.6rem', marginBottom: '0.8rem', border: '1px solid #e8cdd4', borderRadius: '3px', fontFamily: 'inherit' }} />
              <input type="number" placeholder="Inventory" value={formData.inventory} onChange={(e) => setFormData({ ...formData, inventory: e.target.value })} required style={{ width: '100%', padding: '0.6rem', marginBottom: '0.8rem', border: '1px solid #e8cdd4', borderRadius: '3px', fontFamily: 'inherit' }} />
              <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} style={{ width: '100%', padding: '0.6rem', marginBottom: '0.8rem', border: '1px solid #e8cdd4', borderRadius: '3px', fontFamily: 'inherit' }} />\n              <button type="submit" style={{ width: '100%', background: '#4a1c35', color: '#fff', border: 'none', padding: '0.7rem', borderRadius: '3px', cursor: 'pointer', fontWeight: 500 }}>Save Product</button>
            </form>
          )}

          <div style={{ display: 'grid', gap: '1rem' }}>
            {products.map((product) => (
              <div key={product._id} style={{ background: '#fff', padding: '1rem', borderRadius: '3px', borderLeft: '4px solid #4a1c35' }}>
                <h3 style={{ color: '#4a1c35', marginBottom: '0.5rem' }}>{product.name}</h3>
                <p style={{ color: '#4a1c35', marginBottom: '0.5rem' }}>${product.price}</p>
                <p style={{ color: '#4a1c35' }}>Stock: {product.inventory}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: '#f5eaed', padding: '1.5rem', borderRadius: '3px' }}>
          <h2 style={{ color: '#4a1c35', marginBottom: '1rem' }}>Orders ({orders.length})</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {orders.map((order) => (
              <div key={order._id} style={{ background: '#fff', padding: '1rem', borderRadius: '3px', borderLeft: '4px solid #4a1c35' }}>
                <p style={{ fontWeight: 'bold', color: '#4a1c35' }}>{order.email}</p>
                <p>Total: ${order.total}</p>
                <p>Status: <span style={{ color: order.status === 'completed' ? 'green' : 'orange' }}>{order.status}</span></p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
