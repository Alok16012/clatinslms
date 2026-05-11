"use client";

import { PlayIcon, LockIcon, CheckIcon, ChevronRight } from "./icons";
import { useState } from "react";

const studyTabs = ["Videos", "Notes", "Tests", "Flashcards", "Current Affairs"];

const videoTopics = [
  { topic: "Introduction to Legal Reasoning", duration: "45 min", watched: true, subject: "Legal Reasoning" },
  { topic: "Principles & Applications", duration: "52 min", watched: true, subject: "Legal Reasoning" },
  { topic: "Cause & Effect in Law", duration: "38 min", watched: false, subject: "Legal Reasoning" },
  { topic: "Reading Comprehension - Advanced", duration: "60 min", watched: false, locked: true, subject: "English" },
  { topic: "Vocabulary for CLAT", duration: "35 min", watched: false, locked: true, subject: "English" },
];

const noteTopics = [
  { title: "Constitutional Law Notes", pages: 48, size: "2.4 MB", type: "PDF", color: "#E63946" },
  { title: "Legal Aptitude Handbook", pages: 112, size: "5.1 MB", type: "PDF", color: "#1B2B6B" },
  { title: "GK Rapid Revision", pages: 64, size: "3.2 MB", type: "PDF", color: "#8B5CF6" },
  { title: "Current Affairs Jan–May 2026", pages: 180, size: "8.6 MB", type: "PDF", color: "#059669" },
  { title: "English Grammar Shortcuts", pages: 36, size: "1.8 MB", type: "PPT", color: "#F5A623" },
];

const mockTests = [
  { title: "CLAT Full Mock #1", questions: 120, duration: "120 min", attempted: true, score: "87/120", rank: "#142" },
  { title: "CLAT Full Mock #2", questions: 120, duration: "120 min", attempted: true, score: "94/120", rank: "#89" },
  { title: "CLAT Full Mock #3", questions: 120, duration: "120 min", attempted: false },
  { title: "Legal Reasoning Mini Test", questions: 40, duration: "40 min", attempted: false },
  { title: "GK + Current Affairs Test", questions: 50, duration: "50 min", attempted: false, locked: true },
];

const flashcards = [
  { term: "Ratio Decidendi", def: "The legal principle or rule upon which a court's decision is founded." },
  { term: "Obiter Dictum", def: "A remark or observation made by a judge that is not essential to the decision." },
  { term: "Locus Standi", def: "The right or capacity to bring an action before a court of law." },
  { term: "Prima Facie", def: "Based on first impression; accepted as correct until proved otherwise." },
];

const currentAffairs = [
  { date: "May 11, 2026", headline: "Supreme Court upholds Right to Privacy as Fundamental Right", tag: "Law", importance: "HIGH" },
  { date: "May 10, 2026", headline: "Parliament passes New Criminal Laws Amendment Bill 2026", tag: "Polity", importance: "HIGH" },
  { date: "May 9, 2026", headline: "India GDP growth rate at 7.2% for Q4 FY2025-26", tag: "Economy", importance: "MEDIUM" },
  { date: "May 8, 2026", headline: "India signs landmark trade agreement with EU nations", tag: "International", importance: "MEDIUM" },
  { date: "May 7, 2026", headline: "NITI Aayog releases SDG India Index 2026", tag: "Reports", importance: "LOW" },
];

export default function StudyScreen() {
  const [activeTab, setActiveTab] = useState("Videos");
  const [flipped, setFlipped] = useState<number | null>(null);
  const [progress] = useState(42);

  return (
    <div style={{ background: "#F0F4FF", paddingBottom: 90 }}>
      {/* Header */}
      <div style={{ background: "white", padding: "16px 16px 0", borderBottom: "1px solid #F3F4F6" }}>
        <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: "#1A1A2E" }}>Study Material</h2>
        <p style={{ margin: "0 0 14px", fontSize: 13, color: "#6B7280" }}>CLAT 2026 — Complete Course</p>

        {/* Progress */}
        <div style={{
          background: "#F9FAFB", borderRadius: 14, padding: "12px 14px",
          marginBottom: 14, border: "1px solid #E5E7EB",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>Course Progress</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#1B2B6B" }}>{progress}%</span>
          </div>
          <div style={{ height: 8, background: "#E5E7EB", borderRadius: 20, overflow: "hidden" }}>
            <div style={{
              height: "100%", width: `${progress}%`,
              background: "linear-gradient(90deg, #1B2B6B, #4263C8)",
              borderRadius: 20, transition: "width 0.3s",
            }} />
          </div>
          <p style={{ margin: "6px 0 0", fontSize: 11, color: "#9CA3AF" }}>
            42 of 100 videos completed · 3 tests attempted
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 14 }} className="no-scroll">
          {studyTabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: "8px 16px", borderRadius: 22, fontSize: 12, fontWeight: 600,
              border: "none", cursor: "pointer", whiteSpace: "nowrap",
              background: activeTab === tab ? "#1B2B6B" : "#F3F4F6",
              color: activeTab === tab ? "white" : "#374151",
            }}>{tab}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "16px 16px 0" }}>

        {/* VIDEO TAB */}
        {activeTab === "Videos" && (
          <div>
            <p style={{ margin: "0 0 12px", fontSize: 13, color: "#6B7280" }}>Legal Reasoning · Chapter 1</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {videoTopics.map((v, i) => (
                <div key={i} style={{
                  background: "white", borderRadius: 14, padding: "14px 16px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  display: "flex", alignItems: "center", gap: 12,
                  opacity: v.locked ? 0.7 : 1,
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: v.watched
                      ? "linear-gradient(135deg, #DCFCE7, #BBF7D0)"
                      : v.locked
                        ? "#F3F4F6"
                        : "linear-gradient(135deg, #1B2B6B, #2D4499)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    {v.watched
                      ? <CheckIcon />
                      : v.locked
                        ? <LockIcon />
                        : <PlayIcon size={18} />
                    }
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#1A1A2E" }}>{v.topic}</p>
                    <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                      <span style={{
                        background: "#EEF2FF", color: "#1B2B6B",
                        fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 20,
                      }}>{v.subject}</span>
                      <span style={{ fontSize: 11, color: "#9CA3AF" }}>⏱ {v.duration}</span>
                    </div>
                  </div>
                  {!v.locked && !v.watched && (
                    <button style={{
                      background: "#1B2B6B", color: "white", border: "none",
                      borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer",
                    }}>Play</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NOTES TAB */}
        {activeTab === "Notes" && (
          <div>
            <p style={{ margin: "0 0 12px", fontSize: 13, color: "#6B7280" }}>Download study material</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {noteTopics.map((n, i) => (
                <div key={i} style={{
                  background: "white", borderRadius: 14, padding: "14px 16px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  display: "flex", alignItems: "center", gap: 12,
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: `${n.color}15`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 22, flexShrink: 0,
                  }}>
                    {n.type === "PDF" ? "📄" : "📊"}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#1A1A2E" }}>{n.title}</p>
                    <p style={{ margin: "3px 0 0", fontSize: 11, color: "#9CA3AF" }}>
                      {n.pages} pages · {n.size}
                    </p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                    <span style={{
                      background: `${n.color}15`, color: n.color,
                      fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20,
                    }}>{n.type}</span>
                    <button style={{
                      background: n.color, color: "white", border: "none",
                      borderRadius: 8, padding: "5px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer",
                    }}>↓</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TESTS TAB */}
        {activeTab === "Tests" && (
          <div>
            <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
              {[
                { label: "Rank", value: "#89", icon: "🏆" },
                { label: "Avg Score", value: "76%", icon: "📊" },
                { label: "Attempted", value: "2/10", icon: "✅" },
              ].map((s, i) => (
                <div key={i} style={{
                  flex: 1, background: "white", borderRadius: 14, padding: "12px",
                  textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}>
                  <p style={{ margin: 0, fontSize: 20 }}>{s.icon}</p>
                  <p style={{ margin: "4px 0 2px", fontSize: 18, fontWeight: 800, color: "#1B2B6B" }}>{s.value}</p>
                  <p style={{ margin: 0, fontSize: 10, color: "#9CA3AF" }}>{s.label}</p>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {mockTests.map((t, i) => (
                <div key={i} style={{
                  background: "white", borderRadius: 14, padding: "14px 16px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  opacity: t.locked ? 0.6 : 1,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <div>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#1A1A2E" }}>{t.title}</p>
                      <p style={{ margin: "3px 0 0", fontSize: 11, color: "#9CA3AF" }}>
                        {t.questions} Qs · {t.duration}
                      </p>
                    </div>
                    {t.attempted && (
                      <div style={{ textAlign: "right" }}>
                        <p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: "#059669" }}>{t.score}</p>
                        <p style={{ margin: 0, fontSize: 11, color: "#F5A623", fontWeight: 600 }}>Rank {t.rank}</p>
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    {t.attempted ? (
                      <>
                        <button style={{
                          flex: 1, background: "#EEF2FF", color: "#1B2B6B",
                          border: "none", borderRadius: 10, padding: "9px",
                          fontSize: 12, fontWeight: 600, cursor: "pointer",
                        }}>View Analysis</button>
                        <button style={{
                          flex: 1, background: "#1B2B6B", color: "white",
                          border: "none", borderRadius: 10, padding: "9px",
                          fontSize: 12, fontWeight: 600, cursor: "pointer",
                        }}>Reattempt</button>
                      </>
                    ) : t.locked ? (
                      <button style={{
                        flex: 1, background: "#F3F4F6", color: "#9CA3AF",
                        border: "none", borderRadius: 10, padding: "9px",
                        fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                      }}>
                        <LockIcon /> Unlock
                      </button>
                    ) : (
                      <button style={{
                        flex: 1, background: "linear-gradient(135deg, #E63946, #FF6B6B)", color: "white",
                        border: "none", borderRadius: 10, padding: "9px",
                        fontSize: 12, fontWeight: 700, cursor: "pointer",
                      }}>Start Test →</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FLASHCARDS TAB */}
        {activeTab === "Flashcards" && (
          <div>
            <p style={{ margin: "0 0 14px", fontSize: 13, color: "#6B7280" }}>Tap a card to reveal definition</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {flashcards.map((f, i) => (
                <div
                  key={i}
                  onClick={() => setFlipped(flipped === i ? null : i)}
                  style={{
                    background: flipped === i
                      ? "linear-gradient(135deg, #1B2B6B, #2D4499)"
                      : "white",
                    borderRadius: 18, padding: "20px 18px",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                    cursor: "pointer", transition: "all 0.2s",
                    minHeight: 90,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    {flipped !== i ? (
                      <>
                        <span style={{ fontSize: 11, color: "#9CA3AF", display: "block", marginBottom: 6 }}>LEGAL TERM</span>
                        <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#1B2B6B" }}>{f.term}</p>
                        <span style={{ fontSize: 11, color: "#D1D5DB", marginTop: 8, display: "block" }}>Tap to see definition</span>
                      </>
                    ) : (
                      <>
                        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 6 }}>DEFINITION</span>
                        <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "white", lineHeight: 1.5 }}>{f.def}</p>
                        <span style={{ fontSize: 11, color: "#F5A623", marginTop: 8, display: "block" }}>← {f.term}</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CURRENT AFFAIRS TAB */}
        {activeTab === "Current Affairs" && (
          <div>
            <div style={{
              background: "linear-gradient(135deg, #8B5CF6, #6D28D9)",
              borderRadius: 14, padding: "14px 16px", marginBottom: 14,
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "white" }}>📰 Daily Current Affairs</p>
                <p style={{ margin: "2px 0 0", fontSize: 11, color: "rgba(255,255,255,0.8)" }}>Updated: May 11, 2026</p>
              </div>
              <span style={{ background: "rgba(255,255,255,0.2)", color: "white", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20 }}>
                5 new
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {currentAffairs.map((ca, i) => (
                <div key={i} style={{
                  background: "white", borderRadius: 14, padding: "14px 16px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                    <span style={{
                      background: ca.importance === "HIGH" ? "#FEE2E2" : ca.importance === "MEDIUM" ? "#FEF9C3" : "#F3F4F6",
                      color: ca.importance === "HIGH" ? "#DC2626" : ca.importance === "MEDIUM" ? "#D97706" : "#6B7280",
                      fontSize: 9, fontWeight: 800, padding: "2px 8px", borderRadius: 20,
                    }}>{ca.importance}</span>
                    <span style={{ fontSize: 10, color: "#9CA3AF" }}>{ca.date}</span>
                  </div>
                  <p style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 600, color: "#1A1A2E", lineHeight: 1.4 }}>
                    {ca.headline}
                  </p>
                  <span style={{
                    background: "#EEF2FF", color: "#1B2B6B",
                    fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20,
                  }}>{ca.tag}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
