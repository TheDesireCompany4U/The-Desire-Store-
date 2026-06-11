import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('adminToken', data.token);
        router.push('/admin');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #2a0a1e, #4a1c35)' }}>
      <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '3px', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ color: '#4a1c35', marginBottom: '1.5rem', textAlign: 'center' }}>Admin Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', border: '1px solid #e8cdd4', borderRadius: '3px', fontFamily: 'inherit' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', border: '1px solid #e8cdd4', borderRadius: '3px', fontFamily: 'inherit' }}
          />
          {error && <p style={{ color: '#c0392b', fontSize: '0.9rem', marginBottom: '1rem' }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', background: '#4a1c35', color: '#fff', border: 'none', padding: '0.8rem', borderRadius: '3px', cursor: 'pointer', fontWeight: 500, fontSize: '1rem', opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
