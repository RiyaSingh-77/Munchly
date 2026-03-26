import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [partner, setPartner] = useState(null);

  useEffect(() => {
    axios.get("https://zomato-backend-ajqm.onrender.com/api/food-partner/me", {
      withCredentials: true
    })
      .then(res => setPartner(res.data.foodPartner))
      .catch(() => navigate('/food-partner/login'));
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.avatar}>🍔</div>
        <h1 style={styles.name}>{partner?.name || 'Welcome back!'}</h1>
        <p style={styles.sub}>{partner?.address || ''}</p>

        <div style={styles.btnGroup}>
          <button
            style={{ ...styles.btn, ...styles.btnPrimary }}
            onClick={() => navigate(`/food-partner/profile/${partner?._id}`)}
          >
            👤 My Profile
          </button>

          <button
            style={{ ...styles.btn, ...styles.btnSecondary }}
            onClick={() => navigate('/create-food')}
          >
            ➕ Upload Food
          </button>

          <button
            style={{ ...styles.btn, ...styles.btnGhost }}
            onClick={() => navigate('/home')}
          >
            🏠 Browse Feed
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f9f9f9',
  },
  card: {
    background: '#fff',
    borderRadius: '24px',
    padding: '48px 56px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
    minWidth: '320px',
  },
  avatar: {
    fontSize: '64px',
    marginBottom: '8px',
  },
  name: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: 0,
    textAlign: 'center',
  },
  sub: {
    fontSize: '14px',
    color: '#888',
    margin: '0 0 16px 0',
    textAlign: 'center',
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
  },
  btn: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
    transition: 'opacity 0.2s',