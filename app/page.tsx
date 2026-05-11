"use client";

import { useState, useEffect } from "react";
import LoginScreen from "./components/LoginScreen";
import TopBar from "./components/TopBar";
import BottomNav from "./components/BottomNav";
import HomeScreen from "./components/HomeScreen";
import CoursesScreen from "./components/CoursesScreen";
import StudyScreen from "./components/StudyScreen";
import DoubtsScreen from "./components/DoubtsScreen";
import ProfileScreen from "./components/ProfileScreen";

type Screen = "home" | "courses" | "study" | "doubts";

const TOPBAR_H = 88;
const BOTTOMNAV_H = 70;

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeScreen, setActiveScreen] = useState<Screen>("home");
  const [showProfile, setShowProfile] = useState(false);

  /* Reset scroll to top on screen change */
  useEffect(() => {
    const el = document.getElementById("screen-content");
    if (el) el.scrollTop = 0;
  }, [activeScreen]);

  if (!isLoggedIn) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#CBD5E1",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
      }}>
        <div style={{ width: 390, minHeight: "100vh", position: "relative", overflow: "hidden" }}>
          <LoginScreen onLogin={() => setIsLoggedIn(true)} />
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#CBD5E1",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
    }}>
      <div style={{
        width: 390,
        minHeight: "100vh",
        position: "relative",
        background: "#F0F4FF",
        overflow: "hidden",
      }}>
        {/* Profile Slide-over */}
        {showProfile && (
          <ProfileScreen
            onLogout={() => { setIsLoggedIn(false); setShowProfile(false); }}
            onClose={() => setShowProfile(false)}
          />
        )}

        {/* Sticky Top Bar */}
        <TopBar
          courseName="CLAT 2026"
          onProfileClick={() => setShowProfile(true)}
        />

        {/* Scrollable screen area */}
        <div
          id="screen-content"
          style={{
            overflowY: "auto",
            height: `calc(100vh - ${TOPBAR_H}px - ${BOTTOMNAV_H}px)`,
            WebkitOverflowScrolling: "touch",
          }}
          className="no-scroll"
        >
          {activeScreen === "home" && (
            <HomeScreen onNavigate={(s) => setActiveScreen(s as Screen)} />
          )}
          {activeScreen === "courses" && <CoursesScreen />}
          {activeScreen === "study" && <StudyScreen />}
          {activeScreen === "doubts" && <DoubtsScreen />}
        </div>

        {/* Bottom Navigation */}
        <BottomNav active={activeScreen} onChange={setActiveScreen} />
      </div>
    </div>
  );
}
