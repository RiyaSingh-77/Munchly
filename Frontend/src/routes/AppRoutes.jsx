import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import UserLogin from '../pages/UserLogin'
import UserRegister from '../pages/UserRegister'
import FoodPartnerLogin from '../pages/FoodPartnerLogin'
import FoodPartnerRegister from '../pages/FoodPartnerRegister'
import Home from '../pages/general/Home'; 
import CreateFood from '../pages/food-partner/CreateFood';
import Profile from '../pages/food-partner/Profile'
import ReelFeed from '../components/ReelFeed'





const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element= {<Home />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        <Route path="/" element={<Navigate to="/user/login" replace />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
        <Route path = "/create-food" element={<CreateFood />} />
        <Route path="/food-partner/profile/:id" element={<Profile />} />
        <Route path="/feed" element={<ReelFeed />} /> 

      </Routes>
    </Router>
  )
}

export default AppRoutes