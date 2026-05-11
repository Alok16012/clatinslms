"use client";

import { StarIcon, ClockIcon, ChevronRight } from "./icons";
import { useState } from "react";

const SearchSvg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
);

const categories = ["All", "CLAT", "CUET", "AILET", "Law Entrance"];

const courses = [
  {
    title: "CLAT 2026 Complete Course",
    desc: "Full syllabus · 500+ hours of video + live classes",
    price: "₹18,999", original: "₹35,000",
    rating: 4.9, students: "12.4k", hours: "500+",
    tag: "BESTSELLER", tagColor: "#DC2626",
    gradient: "linear-gradient(135deg,#1B2B6B,#2D4499)",
    emoji: "⚖️", category: "CLAT",
    features: ["Live + Recorded", "500+ Practice Qs", "All India Mock Rank"],
    discount: "46% off",
  },
  {
    title: "CLAT Mock Test Series 2026",
    desc: "100+ full-length mocks with detailed analysis",
    price: "₹4,999", original: "₹9,999",
    rating: 4.8, students: "8.2k", hours: "100+ Tests",
    tag: "FREE TRIAL", tagColor: "#059669",
    gradient: "linear-gradient(135deg,#059669,#047857)",
    emoji: "📝", category: "CLAT",
    features: ["100 Full Mocks", "AIR Ranking", "Detailed Solutions"],
    discount: "50% off",
  },
  {
    title: "CUET Law 2026 Preparation",
    desc: "CUET-UG Law entrance complete package",
    price: "₹12,999", original: "₹22,000",
    rating: 4.7, students: "5.1k", hours: "300+",
    tag: "NEW", tagColor: "#7C3AED",
    gradient: "linear-gradient(135deg,#7C3AED,#6D28D9)",
    emoji: "🏛️", category: "CUET",
    features: ["Live Classes", "Mock Tests", "Study Material"],
    discount: "41% off",
  },
  {
    title: "Legal Reasoning Mastery",
    desc: "1000+ practice questions with video solutions",
    price: "₹3,499", original: "₹7,000",
    rating: 4.9, students: "9.8k", hours: "80+",
    tag: "TOP RATED", tagColor: "#D97706",
    gradient: "linear-gradient(135deg,#D97706,#B45309)",
    emoji: "⚖️", category: "CLAT",
    features: ["1000+ Questions", "Video Solutions", "Topic-wise Tests"],
    discount: "50% off",
  },
  {
    title: "Free CLAT Demo Classes",
    desc: "7-day free trial with top faculty",
    price: "FREE", original: "",
    rating: 4.8, students: "20k+", hours: "20+",
    tag: "FREE", tagColor: "#059669",
    gradient: "linear-gradient(135deg,#1B2B6B,#1E3A8A)",
    emoji: "🎁", category: "CLAT",
    features: ["Live + Recorded", "Doubt Support", "No Credit Card"],
    discount: "",
  },
  {
    title: "AILET 2026 Crash Course",
    desc: "NLU Delhi-focused preparation in 60 days",
    price: "₹8,499", original: "₹15,000",
    rating: 4.6, students: "3.4k", hours: "150+",
    tag: "POPULAR", tagColor: "#DC2626",
    gradient: "linear-gradient(135deg,#DC2626,#B91C1C)",
    emoji: "🏆", category: "AILET",
    features: ["60-Day Plan", "Past Papers", "Faculty Mentors"],
    discount: "43% off",
  },
];

export default function CoursesScreen() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchText, setSearchText] = useState("");

  const filtered = courses.filter(c => {
    const matchCat = activeCategory === "All" || c.category === activeCategory;
    const matchSearch = c.title.toLowerCase().includes(searchText.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ background: "#F0F4FF", paddingBottom: 20 }}>

      {/* Header */}
      <div style={{ background: "white", padding: "16px 16px 0", borderBottom: "1px solid #F0F0F5" }}>
        <h2 style={{ margin: "0 0 14px", fontSize: 22, fontWeight: 800, color: "#1A1A2E", letterSpacing: "-0.3px" }}>Our Courses</h2>

        {/* Search */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          background: "#F9FAFB", borderRadius: 14,
          padding: "11px 14px", border: "1.5px solid #EEEFF5",
          marginBottom: 14,
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.04)",
        }}>
          <SearchSvg />
          <input
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            placeholder="Search courses, topics..."
            style={{ flex: 1, background: "none", border: "none", fontSize: 14, color: "#374151", outline: "none" }}
          />
        </div>

        {/* Category tabs */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 14 }} className="no-scroll">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: "8px 18px", borderRadius: 22, fontSize: 12.5, fontWeight: 700,
              border: "none", cursor: "pointer", whiteSpace: "nowrap",
              background: activeCategory === cat ? "#1B2B6B" : "#F3F4F6",
              color: activeCategory === cat ? "white" : "#374151",
              boxShadow: activeCategory === cat ? "0 3px 10px rgba(27,43,107,0.3)" : "none",
            }}>{cat}</button>
          ))}
        </div>
      </div>

      {/* Course Count */}
      <div style={{ padding: "14px 16px 0" }}>
        <p style={{ margin: "0 0 12px", fontSize: 13, color: "#6B7280" }}>
          Showing <strong style={{ color: "#1A1A2E" }}>{filtered.length}</strong> courses
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {filtered.map((course, i) => (
            <div key={i} style={{
              background: "white", borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
            }}>
              {/* Course Banner */}
              <div style={{
                height: 100,
                background: course.gradient,
                display: "flex", alignItems: "center",
                padding: "0 18px",
                position: "relative", overflow: "hidden",
              }}>
                {/* bg decor */}
                <div style={{ position: "absolute", right: -20, top: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
                <div style={{ position: "absolute", right: 40, bottom: -30, width: 70, height: 70, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />

                <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1 }}>
                  <div style={{
                    width: 58, height: 58, borderRadius: 16,
                    background: "rgba(255,255,255,0.18)",
                    border: "1.5px solid rgba(255,255,255,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 28, flexShrink: 0,
                  }}>{course.emoji}</div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 14.5, fontWeight: 800, color: "white", lineHeight: 1.3 }}>{course.title}</h3>
                    <p style={{ margin: "4px 0 0", fontSize: 11, color: "rgba(255,255,255,0.75)", lineHeight: 1.4 }}>{course.desc}</p>
                  </div>
                </div>

                {/* Tag badge */}
                <div style={{
                  position: "absolute", top: 12, right: 12,
                  background: course.tagColor, color: "white",
                  fontSize: 9.5, fontWeight: 800, padding: "3px 10px", borderRadius: 20,
                  boxShadow: `0 2px 6px ${course.tagColor}60`,
                }}>{course.tag}</div>
              </div>

              {/* Course Details */}
              <div style={{ padding: "14px 16px" }}>
                {/* Stats row */}
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <StarIcon />
                    <span style={{ fontSize: 12.5, fontWeight: 800, color: "#374151" }}>{course.rating}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ fontSize: 12, color: "#9CA3AF" }}>👥</span>
                    <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 600 }}>{course.students}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <ClockIcon />
                    <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 600 }}>{course.hours}</span>
                  </div>
                </div>

                {/* Features */}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                  {course.features.map((f, j) => (
                    <span key={j} style={{
                      background: "#F0F4FF", color: "#1B2B6B",
                      fontSize: 10.5, fontWeight: 700,
                      padding: "4px 10px", borderRadius: 20,
                      border: "1px solid #C7D2FE",
                    }}>✓ {f}</span>
                  ))}
                </div>

                {/* Price + CTA */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <span style={{
                      fontSize: 22, fontWeight: 900,
                      color: course.price === "FREE" ? "#059669" : "#1A1A2E",
                    }}>{course.price}</span>
                    {course.original && (
                      <span style={{ fontSize: 13, color: "#9CA3AF", marginLeft: 6, textDecoration: "line-through" }}>
                        {course.original}
                      </span>
                    )}
                    {course.discount && (
                      <span style={{
                        display: "block", fontSize: 11, fontWeight: 700, color: "#059669", marginTop: 1,
                      }}>{course.discount}</span>
                    )}
                  </div>
                  <button style={{
                    background: "linear-gradient(135deg,#1B2B6B,#2D4499)",
                    color: "white", border: "none", borderRadius: 14,
                    padding: "11px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(27,43,107,0.3)",
                  }}>
                    {course.price === "FREE" ? "Enroll Free" : "Buy Now"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Access Pass */}
      <div style={{ padding: "20px 16px 0" }}>
        <div style={{
          background: "linear-gradient(135deg,#1B2B6B,#2D4499)",
          borderRadius: 22, padding: "20px 18px",
          position: "relative", overflow: "hidden",
          boxShadow: "0 8px 28px rgba(27,43,107,0.3)",
        }}>
          <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <span style={{ background: "#F5A623", color: "white", fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 20 }}>
                BEST VALUE
              </span>
              <p style={{ margin: "8px 0 3px", fontSize: 17, fontWeight: 800, color: "white" }}>All Access Pass</p>
              <p style={{ margin: "0 0 8px", fontSize: 12, color: "rgba(255,255,255,0.75)" }}>Unlock all courses + live classes + tests</p>
              <p style={{ margin: 0, fontSize: 24, fontWeight: 900, color: "#F5A623" }}>
                ₹24,999<span style={{ fontSize: 13, fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>/year</span>
              </p>
            </div>
            <button style={{
              background: "linear-gradient(135deg,#F5A623,#E8930A)",
              color: "white", border: "none", borderRadius: 14,
              padding: "13px 18px", fontSize: 13, fontWeight: 800, cursor: "pointer",
              boxShadow: "0 4px 14px rgba(245,166,35,0.4)",
              flexShrink: 0,
            }}>Get Access</button>
          </div>
        </div>
      </div>
    </div>
  );
}
