import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api.js';
import { AuthContext } from '../App.jsx';

export default function Login() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ fullName:'', email:'', password:'' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault(); setMessage(''); setLoading(true);
    try {
      const url = mode === 'login' ? '/auth/login' : '/auth/register';
      const payload = mode === 'login' ? { email: form.email, password: form.password } : { fullName: form.fullName, email: form.email, password: form.password };
      const { data } = await api.post(url, payload);
      if (mode === 'register') {
        setMessage('Registration successful. You can now log in.');
        setMode('login');
        setForm({ ...form, password:'' });
      } else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        navigate('/dashboard');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Unable to connect to the server. Start the backend and MySQL, then try again.');
    } finally { setLoading(false); }
  }

  return (
    <main className="page authPage">
      <section className="authCard">
        <div className="authIcon">🔐</div>
        <p className="eyebrow">STUDENT EXAMINATION SYSTEM</p>
        <h1>{mode === 'login' ? 'Student Login' : 'Create Student Account'}</h1>
        <p className="subtext">{mode === 'login' ? 'Login to access your student dashboard' : 'Register to create your student account'}</p>
        <div className="tabs">
          <button className={mode==='login'?'active':''} onClick={()=>{setMode('login');setMessage('')}}>Login</button>
          <button className={mode==='register'?'active':''} onClick={()=>{setMode('register');setMessage('')}}>Register</button>
        </div>
        {message && <div className="message">{message}</div>}
        <form onSubmit={submit}>
          {mode === 'register' && <>
            <label className="field"><span>Full Name</span><input name="fullName" value={form.fullName} onChange={update} placeholder="Enter your full name" required /></label>
          </>}
          <label className="field"><span>Email Address</span><input type="email" name="email" value={form.email} onChange={update} placeholder="Enter your email" required /></label>
          <label className="field"><span>Password</span><input type="password" name="password" value={form.password} onChange={update} placeholder="Enter your password" required /></label>
          <button className="primary full" disabled={loading}>{loading ? 'Please wait...' : mode === 'login' ? 'Login to Examination' : 'Create Account'}</button>
        </form>
      <div className="adminLoginPrompt"><span>Are you an administrator?</span><button type="button" onClick={()=>navigate('/admin/login')}>Admin Login →</button></div>
      </section>
    </main>
  );
}
