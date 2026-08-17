import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import api from '../api.js';

export default function AdminLogin(){
 const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [error,setError]=useState(''); const [loading,setLoading]=useState(false); const navigate=useNavigate();
 async function submit(e){e.preventDefault();setError('');setLoading(true);try{const {data}=await api.post('/admin/login',{email,password});localStorage.setItem('adminToken',data.token);localStorage.setItem('adminUser',JSON.stringify(data.user));navigate('/admin');}catch(err){setError(err.response?.data?.message||'Unable to login as administrator.')}finally{setLoading(false)}}
 return <main className="adminAuthPage"><div className="adminAuthCard"><div className="adminLogo">⌘</div><p className="adminEyebrow">ADMINISTRATOR ACCESS</p><h1>Welcome back</h1><p className="adminAuthText">Sign in to manage examinations, students and results.</p>{error&&<div className="adminAlert danger">{error}</div>}<form onSubmit={submit}><label className="adminField"><span>Email address</span><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@example.com" required/></label><label className="adminField"><span>Password</span><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter password" required/></label><button className="adminPrimary full" disabled={loading}>{loading?'Signing in...':'Sign in to Admin Panel'}</button></form><button className="backStudent" onClick={()=>navigate('/login')}>← Back to student login</button></div></main>
}
