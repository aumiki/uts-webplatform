"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed. Please try again.");
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 2500);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStrength = (pw: string) => {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };
  const strength = getStrength(formData.password);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "#d4756b", "#c9a96e", "#8fae8f", "#6aab6a"][strength];

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
          background-image: url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1200');
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
          background: linear-gradient(to top, rgba(26,26,26,0.92) 0%, rgba(26,26,26,0.25) 55%, transparent 100%);
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
          letter-spacing: 0.18em;
          color: #C5A059;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        
        .auth-headline {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 3.5vw, 52px);
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
          overflow-y: auto;
        }
        
        .auth-right::before {
          content: '';
          position: absolute;
          left: 0;
          top: 15%;
          bottom: 15%;
          width: 1px;
          background: linear-gradient(to bottom, transparent, #C5A05944, transparent);
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
          font-size: clamp(32px, 3vw, 44px);
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
          margin-bottom: 40px;
        }
        
        .auth-field {
          margin-bottom: 26px;
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
        
        .auth-strength {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 8px;
        }
        
        .auth-strength-bars {
          display: flex;
          gap: 4px;
          flex: 1;
        }
        
        .auth-strength-bar {
          height: 2px;
          flex: 1;
          background: #CCCCCC;
          transition: background 0.3s ease;
        }
        
        .auth-strength-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          min-width: 40px;
          text-align: right;
          transition: color 0.3s;
        }
        
        .auth-error {
          font-size: 13px;
          color: #C5A059;
          letter-spacing: 0.03em;
          margin-bottom: 20px;
          padding: 14px 18px;
          border-left: 3px solid #C5A059;
          background: rgba(197, 160, 89, 0.08);
        }
        
        .auth-success {
          text-align: center;
          padding: 40px 0;
        }
        
        .auth-success-icon {
          font-size: 32px;
          margin-bottom: 16px;
          color: #C5A059;
        }
        
        .auth-success-title {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 400;
          color: #1A1A1A;
          margin-bottom: 12px;
        }
        
        .auth-success-text {
          font-size: 14px;
          font-weight: 300;
          color: #666666;
          letter-spacing: 0.04em;
        }
        
        .auth-success-gold {
          color: #C5A059;
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
        
        .auth-login-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 28px;
        }
        
        .auth-login-text {
          font-size: 13px;
          font-weight: 300;
          color: #666666;
          letter-spacing: 0.03em;
        }
        
        .auth-login-link {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: #C5A059;
          text-decoration: none;
          text-transform: uppercase;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s;
        }
        
        .auth-login-link:hover { border-bottom-color: #C5A059; }
        
        .auth-terms {
          font-size: 12px;
          font-weight: 300;
          color: #999999;
          letter-spacing: 0.03em;
          text-align: center;
          margin-top: 16px;
          line-height: 1.6;
        }
        
        .auth-terms a {
          color: #666666;
          text-decoration: none;
          border-bottom: 1px solid #999999;
        }
        
        .auth-terms a:hover {
          color: #C5A059;
          border-bottom-color: #C5A059;
        }
        
        @media (max-width: 768px) {
          .auth-page { grid-template-columns: 1fr; }
          .auth-left { display: none; }
          .auth-right { padding: 48px 32px; }
          .auth-right::before { display: none; }
        }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .auth-animate { animation: fadeUp 0.6s ease forwards; opacity: 0; }
        .auth-a1 { animation-delay: 0.05s; }
        .auth-a2 { animation-delay: 0.12s; }
        .auth-a3 { animation-delay: 0.18s; }
        .auth-a4 { animation-delay: 0.25s; }
        .auth-a5 { animation-delay: 0.32s; }
        .auth-a6 { animation-delay: 0.4s; }
        .auth-a7 { animation-delay: 0.48s; }
      `}</style>

      <div className="auth-page">
        <div className="auth-left">
          <div className="auth-left-bg" />
          <div className="auth-left-overlay" />
          <Link href="/" className="auth-logo">MaisonLuxe</Link>
          <div className="auth-left-content">
            <p className="auth-tagline">Join the Inner Circle</p>
            <h2 className="auth-headline">Where Beauty<br />Meets Legacy.</h2>
            <div className="auth-divider" />
          </div>
        </div>

        <div className="auth-right">
          {success ? (
            <div className="auth-success auth-animate auth-a1">
              <div className="auth-success-icon">✦</div>
              <h2 className="auth-success-title">Welcome to the Maison.</h2>
              <p className="auth-success-text">
                Your account has been created.<br />
<span className="auth-success-gold">Redirecting to home page…</span>
              </p>
            </div>
          ) : (
            <>
              <p className="auth-form-eyebrow auth-animate auth-a1">New Member</p>
              <h1 className="auth-form-title auth-animate auth-a2">Create Account</h1>
              <p className="auth-form-subtitle auth-animate auth-a3">Begin your journey with MaisonLuxe</p>

              <form onSubmit={handleSubmit}>
                <div className="auth-field auth-animate auth-a3">
                  <label className="auth-label" htmlFor="fullName">Full Name</label>
                  <div className="auth-input-wrap">
                    <input 
                      id="fullName" 
                      name="fullName" 
                      type="text" 
                      className="auth-input" 
                      placeholder="Your full name" 
                      value={formData.fullName} 
                      onChange={handleChange} 
                      required 
                      autoComplete="name" 
                    />
                    <span className="auth-input-line" />
                  </div>
                </div>

                <div className="auth-field auth-animate auth-a4">
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

                <div className="auth-field auth-animate auth-a5">
                  <label className="auth-label" htmlFor="password">Password</label>
                  <div className="auth-input-wrap">
                    <input 
                      id="password" 
                      name="password" 
                      type={showPassword ? "text" : "password"} 
                      className="auth-input" 
                      placeholder="Min. 8 characters" 
                      value={formData.password} 
                      onChange={handleChange} 
                      required 
                      autoComplete="new-password" 
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
                  {formData.password && (
                    <div className="auth-strength">
                      <div className="auth-strength-bars">
                        {[1, 2, 3, 4].map((i) => (
                          <div 
                            key={i} 
                            className="auth-strength-bar" 
                            style={{ background: i <= strength ? strengthColor : "#CCCCCC" }} 
                          />
                        ))}
                      </div>
                      <span 
                        className="auth-strength-label" 
                        style={{ color: strengthColor }}
                      >
                        {strengthLabel}
                      </span>
                    </div>
                  )}
                </div>

                <div className="auth-field auth-animate auth-a6">
                  <label className="auth-label" htmlFor="confirmPassword">Confirm Password</label>
                  <div className="auth-input-wrap">
                    <input 
                      id="confirmPassword" 
                      name="confirmPassword" 
                      type={showConfirm ? "text" : "password"} 
                      className="auth-input" 
                      placeholder="Repeat your password" 
                      value={formData.confirmPassword} 
                      onChange={handleChange} 
                      required 
                      autoComplete="new-password" 
                    />
                    <span className="auth-input-line" />
                    <button 
                      type="button" 
                      className="auth-eye-btn" 
                      onClick={() => setShowConfirm(!showConfirm)}
                    >
                      {showConfirm ? "○" : "●"}
                    </button>
                  </div>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <button 
                  type="submit" 
                  className="auth-btn auth-animate auth-a7" 
                  disabled={loading}
                >
                  {loading ? (
                    <span className="auth-btn-loading">
                      <span className="auth-spinner" />
                      Creating account…
                    </span>
                  ) : "Join MaisonLuxe"}
                </button>

                <p className="auth-terms auth-animate auth-a7">
                  By joining, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                </p>
              </form>

              <div className="auth-login-row auth-animate auth-a7">
                <span className="auth-login-text">Already a member?</span>
                <button 
                  type="button"
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    color: '#C5A059',
                    textTransform: 'uppercase',
                    borderBottom: '1px solid transparent',
                    transition: 'border-color 0.2s'
                  }}
                  onClick={() => router.push("/login")}
                  onMouseOver={(e) => e.currentTarget.style.borderBottomColor = '#C5A059'}
                  onMouseOut={(e) => e.currentTarget.style.borderBottomColor = 'transparent'}
                >
                  Sign In
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
