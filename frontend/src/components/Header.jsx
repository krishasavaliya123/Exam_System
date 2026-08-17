import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../App.jsx';

export default function Header() {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return null;
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="topbar">
      <div className="brand">
        <Link to="/" className="brandLink">
          <span className="brandIcon">🎓</span>
          <span>Student <b>Examination</b> System</span>
        </Link>
      </div>

      <nav className="navLinks">
        <Link className={location.pathname === '/' ? 'navLink active' : 'navLink'} to="/">Home</Link>
        <a className="navLink" href="/#features">Features</a>
        {!user ? (
          <a className="navLink" href="/#contact">Contact</a>
        ) : (
          <>
            <Link className={location.pathname === '/dashboard' ? 'navLink active' : 'navLink'} to="/dashboard">Dashboard</Link>
            <Link className={location.pathname === '/feedback' ? 'navLink active' : 'navLink'} to="/feedback">Feedback</Link>
          </>
        )}
      </nav>

      <div className="headerRight">
        {user ? (
          <>
            <div className="userChip">
              <span className="avatar">{user.fullName?.charAt(0)?.toUpperCase() || 'S'}</span>
              <span className="headerName">{user.fullName}</span>
            </div>
            <button className="logoutBtn" onClick={logout}>Logout</button>
          </>
        ) : (
          <Link className="navLoginBtn" to="/login">Login</Link>
        )}
      </div>
    </header>
  );
}
