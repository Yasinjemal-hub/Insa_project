import { useState } from 'react';
import './Auth.css';

export default function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  
  // States for all fields
  const [formData, setFormData] = useState({
    fullName: '', username: '', phone: '', 
    email: '', password: '', location: '', birthday: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const endpoint = isLogin ? '/login' : '/register';
  
  try {
    const response = await fetch(`http://localhost:5000${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (response.ok) {
      onLogin(data.user || formData.username);
    } else {
      alert(data.error);
    }
  } catch (error) {
    alert("Server is not running!");
  }
};

  return (
    <div className="auth-wrapper">
      <div className={`auth-card ${isLogin ? 'login-mode' : 'signup-mode'}`}>
        <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
        <p className="subtitle">{isLogin ? "Login to stay connected" : "Join us and start your journey"}</p>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-row">
              <div className="input-group">
                <label>Full Name</label>
                <input type="text" name="fullName" placeholder="John Doe" onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Location</label>
                <input type="text" name="location" placeholder="New York, USA" onChange={handleChange} />
              </div>
            </div>
          )}

          <div className="form-row">
            <div className="input-group">
              <label>Username</label>
              <input type="text" name="username" placeholder="johndoe123" onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Phone Number</label>
              <input type="tel" name="phone" placeholder="+1 234 567 890" onChange={handleChange} required />
            </div>
          </div>

          {!isLogin && (
            <div className="form-row">
              <div className="input-group">
                <label>Email</label>
                <input type="email" name="email" placeholder="john@example.com" onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Birthday</label>
                <input type="date" name="birthday" onChange={handleChange} required />
              </div>
            </div>
          )}

          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="••••••••" onChange={handleChange} required />
          </div>

          <button type="submit" className="btn-primary">
            {isLogin ? "Login Now" : "Register"}
          </button>
        </form>

        <p className="toggle-text">
          {isLogin ? "New here?" : "Already a member?"} 
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Sign Up" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
}