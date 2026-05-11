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

import VideoLecturesPage from "./components/detail/VideoLecturesPage";
import StudyNotesPage from "./components/detail/StudyNotesPage";
import PracticeQuestionsPage from "./components/detail/PracticeQuestionsPage";
import CurrentAffairsPage from "./components/detail/CurrentAffairsPage";
import TopperStoriesPage from "./components/detail/TopperStoriesPage";
import WhatsNewPage from "./components/detail/WhatsNewPage";
import TipsTricksPage from "./components/detail/TipsTricksPage";

type Screen = "home" | "courses" | "study" | "doubts";
type DetailPage = "videos" | "notes" | "practice" | "current-affairs" | "toppers" | "whats-new" | "tips" | null;

const TOPBAR_H = 90;
const BOTTOMNAV_H = 70;

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeScreen, setActiveScreen] = useState<Screen>("home");
  const [showProfile, setShowProfile] = useState(false);
  const [detailPage, setDetailPage] = useState<DetailPage>(null);

  useEffect(() => {
    const el = document.getElementById("screen-content");
    if (el) el.scrollTop = 0;
  }, [activeScreen, detailPage]);

  const openDetail = (page: DetailPage) => setDetailPage(page);
  const closeDetail = () => setDetailPage(null);

  const handleToolClick = (tool: string) => {
    const map: Record<string, DetailPage> = {
      "videos": "videos",
      "notes": "notes",
      "practice": "practice",
      "current-affairs": "current-affairs",
    };
    if (map[tool]) openDetail(map[tool]);
  };

  const handleKnowMoreClick = (item: string) => {
    const map: Record<string, DetailPage> = {
      "study-tools": "videos",
      "toppers": "toppers",
      "whats-new": "whats-new",
      "tips": "tips",
    };
    if (map[item]) openDetail(map[item]);
  };

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight:"100vh", background:"#CBD5E1", display:"flex", alignItems:"flex-start", justifyContent:"center" }}>
        <div style={{ width:390, minHeight:"100vh", position:"relative", overflow:"hidden" }}>
          <LoginScreen onLogin={() => setIsLoggedIn(true)} />
        </div>
      </div>
    );
  }

  const showNav = !detailPage;

  return (
    <div style={{ minHeight:"100vh", background:"#CBD5E1", display:"flex", alignItems:"flex-start", justifyContent:"center" }}>
      <div style={{ width:390, minHeight:"100vh", position:"relative", background:"#F0F4FF", overflow:"hidden" }}>

        {showProfile && (
          <ProfileScreen
            onLogout={() => { setIsLoggedIn(false); setShowProfile(false); }}
            onClose={() => setShowProfile(false)}
          />
        )}

        {/* Top Bar — always visible */}
        <TopBar courseName="CLAT 2026" onProfileClick={() => setShowProfile(true)} onLogoClick={() => { setDetailPage(null); setActiveScreen("home"); }} />

        {/* Scrollable content */}
        <div
          id="screen-content"
          style={{
            overflowY: "auto",
            height: `calc(100vh - ${TOPBAR_H}px - ${showNav ? BOTTOMNAV_H : 0}px)`,
            WebkitOverflowScrolling: "touch",
          }}
          className="no-scroll"
        >
          {/* ── Detail pages (no bottom nav) ── */}
          {detailPage === "videos"          && <VideoLecturesPage onBack={closeDetail} />}
          {detailPage === "notes"           && <StudyNotesPage onBack={closeDetail} />}
          {detailPage === "practice"        && <PracticeQuestionsPage onBack={closeDetail} />}
          {detailPage === "current-affairs" && <CurrentAffairsPage onBack={closeDetail} />}
          {detailPage === "toppers"         && <TopperStoriesPage onBack={closeDetail} />}
          {detailPage === "whats-new"       && <WhatsNewPage onBack={closeDetail} />}
          {detailPage === "tips"            && <TipsTricksPage onBack={closeDetail} />}

          {/* ── Main screens ── */}
          {!detailPage && activeScreen === "home" && (
            <HomeScreen
              onNavigate={(s) => setActiveScreen(s as Screen)}
              onToolClick={handleToolClick}
              onKnowMoreClick={handleKnowMoreClick}
            />
          )}
          {!detailPage && activeScreen === "courses" && <CoursesScreen />}
          {!detailPage && activeScreen === "study"   && <StudyScreen />}
          {!detailPage && activeScreen === "doubts"  && <DoubtsScreen />}
        </div>

        {/* Bottom Nav — hidden on detail pages */}
        {showNav && (
          <BottomNav
            active={activeScreen}
            onChange={(s) => { setDetailPage(null); setActiveScreen(s); }}
          />
        )}
      </div>
    </div>
  );
}
