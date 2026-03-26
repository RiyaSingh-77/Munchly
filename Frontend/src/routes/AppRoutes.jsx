const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelect />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        <Route path="/food-partner/dashboard" element={<Dashboard />} />
        <Route path="/food-partner/create-food" element={<CreateFood />} />  {/* fix path too */}
        <Route path="/food-partner/profile/:id" element={<Profile />} />
        <Route path="/feed" element={<ReelFeed />} />
        <Route path="/saved" element={<Saved />} />

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes;