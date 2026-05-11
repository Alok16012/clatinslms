"use client";

interface TopBarProps {
  courseName?: string;
  onProfileClick?: () => void;
}

const BellSvg = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const PhoneSvg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.59 1.25h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l1.27-.85a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const UserSvg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const PlayArrow = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#1B2B6B"><polygon points="5 3 19 12 5 21 5 3"/></svg>
);

export default function TopBar({ courseName = "CLAT 2026", onProfileClick }: TopBarProps) {
  return (
    <div style={{
      background: "white",
      padding: "12px 16px 10px",
      borderBottom: "1px solid #F0F0F5",
      position: "sticky",
      top: 0,
      zIndex: 40,
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    }}>
      {/* Row 1 — Logo + Icons */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        {/* CLATians Logo */}
        <div style={{
          background: "linear-gradient(135deg,#1B2B6B 0%,#2D4499 100%)",
          borderRadius: 12, padding: "7px 16px",
          display: "flex", alignItems: "center",
          boxShadow: "0 3px 10px rgba(27,43,107,0.25)",
        }}>
          <span style={{ fontWeight: 900, fontSize: 18, color: "white", letterSpacing: "0.5px" }}>
            CLAT<span style={{ color: "#F5A623" }}>ians</span>
          </span>
        </div>

        {/* Action icons */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {[
            { icon: <PhoneSvg />, badge: false },
            { icon: <BellSvg />, badge: true },
            { icon: <UserSvg />, badge: false, onClick: onProfileClick },
          ].map((item, i) => (
            <button key={i} onClick={item.onClick} style={{
              width: 38, height: 38, borderRadius: "50%",
              background: "#F9FAFB", border: "1.5px solid #EEEFF5",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", position: "relative",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}>
              {item.icon}
              {item.badge && (
                <span style={{
                  position: "absolute", top: 5, right: 5,
                  width: 8, height: 8, borderRadius: "50%",
                  background: "#E63946",
                  border: "1.5px solid white",
                  boxShadow: "0 1px 3px rgba(230,57,70,0.4)",
                }} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Row 2 — Course Chips */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{
            background: "#F3F4F6", borderRadius: 20,
            padding: "4px 11px", fontSize: 11.5, fontWeight: 600, color: "#374151",
          }}>12th</span>
          <span style={{
            background: "#EEF2FF", borderRadius: 20,
            padding: "4px 11px", fontSize: 11.5, fontWeight: 700, color: "#1B2B6B",
            border: "1px solid #C7D2FE",
          }}>{courseName}</span>
          <span style={{
            background: "#DCFCE7", borderRadius: 20,
            padding: "4px 11px", fontSize: 11.5, fontWeight: 800, color: "#15803D",
            border: "1px solid #BBF7D0",
          }}>FREE</span>
        </div>

        <button style={{
          display: "flex", alignItems: "center", gap: 5,
          background: "none", border: "none", cursor: "pointer",
          color: "#1B2B6B", fontSize: 12.5, fontWeight: 700,
          padding: "4px 2px",
        }}>
          Change course <PlayArrow />
        </button>
      </div>
    </div>
  );
}
