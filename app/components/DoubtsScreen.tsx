"use client";

import { useState, useRef, useEffect } from "react";
import { SendIcon, UploadIcon } from "./icons";

const subjects = ["Legal Reasoning", "English", "GK & Current Affairs", "Quantitative Techniques", "Logical Reasoning"];

const aiResponses: Record<string, string[]> = {
  "Legal Reasoning": [
    "Great question! In legal reasoning for CLAT, always remember the golden rule:",
    "📌 **Apply ONLY the given principle** — never use outside legal knowledge.",
    "**Step-by-step approach:**\n1️⃣ Read the Principle carefully — identify what it says SHALL happen and under what conditions.\n2️⃣ Read the Facts — match them against the principle's conditions.\n3️⃣ Apply mechanically — does the situation in facts meet ALL conditions in the principle?\n4️⃣ Choose the option that correctly applies the principle to the facts.",
    "⚠️ **Common trap:** If the facts seem morally wrong but satisfy the principle, the answer still follows the principle. CLAT tests application, not morality.",
    "💡 **Pro tip:** Keywords like 'except', 'provided that', 'notwithstanding' change the rule — always highlight them first.",
  ],
  "English": [
    "For Reading Comprehension in CLAT, here's the proven strategy:",
    "📌 **RC is about inference, not information recall.**",
    "**Approach:**\n1️⃣ Skim the passage in 2 minutes — get the main idea and tone.\n2️⃣ Read each question BEFORE going back to the passage.\n3️⃣ For inference questions — the answer is never too extreme or absolute.\n4️⃣ For vocabulary questions — use context, not dictionary meaning.\n5️⃣ Eliminate options that use words NOT supported by the passage.",
    "⚠️ **Avoid:** Choosing answers based on your general knowledge — only what the passage says counts.",
    "💡 **Time tip:** Spend max 8 minutes per passage. If a question takes more than 90 seconds, mark and move on.",
  ],
  "GK & Current Affairs": [
    "Current Affairs strategy for CLAT 2026:",
    "📌 **CLAT CA is based on events from 6–10 months before the exam date.**",
    "**Focus areas (in order of importance):**\n1️⃣ Supreme Court judgments & constitutional matters\n2️⃣ Parliament — bills passed, new laws\n3️⃣ International relations — India's treaties & agreements\n4️⃣ Economy — RBI policy, budget highlights\n5️⃣ Awards, appointments, sports",
    "⚠️ **Don't waste time** on district-level news or obscure facts — CLAT focuses on national/international significance.",
    "💡 **Daily routine:** 30 minutes — The Hindu editorial + 5 CA MCQs. That's all you need.",
  ],
  "Quantitative Techniques": [
    "Quant strategy for CLAT — remember, there are only 10 questions:",
    "📌 **Target: 7–8 correct out of 10. Perfect score not needed.**",
    "**Topics to master (high return):**\n1️⃣ Percentages & Ratio — 3–4 questions guaranteed\n2️⃣ Averages — 1–2 questions\n3️⃣ Profit & Loss — 1–2 questions\n4️⃣ Data interpretation (table/graph reading) — 2–3 questions",
    "⚠️ **Key rule:** If a quant question takes more than 90 seconds, SKIP IT. Wrong answer = -0.25 marks.",
    "💡 **Practice:** 5 quant questions daily. Use elimination — most CLAT quant can be solved by approximation.",
  ],
  "Logical Reasoning": [
    "Logical Reasoning in CLAT tests critical thinking, not puzzles:",
    "📌 **CLAT LR is passage-based — not the traditional syllogism type.**",
    "**Question types you'll see:**\n1️⃣ Strengthen/Weaken the argument\n2️⃣ Identify the assumption\n3️⃣ Find the conclusion\n4️⃣ Logical inconsistency\n5️⃣ Analogy questions",
    "⚠️ **Trap:** CLAT LR options are very close. The correct answer directly addresses the argument — no extra scope, no less scope.",
    "💡 **Technique:** For 'weaken' questions, find the answer that attacks the assumption, not just the conclusion.",
  ],
};

const doubts = [
  {
    id:1, question:"In legal reasoning, if Principle states 'No person shall be deprived of life except according to procedure established by law', and Facts state 'A was shot dead by police without any FIR', what would be the answer?",
    subject:"Legal Reasoning", status:"answered", time:"2h ago",
    teacher:"Adv. Priya Sharma",
    teacherAnswer:"Correct answer is that A's fundamental right under Article 21 has been violated, as there was no procedure established by law followed. The police action is unconstitutional.",
  },
  {
    id:2, question:"How to differentiate between ratio decidendi and obiter dicta in a judgment?",
    subject:"Legal Aptitude", status:"answered", time:"5h ago",
    teacher:"Rahul Verma",
    teacherAnswer:"Ratio decidendi is the binding legal rule. Obiter dicta are observations not essential to the decision. In Maneka Gandhi v. Union of India, the rule that procedure must be fair, just & reasonable is ratio. Comments on personal liberty's scope are obiter.",
  },
  {
    id:3, question:"What is the difference between CLAT and AILET syllabus? Should I focus on both separately?",
    subject:"Exam Strategy", status:"pending", time:"30 min ago",
  },
  {
    id:4, question:"Reading comprehension strategy for CLAT — how to finish all 5 passages in 45 minutes?",
    subject:"English", status:"pending", time:"1h ago",
  },
];

const forumPosts = [
  { user:"Arjun K.", avatar:"🧑‍💻", post:"How many mock tests should I do per week for CLAT 2026?", likes:24, replies:18, time:"2h" },
  { user:"Sneha R.", avatar:"👩‍🎓", post:"Is CUET Law easier than CLAT? Planning to apply for both.", likes:31, replies:22, time:"4h" },
  { user:"Vikram S.", avatar:"👨‍💼", post:"Anyone got NLU Delhi cut-offs for last year? Trying to gauge my score.", likes:15, replies:11, time:"6h" },
  { user:"Meera T.", avatar:"👩‍💻", post:"Best books for legal reasoning apart than CLATians material?", likes:19, replies:14, time:"8h" },
];

interface Message {
  role: "user" | "ai";
  text: string;
  typing?: boolean;
}

export default function DoubtsScreen() {
  const [activeSection, setActiveSection] = useState<"mydoubts" | "ask" | "forum">("mydoubts");
  const [expandedDoubt, setExpandedDoubt] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState("Legal Reasoning");
  const [questionText, setQuestionText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role:"ai", text:"👋 Hi! I'm your AI Doubt Assistant. Select a subject and type your doubt — I'll give you instant hints before your faculty responds." },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior:"smooth" });
  }, [messages, isTyping]);

  const sendToAI = () => {
    if (!questionText.trim()) return;
    const q = questionText.trim();
    setQuestionText("");
    setMessages(prev => [...prev, { role:"user", text:q }]);
    setIsTyping(true);

    const responses = aiResponses[selectedSubject] || aiResponses["Legal Reasoning"];

    // Stream responses one by one
    responses.forEach((chunk, i) => {
      setTimeout(() => {
        setMessages(prev => [...prev, { role:"ai", text:chunk }]);
        if (i === responses.length - 1) {
          setIsTyping(false);
          setMessages(prev => [...prev, { role:"ai", text:"📤 Want me to also submit this to a faculty member for a detailed answer?" }]);
        }
      }, 1500 + i * 1200);
    });
  };

  const submitToFaculty = () => {
    setSubmitted(true);
    setMessages(prev => [...prev, {
      role:"ai",
      text:"✅ Submitted to faculty! Adv. Priya Sharma will respond within 2 hours. You'll get a notification when it's answered.",
    }]);
  };

  return (
    <div style={{ background:"#F0F4FF", paddingBottom:90, minHeight:"100vh" }}>
      {/* Header */}
      <div style={{ background:"white", padding:"16px 16px 0", borderBottom:"1px solid #F3F4F6" }}>
        <h2 style={{ margin:"0 0 14px", fontSize:22, fontWeight:800, color:"#1A1A2E" }}>Doubt Solving</h2>
        <div style={{ display:"flex", gap:6, paddingBottom:14 }}>
          {[
            { id:"mydoubts" as const, label:"My Doubts", icon:"❓" },
            { id:"ask" as const, label:"Ask AI", icon:"🤖" },
            { id:"forum" as const, label:"Forum", icon:"💬" },
          ].map(s => (
            <button key={s.id} onClick={() => setActiveSection(s.id)} style={{
              flex:1, padding:"10px 6px", borderRadius:12, fontSize:12.5, fontWeight:700,
              border:"none", cursor:"pointer",
              background: activeSection === s.id ? "#1B2B6B" : "#F3F4F6",
              color: activeSection === s.id ? "white" : "#374151",
              display:"flex", alignItems:"center", justifyContent:"center", gap:4,
            }}>{s.icon} {s.label}</button>
          ))}
        </div>
      </div>

      {/* MY DOUBTS */}
      {activeSection === "mydoubts" && (
        <div style={{ padding:"16px 16px 0" }}>
          <div style={{ display:"flex", gap:8, marginBottom:14 }}>
            {[{ label:"All", count:4 },{ label:"Pending", count:2 },{ label:"Answered", count:2 }].map((f,i) => (
              <button key={i} style={{
                padding:"6px 16px", borderRadius:20, fontSize:12, fontWeight:600,
                border:"1px solid #E5E7EB", cursor:"pointer",
                background: i === 0 ? "#1B2B6B" : "white",
                color: i === 0 ? "white" : "#374151",
              }}>{f.label} ({f.count})</button>
            ))}
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {doubts.map((d) => (
              <div key={d.id} style={{ background:"white", borderRadius:16, boxShadow:"0 2px 10px rgba(0,0,0,0.06)", overflow:"hidden" }}>
                <div onClick={() => setExpandedDoubt(expandedDoubt === d.id ? null : d.id)} style={{ padding:"14px 16px", cursor:"pointer" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                    <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                      <span style={{ background:"#EEF2FF", color:"#1B2B6B", fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:20 }}>{d.subject}</span>
                      <span style={{
                        background: d.status === "answered" ? "#DCFCE7" : "#FEF9C3",
                        color: d.status === "answered" ? "#15803D" : "#D97706",
                        fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:20,
                      }}>{d.status === "answered" ? "✓ Answered" : "⏳ Pending"}</span>
                    </div>
                    <span style={{ fontSize:11, color:"#9CA3AF" }}>{d.time}</span>
                  </div>
                  <p style={{
                    margin:0, fontSize:13, color:"#374151", lineHeight:1.5,
                    display:"-webkit-box", WebkitLineClamp: expandedDoubt === d.id ? undefined : 2,
                    WebkitBoxOrient:"vertical" as const,
                    overflow: expandedDoubt === d.id ? "visible" : "hidden",
                  }}>{d.question}</p>
                  {d.status === "answered" && expandedDoubt !== d.id && (
                    <p style={{ margin:"6px 0 0", fontSize:12, color:"#1B2B6B", fontWeight:600 }}>Tap to view answer →</p>
                  )}
                </div>
                {expandedDoubt === d.id && d.teacherAnswer && (
                  <div style={{ borderTop:"1px solid #F3F4F6", padding:"14px 16px", background:"#F9FAFB" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                      <div style={{ width:32, height:32, borderRadius:"50%", background:"linear-gradient(135deg,#1B2B6B,#4263C8)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>👨‍🏫</div>
                      <div>
                        <p style={{ margin:0, fontSize:12, fontWeight:700, color:"#1A1A2E" }}>{d.teacher}</p>
                        <p style={{ margin:0, fontSize:10, color:"#9CA3AF" }}>Faculty · CLATians</p>
                      </div>
                    </div>
                    <p style={{ margin:0, fontSize:13, color:"#374151", lineHeight:1.6 }}>{d.teacherAnswer}</p>
                    <button style={{ marginTop:10, background:"none", border:"1px solid #E5E7EB", borderRadius:10, padding:"6px 14px", fontSize:12, fontWeight:600, color:"#6B7280", cursor:"pointer" }}>👍 Helpful</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI CHAT */}
      {activeSection === "ask" && (
        <div style={{ display:"flex", flexDirection:"column", height:"calc(100vh - 160px)" }}>

          {/* Subject selector */}
          <div style={{ padding:"12px 16px", background:"white", borderBottom:"1px solid #F3F4F6" }}>
            <div style={{ display:"flex", gap:6, overflowX:"auto" }} className="no-scroll">
              {subjects.map(sub => (
                <button key={sub} onClick={() => setSelectedSubject(sub)} style={{
                  padding:"6px 14px", borderRadius:20, fontSize:11.5, fontWeight:700,
                  border:"1px solid",
                  borderColor: selectedSubject === sub ? "#1B2B6B" : "#E5E7EB",
                  background: selectedSubject === sub ? "#1B2B6B" : "white",
                  color: selectedSubject === sub ? "white" : "#374151",
                  cursor:"pointer", whiteSpace:"nowrap", flexShrink:0,
                }}>{sub}</button>
              ))}
            </div>
          </div>

          {/* AI badge */}
          <div style={{ padding:"10px 16px", background:"linear-gradient(135deg,#F5F3FF,#EDE9FE)", borderBottom:"1px solid #DDD6FE", display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:32, height:32, borderRadius:"50%", background:"linear-gradient(135deg,#8B5CF6,#6D28D9)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🤖</div>
            <div style={{ flex:1 }}>
              <p style={{ margin:0, fontSize:13, fontWeight:700, color:"#5B21B6" }}>AI Doubt Assistant</p>
              <p style={{ margin:0, fontSize:10, color:"#7C3AED" }}>Instant hints · Available 24/7</p>
            </div>
            <span style={{ background:"#8B5CF6", color:"white", fontSize:9, fontWeight:800, padding:"2px 8px", borderRadius:20 }}>BETA</span>
          </div>

          {/* Chat messages */}
          <div style={{ flex:1, overflowY:"auto", padding:"14px 16px", display:"flex", flexDirection:"column", gap:12 }} className="no-scroll">
            {messages.map((msg, i) => (
              <div key={i} style={{ display:"flex", flexDirection: msg.role === "user" ? "row-reverse" : "row", alignItems:"flex-end", gap:8 }}>
                {msg.role === "ai" && (
                  <div style={{ width:28, height:28, borderRadius:"50%", background:"linear-gradient(135deg,#8B5CF6,#6D28D9)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0 }}>🤖</div>
                )}
                <div style={{
                  maxWidth:"80%",
                  background: msg.role === "user" ? "linear-gradient(135deg,#1B2B6B,#2D4499)" : "white",
                  color: msg.role === "user" ? "white" : "#374151",
                  borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  padding:"12px 14px",
                  fontSize:13, lineHeight:1.6,
                  boxShadow:"0 2px 8px rgba(0,0,0,0.08)",
                  whiteSpace:"pre-line",
                }}>
                  {msg.text.replace(/\*\*(.*?)\*\*/g, "$1")}
                  {msg.text.includes("submit this to a faculty") && !submitted && (
                    <button onClick={submitToFaculty} style={{
                      display:"block", marginTop:10, background:"linear-gradient(135deg,#1B2B6B,#2D4499)",
                      color:"white", border:"none", borderRadius:10, padding:"8px 16px",
                      fontSize:12, fontWeight:700, cursor:"pointer", width:"100%",
                    }}>📤 Yes, Submit to Faculty</button>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div style={{ display:"flex", alignItems:"flex-end", gap:8 }}>
                <div style={{ width:28, height:28, borderRadius:"50%", background:"linear-gradient(135deg,#8B5CF6,#6D28D9)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>🤖</div>
                <div style={{ background:"white", borderRadius:"18px 18px 18px 4px", padding:"14px 18px", boxShadow:"0 2px 8px rgba(0,0,0,0.08)", display:"flex", gap:6, alignItems:"center" }}>
                  {[0,1,2].map(j => (
                    <div key={j} style={{
                      width:8, height:8, borderRadius:"50%", background:"#8B5CF6",
                      animation:`bounce 1s ease ${j * 0.2}s infinite`,
                    }}/>
                  ))}
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick prompts */}
          {messages.length <= 1 && (
            <div style={{ padding:"8px 16px", display:"flex", gap:8, overflowX:"auto" }} className="no-scroll">
              {[
                "How to approach principle-fact questions?",
                "What are the key topics in " + selectedSubject + "?",
                "Give me tips to improve my score",
              ].map((prompt, i) => (
                <button key={i} onClick={() => { setQuestionText(prompt); }} style={{
                  background:"#EEF2FF", color:"#1B2B6B", border:"1px solid #C7D2FE",
                  borderRadius:20, padding:"7px 14px", fontSize:11.5, fontWeight:600,
                  cursor:"pointer", whiteSpace:"nowrap", flexShrink:0,
                }}>{prompt}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding:"10px 16px 16px", background:"white", borderTop:"1px solid #F3F4F6" }}>
            <div style={{ display:"flex", gap:10, alignItems:"flex-end" }}>
              <div style={{ flex:1, background:"#F9FAFB", borderRadius:16, border:"1.5px solid #E5E7EB", padding:"10px 14px", display:"flex", alignItems:"flex-end", gap:8 }}>
                <textarea
                  value={questionText}
                  onChange={e => setQuestionText(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendToAI(); } }}
                  placeholder={`Ask about ${selectedSubject}...`}
                  rows={1}
                  style={{
                    flex:1, background:"none", border:"none", outline:"none",
                    fontSize:13, color:"#374151", resize:"none",
                    fontFamily:"inherit", lineHeight:1.5, maxHeight:80, overflowY:"auto",
                  }}
                />
                <button style={{ background:"none", border:"none", cursor:"pointer", padding:0, opacity:0.5 }}>
                  <UploadIcon />
                </button>
              </div>
              <button
                onClick={sendToAI}
                disabled={!questionText.trim() || isTyping}
                style={{
                  width:46, height:46, borderRadius:"50%",
                  background: questionText.trim() && !isTyping ? "linear-gradient(135deg,#8B5CF6,#6D28D9)" : "#E5E7EB",
                  border:"none", cursor: questionText.trim() ? "pointer" : "default",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  transition:"all 0.2s", flexShrink:0,
                  boxShadow: questionText.trim() ? "0 4px 12px rgba(139,92,246,0.4)" : "none",
                }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
            <p style={{ margin:"6px 0 0", fontSize:10.5, color:"#9CA3AF", textAlign:"center" }}>
              AI gives instant hints · Faculty answers within 2 hours
            </p>
          </div>
        </div>
      )}

      {/* FORUM */}
      {activeSection === "forum" && (
        <div style={{ padding:"16px 16px 0" }}>
          <div style={{ background:"linear-gradient(135deg,#1B2B6B,#2D4499)", borderRadius:14, padding:"14px 16px", marginBottom:14, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <p style={{ margin:0, fontSize:14, fontWeight:700, color:"white" }}>💬 Discussion Forum</p>
              <p style={{ margin:"2px 0 0", fontSize:11, color:"rgba(255,255,255,0.8)" }}>2.4k CLATians discussing now</p>
            </div>
            <button style={{ background:"white", color:"#1B2B6B", border:"none", borderRadius:10, padding:"8px 14px", fontSize:12, fontWeight:700, cursor:"pointer" }}>+ Post</button>
          </div>

          {/* Trending topics */}
          <div style={{ display:"flex", gap:8, marginBottom:14, overflowX:"auto" }} className="no-scroll">
            {["All Topics","Legal Reasoning","English RC","Exam Strategy","NLU Admissions"].map((t,i) => (
              <button key={i} style={{
                padding:"6px 14px", borderRadius:20, fontSize:12, fontWeight:600,
                border:"1px solid #E5E7EB", cursor:"pointer", whiteSpace:"nowrap",
                background: i === 0 ? "#1B2B6B" : "white",
                color: i === 0 ? "white" : "#374151",
              }}>{t}</button>
            ))}
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {forumPosts.map((p,i) => (
              <div key={i} style={{ background:"white", borderRadius:16, padding:"14px 16px", boxShadow:"0 2px 8px rgba(0,0,0,0.05)" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                  <div style={{ width:40, height:40, borderRadius:"50%", background:"linear-gradient(135deg,#EEF2FF,#C7D2FE)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{p.avatar}</div>
                  <div style={{ flex:1 }}>
                    <p style={{ margin:0, fontSize:13, fontWeight:700, color:"#1A1A2E" }}>{p.user}</p>
                    <p style={{ margin:0, fontSize:10, color:"#9CA3AF" }}>{p.time} ago</p>
                  </div>
                  {i === 0 && <span style={{ background:"#FEF2F2", color:"#DC2626", fontSize:9.5, fontWeight:800, padding:"2px 8px", borderRadius:20 }}>🔥 Trending</span>}
                </div>
                <p style={{ margin:"0 0 12px", fontSize:13, color:"#374151", lineHeight:1.5 }}>{p.post}</p>
                <div style={{ display:"flex", gap:16 }}>
                  <button style={{ display:"flex", alignItems:"center", gap:6, background:"none", border:"none", cursor:"pointer", color:"#6B7280", fontSize:12, fontWeight:600 }}>👍 {p.likes}</button>
                  <button style={{ display:"flex", alignItems:"center", gap:6, background:"none", border:"none", cursor:"pointer", color:"#1B2B6B", fontSize:12, fontWeight:600 }}>💬 {p.replies} Replies</button>
                  <button style={{ display:"flex", alignItems:"center", gap:6, background:"none", border:"none", cursor:"pointer", color:"#6B7280", fontSize:12, fontWeight:600 }}>🔗 Share</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
