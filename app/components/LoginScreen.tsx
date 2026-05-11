"use client";

import { useState } from "react";

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [mode, setMode] = useState<"login" | "otp">("login");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleOtpChange = (val: string, idx: number) => {
    const newOtp = [...otp];
    newOtp[idx] = val.slice(-1);
    setOtp(newOtp);
    if (val && idx < 5) {
      const next = document.getElementById(`otp-${idx + 1}`);
      next?.focus();
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#F0F4FF",
      display: "flex", flexDirection: "column",
    }}>
      {/* Top brand section */}
      <div style={{
        background: "linear-gradient(160deg, #1B2B6B 0%, #2D4499 50%, #1B2B6B 100%)",
        padding: "60px 24px 48px",
        display: "flex", flexDirection: "column", alignItems: "center",
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ position: "absolute", bottom: -20, left: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ position: "absolute", top: 40, left: 20, width: 60, height: 60, borderRadius: "50%", background: "rgba(245,166,35,0.15)" }} />

        {/* Logo */}
        <div style={{
          background: "white", borderRadius: 20, padding: "12px 24px",
          marginBottom: 20, boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        }}>
          <span style={{ fontWeight: 900, fontSize: 28, color: "#1B2B6B", letterSpacing: 1 }}>
            CLAT<span style={{ color: "#F5A623" }}>ians</span>
          </span>
        </div>

        <p style={{ margin: "0 0 6px", color: "rgba(255,255,255,0.9)", fontSize: 16, fontWeight: 600, textAlign: "center" }}>
          India's #1 CLAT Preparation Platform
        </p>
        <p style={{ margin: 0, color: "rgba(255,255,255,0.6)", fontSize: 13, textAlign: "center" }}>
          Join 2 Lakh+ students preparing for top NLUs
        </p>

        {/* Stats */}
        <div style={{ display: "flex", gap: 24, marginTop: 24 }}>
          {[
            { val: "2L+", label: "Students" },
            { val: "500+", label: "Faculty" },
            { val: "AIR 1", label: "CLAT 2025" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <p style={{ margin: 0, fontSize: 20, fontWeight: 900, color: "#F5A623" }}>{s.val}</p>
              <p style={{ margin: 0, fontSize: 11, color: "rgba(255,255,255,0.7)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Login Card */}
      <div style={{
        flex: 1, background: "white",
        borderRadius: "28px 28px 0 0",
        marginTop: -24, padding: "28px 24px",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
      }}>
        {mode === "login" ? (
          <>
            <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: "#1A1A2E" }}>Welcome Back 👋</h2>
            <p style={{ margin: "0 0 24px", fontSize: 14, color: "#6B7280" }}>Login to continue your CLAT journey</p>

            {/* Phone Input */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                Mobile Number
              </label>
              <div style={{
                display: "flex", alignItems: "center",
                border: "1.5px solid #E5E7EB", borderRadius: 14,
                overflow: "hidden", background: "#F9FAFB",
              }}>
                <span style={{ padding: "14px 14px", fontSize: 14, color: "#374151", fontWeight: 600, borderRight: "1px solid #E5E7EB", background: "#F3F4F6" }}>
                  +91
                </span>
                <input
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="Enter your mobile number"
                  type="tel"
                  maxLength={10}
                  style={{
                    flex: 1, border: "none", background: "transparent",
                    padding: "14px 14px", fontSize: 15, outline: "none", color: "#1A1A2E",
                  }}
                />
              </div>
            </div>

            {/* Send OTP */}
            <button
              onClick={() => setMode("otp")}
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #1B2B6B, #2D4499)",
                color: "white", border: "none", borderRadius: 14,
                padding: "15px", fontSize: 16, fontWeight: 700,
                cursor: "pointer", marginBottom: 20,
              }}
            >
              Send OTP
            </button>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
              <span style={{ fontSize: 13, color: "#9CA3AF" }}>or continue with</span>
              <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
            </div>

            {/* Social Login */}
            <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
              {[
                { icon: "G", label: "Google", bg: "#FEF2F2", color: "#DC2626" },
                { icon: "f", label: "Facebook", bg: "#EFF6FF", color: "#2563EB" },
              ].map((s, i) => (
                <button key={i} style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  background: s.bg, border: "1px solid",
                  borderColor: i === 0 ? "#FECACA" : "#BFDBFE",
                  borderRadius: 14, padding: "13px",
                  fontSize: 14, fontWeight: 700, cursor: "pointer", color: s.color,
                }}>
                  <span style={{ fontWeight: 900, fontSize: 18 }}>{s.icon}</span> {s.label}
                </button>
              ))}
            </div>

            {/* Demo login */}
            <button
              onClick={onLogin}
              style={{
                width: "100%", background: "#F9FAFB",
                border: "1.5px dashed #D1D5DB", borderRadius: 14,
                padding: "13px", fontSize: 14, fontWeight: 600,
                color: "#6B7280", cursor: "pointer", marginBottom: 16,
              }}
            >
              🚀 Demo — Enter as Student
            </button>

            <p style={{ textAlign: "center", fontSize: 12, color: "#9CA3AF", margin: 0 }}>
              By continuing you agree to our{" "}
              <span style={{ color: "#1B2B6B", fontWeight: 600 }}>Terms of Service</span>
              {" "}and{" "}
              <span style={{ color: "#1B2B6B", fontWeight: 600 }}>Privacy Policy</span>
            </p>
          </>
        ) : (
          <>
            <button
              onClick={() => setMode("login")}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: "#1B2B6B", fontSize: 13, fontWeight: 600,
                display: "flex", alignItems: "center", gap: 4, marginBottom: 20, padding: 0,
              }}
            >
              ← Back
            </button>

            <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: "#1A1A2E" }}>Verify OTP 🔐</h2>
            <p style={{ margin: "0 0 24px", fontSize: 14, color: "#6B7280" }}>
              Sent to +91 {phone || "XXXXXXXXXX"}
            </p>

            <div style={{ display: "flex", gap: 8, marginBottom: 24, justifyContent: "center" }}>
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  value={digit}
                  onChange={e => handleOtpChange(e.target.value, idx)}
                  type="tel"
                  maxLength={1}
                  style={{
                    width: 48, height: 54, borderRadius: 14,
                    border: digit ? "2px solid #1B2B6B" : "1.5px solid #E5E7EB",
                    textAlign: "center", fontSize: 22, fontWeight: 800,
                    outline: "none", color: "#1B2B6B", background: digit ? "#EEF2FF" : "#F9FAFB",
                  }}
                />
              ))}
            </div>

            <button
              onClick={onLogin}
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #1B2B6B, #2D4499)",
                color: "white", border: "none", borderRadius: 14,
                padding: "15px", fontSize: 16, fontWeight: 700,
                cursor: "pointer", marginBottom: 16,
              }}
            >
              Verify & Login
            </button>

            <p style={{ textAlign: "center", fontSize: 13, color: "#6B7280" }}>
              Didn't receive OTP?{" "}
              <button style={{ background: "none", border: "none", color: "#1B2B6B", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
                Resend in 30s
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
