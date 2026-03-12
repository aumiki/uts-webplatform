"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed. Please check your credentials.");
        return;
      }

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      router.push("/");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@300;400;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        
        .auth-page {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: #1A1A1A;
          font-family: 'Montserrat', sans-serif;
        }
        
        .auth-left {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 56px;
        }
        
        .auth-left-bg {
          position: absolute;
          inset: 0;
          background-image: url('https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=1200');
          background-size: cover;
          background-position: center;
          filter: brightness(0.4);
          transform: scale(1.02);
          transition: transform 8s ease;
        }
        
        .auth-left-bg:hover { transform: scale(1.06); }
        
        .auth-left-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(26,26,26,0.9) 0%, rgba(26,26,26,0.3) 50%, transparent 100%);
        }
        
        .auth-left-content {
          position: relative;
          z-index: 2;
        }
        
        .auth-logo {
          position: absolute;
          top: 40px;
          left: 40px;
          z-index: 2;
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 400;
          letter-spacing: 0.15em;
          color: #FFFFFF;
          text-decoration: none;
          text-transform: uppercase;
        }
        
        .auth-tagline {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0.2em;
          color: #C5A059;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        
        .auth-headline {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 4vw, 52px);
          font-weight: 400;
          line-height: 1.15;
          color: #FFFFFF;
          margin-bottom: 24px;
        }
        
        .auth-divider {
          width: 48px;
          height: 1px;
          background: #C5A059;
        }
        
        .auth-right {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 56px clamp(40px, 6vw, 80px);
          background: #FAFAFA;
          position: relative;
        }
        
        .auth-form-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.3em;
          color: #C5A059;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        
        .auth-form-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(32px, 3.5vw, 44px);
          font-weight: 400;
          color: #1A1A1A;
          line-height: 1.1;
          margin-bottom: 8px;
        }
        
        .auth-form-subtitle {
          font-size: 14px;
          font-weight: 300;
          color: #666666;
          letter-spacing: 0.04em;
          margin-bottom: 48px;
        }
        
        .auth-field {
          margin-bottom: 28px;
          position: relative;
        }
        
        .auth-label {
          display: block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: #666666;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        
        .auth-input-wrap {
          position: relative;
        }
        
        .auth-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid #CCCCCC;
          padding: 14px 0;
          font-family: 'Montserrat', sans-serif;
          font-size: 15px;
          font-weight: 300;
          color: #1A1A1A;
          letter-spacing: 0.04em;
          outline: none;
          transition: border-color 0.3s ease;
          caret-color: #C5A059;
        }
        
        .auth-input::placeholder { color: #AAAAAA; }
        .auth-input:focus { border-bottom-color: #C5A059; }
        
        .auth-input-line {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #C5A059;
          transition: width 0.4s ease;
        }
        
        .auth-input:focus ~ .auth-input-line { width: 100%; }
        
        .auth-eye-btn {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #999999;
          font-size: 16px;
          padding: 4px;
          line-height: 1;
          transition: color 0.2s;
        }
        
        .auth-eye-btn:hover { color: #C5A059; }
        
        .auth-forgot {
          display: block;
          text-align: right;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0.08em;
          color: #666666;
          text-decoration: none;
          margin-top: -16px;
          margin-bottom: 40px;
          transition: color 0.2s;
        }
        
        .auth-forgot:hover { color: #C5A059; }
        
        .auth-error {
          font-size: 13px;
          color: #C5A059;
          letter-spacing: 0.03em;
          margin-bottom: 24px;
          padding: 14px 18px;
          border-left: 3px solid #C5A059;
          background: rgba(197, 160, 89, 0.08);
        }
        
        .auth-btn {
          width: 100%;
          padding: 18px;
          background: #1A1A1A;
          border: none;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.25em;
          color: #FFFFFF;
          text-transform: uppercase;
          transition: background 0.3s ease, transform 0.2s ease;
        }
        
        .auth-btn:hover { background: #333333; transform: translateY(-1px); }
        .auth-btn:active { transform: translateY(0); }
        .auth-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        
        .auth-btn-loading {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        
        .auth-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #FFFFFF;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        
        @keyframes spin { to { transform: rotate(360deg); } }
        
        .auth-register-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 32px;
        }
        
        .auth-register-text {
          font-size: 13px;
          font-weight: 300;
          color: #666666;
          letter-spacing: 0.03em;
        }
        
        .auth-register-link {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: #C5A059;
          text-decoration: none;
          text-transform: uppercase;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s;
        }
        
        .auth-register-link:hover { border-bottom-color: #C5A059; }
        
        @media (max-width: 768px) {
          .auth-page { grid-template-columns: 1fr; }
          .auth-left { display: none; }
          .auth-right { padding: 48px 32px; }
        }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .auth-animate { animation: fadeUp 0.6s ease forwards; opacity: 0; }
        .auth-animate-1 { animation-delay: 0.05s; }
        .auth-animate-2 { animation-delay: 0.12s; }
        .auth-animate-3 { animation-delay: 0.2s; }
        .auth-animate-4 { animation-delay: 0.28s; }
        .auth-animate-5 { animation-delay: 0.36s; }
      `}</style>

      <div className="auth-page">
        <div className="auth-left">
          <div className="auth-left-bg" />
          <div className="auth-left-overlay" />
          <Link href="/" className="auth-logo">MaisonLuxe</Link>
          <div className="auth-left-content">
            <p className="auth-tagline">Est. 1924 · Paris</p>
            <h2 className="auth-headline">The Art of<br />Timeless Beauty.</h2>
            <div className="auth-divider" />
          </div>
        </div>

        <div className="auth-right">
          <p className="auth-form-eyebrow auth-animate auth-animate-1">Welcome Back</p>
          <h1 className="auth-form-title auth-animate auth-animate-2">Sign In</h1>
          <p className="auth-form-subtitle auth-animate auth-animate-3">Access your personal collection</p>

          <form onSubmit={handleSubmit}>
            <div className="auth-field auth-animate auth-animate-3">
              <label className="auth-label" htmlFor="email">Email Address</label>
              <div className="auth-input-wrap">
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  className="auth-input" 
                  placeholder="your@email.com" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  autoComplete="email" 
                />
                <span className="auth-input-line" />
              </div>
            </div>

            <div className="auth-field auth-animate auth-animate-4">
              <label className="auth-label" htmlFor="password">Password</label>
              <div className="auth-input-wrap">
                <input 
                  id="password" 
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  className="auth-input" 
                  placeholder="Enter your password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  required 
                  autoComplete="current-password" 
                />
                <span className="auth-input-line" />
                <button 
                  type="button" 
                  className="auth-eye-btn" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "○" : "●"}
                </button>
              </div>
            </div>

            <a href="#" className="auth-forgot auth-animate auth-animate-4">Forgot password?</a>

            {error && <div className="auth-error">{error}</div>}

            <button 
              type="submit" 
              className="auth-btn auth-animate auth-animate-5" 
              disabled={loading}
            >
              {loading ? (
                <span className="auth-btn-loading">
                  <span className="auth-spinner" />
                  Signing in...
                </span>
              ) : "Enter the Maison"}
            </button>
          </form>

          <div className="auth-register-row auth-animate auth-animate-5">
            <span className="auth-register-text">New to MaisonLuxe?</span>
            <Link href="/register" className="auth-register-link">Create Account</Link>
          </div>
        </div>
      </div>
    </>
  );
}
