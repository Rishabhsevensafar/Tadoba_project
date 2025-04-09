import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


// Import your preferred toast library
// import { toast, Toaster } from "react-hot-toast";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/auth/login",
        formData
      );
      const token = response.data.token; // ✅ now it's defined
      const decoded = jwtDecode(token);  // ✅ safe to decode now
  
      localStorage.setItem("adminToken", token);
      localStorage.setItem("admin-role", decoded.role);
  
      // Toast message (replace with your preferred method)
      alert("Login successful!");
      
      setTimeout(() => navigate("/admin/dashboard"), 1000);
    } catch (error) {
      // Toast error message (replace with your preferred method)
      alert(error.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Add your toast component here if using a toast library */}
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <h1 className="header-title">Admin Portal</h1>
        </div>

        {/* Form Content */}
        <div className="login-body">
          <p className="login-subtitle">Please login to continue</p>

          <form onSubmit={handleLogin} className="login-form">
            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <div className="input-container">
                <div className="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-container">
                <div className="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your password"
                  minLength={6}
                />
                <div className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </div>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="form-extras">
              <div className="remember-me">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="checkbox"
                />
                <label htmlFor="remember-me" className="checkbox-label">
                  Remember me
                </label>
              </div>
              <a href="/admin/forgot-password" className="forgot-password">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`submit-button ${loading ? "loading" : ""}`}
            >
              {loading ? (
                <>
                  <svg className="spinner" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <circle className="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <span className="divider-text">Secure Login</span>
          </div>

          {/* Footer */}
          <div className="login-footer">
            <div className="secure-message">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shield-icon">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>This login is encrypted and secure</span>
            </div>
            <p className="copyright">
              © {new Date().getFullYear()} Admin System
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add this CSS style tag to your component or in your CSS file
const styles = `
  /* Reset and base styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 20px;
  }

  .login-card {
    width: 100%;
    max-width: 400px;
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }

  .login-header {
    background: linear-gradient(90deg, #3860AC 0%, #2E4A97 100%);
    padding: 20px 0;
    text-align: center;
  }

  .header-title {
    color: white;
    font-size: 24px;
    font-weight: 600;
    margin: 0;
  }

  .login-body {
    padding: 10px 24px 10px 24px;
  }

  .login-subtitle {
    color: #666;
    text-align: center;
    margin-bottom: 24px;
    font-size: 14px;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .form-label {
    font-size: 14px;
    font-weight: 500;
    color: #333;
        padding: 0px;
  }

  .input-container {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input-icon {
    position: absolute;
    left: 12px;
    color: #9ca3af;
    display: flex;
    align-items: center;
  }

  .form-input {
    width: 100%;
    padding: 12px 12px 12px 40px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 14px;
    transition: border-color 0.15s ease-in-out;
    outline: none;
  }

  .form-input:focus {
    border-color: #3860AC;
    box-shadow: 0 0 0 3px rgba(56, 96, 172, 0.1);
  }

  .password-toggle {
    position: absolute;
    right: 12px;
    color: #9ca3af;
    cursor: pointer;
  }

  .form-extras {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .remember-me {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .checkbox {
    width: 16px;
    height: 16px;
    accent-color: #3860AC;
  }

  .checkbox-label {
    font-size: 14px;
    color: #4b5563;
  }

  .forgot-password {
    font-size: 14px;
    color: #3860AC;
    text-decoration: none;
  }

  .forgot-password:hover {
    text-decoration: underline;
  }

  .submit-button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 12px;
    background-color: #3860AC;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;
  }

  .submit-button:hover:not(:disabled) {
    background-color: #2E4A97;
  }

  .submit-button:disabled {
    background-color: #93a8d6;
    cursor: not-allowed;
  }

  .spinner {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .divider {
    position: relative;
    margin: 24px 0;
    text-align: center;
  }

  .divider::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #e5e7eb;
  }

  .divider-text {
    position: relative;
    display: inline-block;
    padding: 0 10px;
    background-color: white;
    color: #6b7280;
    font-size: 14px;
  }

  .login-footer {
    text-align: center;
  }

  .secure-message {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 8px;
    color: #6b7280;
    font-size: 14px;
  }

  .shield-icon {
    color: #10b981;
  }

  .copyright {
    color: #9ca3af;
    font-size: 12px;
  }
`;

export default () => {
  return (
    <>
      <style>{styles}</style>
      <LoginPage />
    </>
  );
};