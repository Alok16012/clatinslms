"use client";

import { SendIcon, UploadIcon } from "./icons";
import { useState } from "react";

const doubts = [
  {
    id: 1,
    question: "In legal reasoning, if Principle states 'No person shall be deprived of life except according to procedure established by law', and Facts state 'A was shot dead by police without any FIR', what would be the answer?",
    subject: "Legal Reasoning",
    status: "answered",
    time: "2h ago",
    answers: 1,
    teacher: "Adv. Priya Sharma",
    teacherAnswer: "Correct answer is that A's fundamental right under Article 21 has been violated, as there was no procedure established by law followed. The police action is unconstitutional.",
  },
  {
    id: 2,
    question: "How to differentiate between ratio decidendi and obiter dicta in a judgment? Can you give an example from a recent SC case?",
    subject: "Legal Aptitude",
    status: "answered",
    time: "5h ago",
    answers: 2,
    teacher: "Rahul Verma",
    teacherAnswer: "Ratio decidendi is the binding legal rule. Obiter dicta are observations not essential to the decision. In Maneka Gandhi v. Union of India, the rule that procedure must be fair, just & reasonable is ratio. Comments on personal liberty's scope are obiter.",
  },
  {
    id: 3,
    question: "What is the difference between CLAT and AILET syllabus? Should I focus on both separately?",
    subject: "Exam Strategy",
    status: "pending",
    time: "30 min ago",
    answers: 0,
  },
  {
    id: 4,
    question: "Reading comprehension strategy for CLAT — how to finish all 5 passages in 45 minutes?",
    subject: "English",
    status: "pending",
    time: "1h ago",
    answers: 0,
  },
];

const forumPosts = [
  { user: "Arjun K.", avatar: "🧑‍💻", post: "How many mock tests should I do per week for CLAT 2026?", likes: 24, replies: 18, time: "2h" },
  { user: "Sneha R.", avatar: "👩‍🎓", post: "Is CUET Law easier than CLAT? Planning to apply for both.", likes: 31, replies: 22, time: "4h" },
  { user: "Vikram S.", avatar: "👨‍💼", post: "Anyone got NLU Delhi cut-offs for last year? Trying to gauge my score.", likes: 15, replies: 11, time: "6h" },
];

export default function DoubtsScreen() {
  const [activeSection, setActiveSection] = useState<"mydoubts" | "ask" | "forum">("mydoubts");
  const [expandedDoubt, setExpandedDoubt] = useState<number | null>(null);
  const [questionText, setQuestionText] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("Legal Reasoning");

  return (
    <div style={{ background: "#F0F4FF", paddingBottom: 90 }}>
      {/* Header */}
      <div style={{ background: "white", padding: "16px 16px 0", borderBottom: "1px solid #F3F4F6" }}>
        <h2 style={{ margin: "0 0 14px", fontSize: 22, fontWeight: 800, color: "#1A1A2E" }}>Doubt Solving</h2>

        {/* Section Tabs */}
        <div style={{ display: "flex", gap: 6, paddingBottom: 14 }}>
          {[
            { id: "mydoubts" as const, label: "My Doubts" },
            { id: "ask" as const, label: "Ask Doubt" },
            { id: "forum" as const, label: "Forum" },
          ].map(s => (
            <button key={s.id} onClick={() => setActiveSection(s.id)} style={{
              flex: 1, padding: "10px", borderRadius: 12, fontSize: 13, fontWeight: 600,
              border: "none", cursor: "pointer",
              background: activeSection === s.id ? "#1B2B6B" : "#F3F4F6",
              color: activeSection === s.id ? "white" : "#374151",
            }}>{s.label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "16px 16px 0" }}>

        {/* MY DOUBTS */}
        {activeSection === "mydoubts" && (
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              {[
                { label: "All", count: 4 },
                { label: "Pending", count: 2 },
                { label: "Answered", count: 2 },
              ].map((f, i) => (
                <button key={i} style={{
                  padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                  border: "1px solid #E5E7EB", cursor: "pointer",
                  background: i === 0 ? "#1B2B6B" : "white",
                  color: i === 0 ? "white" : "#374151",
                }}>
                  {f.label} ({f.count})
                </button>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {doubts.map((d) => (
                <div key={d.id} style={{
                  background: "white", borderRadius: 16,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.06)", overflow: "hidden",
                }}>
                  <div
                    onClick={() => setExpandedDoubt(expandedDoubt === d.id ? null : d.id)}
                    style={{ padding: "14px 16px", cursor: "pointer" }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        <span style={{
                          background: "#EEF2FF", color: "#1B2B6B",
                          fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20,
                        }}>{d.subject}</span>
                        <span style={{
                          background: d.status === "answered" ? "#DCFCE7" : "#FEF9C3",
                          color: d.status === "answered" ? "#15803D" : "#D97706",
                          fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20,
                        }}>
                          {d.status === "answered" ? "✓ Answered" : "⏳ Pending"}
                        </span>
                      </div>
                      <span style={{ fontSize: 11, color: "#9CA3AF" }}>{d.time}</span>
                    </div>
                    <p style={{
                      margin: 0, fontSize: 13, color: "#374151", lineHeight: 1.5,
                      display: "-webkit-box",
                      WebkitLineClamp: expandedDoubt === d.id ? "none" : 2,
                      WebkitBoxOrient: "vertical" as const,
                      overflow: expandedDoubt === d.id ? "visible" : "hidden",
                    }}>{d.question}</p>
                    {d.answers > 0 && expandedDoubt !== d.id && (
                      <p style={{ margin: "6px 0 0", fontSize: 12, color: "#1B2B6B", fontWeight: 600 }}>
                        {d.answers} answer{d.answers > 1 ? "s" : ""} · Tap to view
                      </p>
                    )}
                  </div>

                  {/* Expanded Answer */}
                  {expandedDoubt === d.id && d.teacherAnswer && (
                    <div style={{
                      borderTop: "1px solid #F3F4F6",
                      padding: "14px 16px",
                      background: "#F9FAFB",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: "50%",
                          background: "linear-gradient(135deg, #1B2B6B, #4263C8)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 14,
                        }}>👨‍🏫</div>
                        <div>
                          <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#1A1A2E" }}>{d.teacher}</p>
                          <p style={{ margin: 0, fontSize: 10, color: "#9CA3AF" }}>Faculty · CLATians</p>
                        </div>
                      </div>
                      <p style={{ margin: 0, fontSize: 13, color: "#374151", lineHeight: 1.6 }}>
                        {d.teacherAnswer}
                      </p>
                      <button style={{
                        marginTop: 10, background: "none", border: "1px solid #E5E7EB",
                        borderRadius: 10, padding: "6px 14px", fontSize: 12, fontWeight: 600,
                        color: "#6B7280", cursor: "pointer",
                      }}>👍 Helpful</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ASK DOUBT */}
        {activeSection === "ask" && (
          <div>
            <div style={{ background: "white", borderRadius: 16, padding: "16px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", marginBottom: 16 }}>
              <p style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: "#1A1A2E" }}>Select Subject</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Legal Reasoning", "English", "GK & Current Affairs", "Quantitative Techniques", "Logical Reasoning"].map(sub => (
                  <button key={sub} onClick={() => setSelectedSubject(sub)} style={{
                    padding: "8px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                    border: "1px solid",
                    borderColor: selectedSubject === sub ? "#1B2B6B" : "#E5E7EB",
                    background: selectedSubject === sub ? "#EEF2FF" : "white",
                    color: selectedSubject === sub ? "#1B2B6B" : "#374151",
                    cursor: "pointer",
                  }}>{sub}</button>
                ))}
              </div>
            </div>

            <div style={{ background: "white", borderRadius: 16, padding: "16px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", marginBottom: 16 }}>
              <p style={{ margin: "0 0 10px", fontSize: 14, fontWeight: 700, color: "#1A1A2E" }}>Type Your Doubt</p>
              <textarea
                value={questionText}
                onChange={e => setQuestionText(e.target.value)}
                placeholder="Describe your doubt clearly. Include the question if you have one..."
                style={{
                  width: "100%", minHeight: 120,
                  border: "1px solid #E5E7EB", borderRadius: 12,
                  padding: "12px 14px", fontSize: 13, color: "#374151",
                  resize: "none", outline: "none", fontFamily: "inherit",
                  lineHeight: 1.5,
                }}
              />
              <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                <button style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  background: "#F9FAFB", border: "1px dashed #D1D5DB",
                  borderRadius: 12, padding: "12px",
                  fontSize: 13, fontWeight: 600, color: "#6B7280", cursor: "pointer",
                }}>
                  <UploadIcon /> Attach Image
                </button>
              </div>
            </div>

            {/* AI Hint */}
            <div style={{
              background: "linear-gradient(135deg, #F5F3FF, #EDE9FE)",
              borderRadius: 14, padding: "14px 16px", marginBottom: 16,
              border: "1px solid #DDD6FE",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 18 }}>🤖</span>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#5B21B6" }}>AI Doubt Assistant</p>
                <span style={{ background: "#8B5CF6", color: "white", fontSize: 9, fontWeight: 800, padding: "2px 8px", borderRadius: 20 }}>BETA</span>
              </div>
              <p style={{ margin: 0, fontSize: 12, color: "#7C3AED" }}>
                Get instant AI-powered hints before waiting for faculty response.
              </p>
              <button style={{
                marginTop: 10, background: "linear-gradient(135deg, #8B5CF6, #6D28D9)",
                color: "white", border: "none", borderRadius: 10,
                padding: "8px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer",
              }}>Get AI Hint</button>
            </div>

            <button style={{
              width: "100%", background: "linear-gradient(135deg, #1B2B6B, #2D4499)",
              color: "white", border: "none", borderRadius: 14,
              padding: "15px", fontSize: 15, fontWeight: 700, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
              <SendIcon /> Submit Doubt
            </button>
          </div>
        )}

        {/* FORUM */}
        {activeSection === "forum" && (
          <div>
            <div style={{
              background: "linear-gradient(135deg, #1B2B6B, #2D4499)",
              borderRadius: 14, padding: "14px 16px", marginBottom: 14,
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "white" }}>Discussion Forum</p>
                <p style={{ margin: "2px 0 0", fontSize: 11, color: "rgba(255,255,255,0.8)" }}>2.4k CLATians discussing now</p>
              </div>
              <button style={{
                background: "white", color: "#1B2B6B",
                border: "none", borderRadius: 10, padding: "8px 14px",
                fontSize: 12, fontWeight: 700, cursor: "pointer",
              }}>+ Post</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {forumPosts.map((p, i) => (
                <div key={i} style={{
                  background: "white", borderRadius: 14, padding: "14px 16px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: "50%",
                      background: "linear-gradient(135deg, #EEF2FF, #C7D2FE)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 20,
                    }}>{p.avatar}</div>
                    <div>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#1A1A2E" }}>{p.user}</p>
                      <p style={{ margin: 0, fontSize: 10, color: "#9CA3AF" }}>{p.time} ago</p>
                    </div>
                  </div>
                  <p style={{ margin: "0 0 12px", fontSize: 13, color: "#374151", lineHeight: 1.5 }}>{p.post}</p>
                  <div style={{ display: "flex", gap: 16 }}>
                    <button style={{
                      display: "flex", alignItems: "center", gap: 6,
                      background: "none", border: "none", cursor: "pointer",
                      color: "#6B7280", fontSize: 12, fontWeight: 600,
                    }}>👍 {p.likes}</button>
                    <button style={{
                      display: "flex", alignItems: "center", gap: 6,
                      background: "none", border: "none", cursor: "pointer",
                      color: "#6B7280", fontSize: 12, fontWeight: 600,
                    }}>💬 {p.replies} Replies</button>
                    <button style={{
                      display: "flex", alignItems: "center", gap: 6,
                      background: "none", border: "none", cursor: "pointer",
                      color: "#6B7280", fontSize: 12, fontWeight: 600,
                    }}>🔗 Share</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
