import React, { useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import BurgerLoader from '../components/BurgerLoader';

const FoodPartnerLogin = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    setLoading(true);
    try {
      const response = await axios.post(
        "https://zomato-backend-ajqm.onrender.com/api/auth/food-partner/login",
        { email, password },
        { withCredentials: true }
      );
      console.log(response.data);
      navigate("/food-partner/dashboard"); // loader stays alive until page changes
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false); // only hide loader on failure
    }
  };

  return (
    <>
      {loading && <BurgerLoader />}
      <div className="auth-page-wrapper">
        <div className="auth-card" role="region" aria-labelledby="partner-login-title">
          <header>
            <h1 id="partner-login-title" className="auth-title">Partner login</h1>
            <p className="auth-subtitle">Access your dashboard and manage orders.</p>
          </header>
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="field-group">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="business@example.com" autoComplete="email" />
            </div>
            <div className="field-group">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" placeholder="Password" autoComplete="current-password" />
            </div>
            <button className="auth-submit" type="submit">Sign In</button>
          </form>
          <div className="auth-alt-action">
            New partner? <a href="/food-partner/register">Create an account</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodPartnerLogin;