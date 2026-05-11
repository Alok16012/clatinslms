"use client";
import { useState } from "react";

const Back = ({ onBack }: { onBack: () => void }) => (
  <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:8, color:"#2B1700", fontSize:14, fontWeight:700, padding:"14px 16px 0" }}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2B1700" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
    Tips & Tricks
  </button>
);

const tips = [
  {
    icon:"⚖️", title:"Master Legal Reasoning in 30 Days", tag:"Legal Reasoning", time:"8 min read", color:"#1B2B6B",
    preview:"Legal Reasoning is the highest-scoring section in CLAT. The key is to never use your personal knowledge — only the principle given matters.",
    content:[
      "Always re-read the PRINCIPLE before the facts.",
      "Apply ONLY what the principle says — never outside knowledge.",
      "Look for keywords: 'shall', 'must', 'may', 'except'.",
      "For difficult questions, eliminate options that add extra conditions.",
      "Practice 20 questions daily for the first month.",
    ],
  },
  {
    icon:"📖", title:"RC Strategy — Finish All 5 Passages in 45 min", tag:"English", time:"6 min read", color:"#0891B2",
    preview:"Reading Comprehension in CLAT tests inference, not just reading speed. Here's how to never run out of time.",
    content:[
      "Read the questions FIRST before the passage.",
      "Mark keywords in the passage as you read.",
      "For 'inference' questions, the answer is never too extreme.",
      "Spend max 8 minutes per passage.",
      "If stuck on a question, skip and return — don't lose time.",
    ],
  },
  {
    icon:"📰", title:"Current Affairs Strategy — 30 Minutes Daily", tag:"GK & CA", time:"5 min read", color:"#7C3AED",
    preview:"GK is where most aspirants lose marks unnecessarily. A consistent 30-minute daily routine is all you need.",
    content:[
      "Read The Hindu or Indian Express editorial daily.",
      "Focus on: Courts, Parliament, International Relations, Economy.",
      "Make a weekly flashcard of 20 important news items.",
      "Revise previous month's CA every Sunday.",
      "CLAT CA is always 6–10 months before the exam date.",
    ],
  },
  {
    icon:"🔢", title:"Quant in CLAT — Do Just Enough to Score 8+", tag:"Quantitative", time:"4 min read", color:"#059669",
    preview:"Quantitative Techniques has only 10 questions in CLAT. Here's the smartest approach to maximize marks with minimum effort.",
    content:[
      "Topics to cover: Ratio, Percentage, Averages, Profit & Loss, Time-Speed.",
      "Skip difficult questions — each wrong answer costs 0.25 marks.",
      "Never spend more than 90 seconds on any single quant question.",
      "Practice 5 questions daily — consistency beats cramming.",
      "Target 8 out of 10 — perfect score is not needed.",
    ],
  },
  {
    icon:"🧠", title:"Mock Test Strategy — How to Use Mocks Effectively", tag:"Strategy", time:"7 min read", color:"#DC2626",
    preview:"Most students take mocks but don't analyze them. That's the biggest mistake. Here's the right approach.",
    content:[
      "Analyze every wrong answer — understand WHY you got it wrong.",
      "Maintain an 'error log' in a notebook.",
      "Don't look at the score first — look at accuracy by section.",
      "Retake the same mock after 15 days to measure improvement.",
      "In the last 30 days, take 1 full mock every 3 days.",
    ],
  },
  {
    icon:"🏋️", title:"Study Schedule — 6-Month CLAT Prep Plan", tag:"Strategy", time:"10 min read", color:"#C8860A",
    preview:"The right study plan makes all the difference. Here's a proven 6-month roadmap followed by AIR top-10 students.",
    content:[
      "Month 1–2: Foundation — complete all subject modules.",
      "Month 3: Practice 20 questions per subject daily.",
      "Month 4: Start mock tests — 1 per week + analysis.",
      "Month 5: Intensive mocks — 2 per week + error revision.",
      "Month 6: Revision only — revisit weak areas, 3 mocks per week.",
    ],
  },
];

export default function TipsTricksPage({ onBack }: { onBack: () => void }) {
  const [expanded, setExpanded] = useState<number|null>(null);

  return (
    <div style={{ background:"#F0F4FF", paddingBottom:90, minHeight:"100vh" }}>
      <Back onBack={onBack} />

      <div style={{ padding:"12px 16px 0" }}>
        <div style={{ background:"linear-gradient(135deg,#C8860A,#D97706)", borderRadius:20, padding:"18px 16px", marginBottom:16 }}>
          <span style={{ background:"rgba(255,255,255,0.2)", color:"white", fontSize:10, fontWeight:800, padding:"3px 10px", borderRadius:20 }}>💡 EXPERT ADVICE</span>
          <p style={{ margin:"8px 0 2px", fontSize:18, fontWeight:800, color:"white" }}>Tips & Tricks</p>
          <p style={{ margin:0, fontSize:12, color:"rgba(255,255,255,0.75)" }}>Topper-tested strategies for CLAT 2026</p>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {tips.map((tip,i)=>(
            <div key={i} style={{ background:"white", borderRadius:18, overflow:"hidden", boxShadow:"0 2px 12px rgba(0,0,0,0.07)" }}>
              {/* Header */}
              <div onClick={()=>setExpanded(expanded===i?null:i)} style={{ padding:"14px 16px", cursor:"pointer" }}>
                <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                  <div style={{ width:48, height:48, borderRadius:14, background:`${tip.color}12`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>
                    {tip.icon}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", gap:6, marginBottom:5, alignItems:"center" }}>
                      <span style={{ background:`${tip.color}15`, color:tip.color, fontSize:9.5, fontWeight:800, padding:"2px 8px", borderRadius:20 }}>{tip.tag}</span>
                      <span style={{ fontSize:10, color:"#9CA3AF" }}>⏱ {tip.time}</span>
                    </div>
                    <p style={{ margin:"0 0 6px", fontSize:14, fontWeight:800, color:"#1A1A2E", lineHeight:1.35 }}>{tip.title}</p>
                    <p style={{ margin:0, fontSize:12.5, color:"#6B7280", lineHeight:1.4 }}>{tip.preview}</p>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"
                    style={{ transform: expanded===i ? "rotate(90deg)" : "rotate(0deg)", transition:"transform 0.2s", flexShrink:0 }}>
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </div>
              </div>

              {/* Expanded content */}
              {expanded===i && (
                <div style={{ borderTop:"1px solid #F3F4F6", padding:"14px 16px", background:"#FAFAFA" }}>
                  <p style={{ margin:"0 0 12px", fontSize:13, fontWeight:700, color:tip.color }}>Key Strategies:</p>
                  {tip.content.map((point,j)=>(
                    <div key={j} style={{ display:"flex", gap:10, marginBottom:10, alignItems:"flex-start" }}>
                      <div style={{ width:22, height:22, borderRadius:"50%", background:`${tip.color}15`, border:`1.5px solid ${tip.color}30`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:11, fontWeight:800, color:tip.color }}>{j+1}</div>
                      <p style={{ margin:0, fontSize:13, color:"#374151", lineHeight:1.5 }}>{point}</p>
                    </div>
                  ))}
                  <button style={{ marginTop:4, background:`linear-gradient(135deg,${tip.color},${tip.color}CC)`, color:"white", border:"none", borderRadius:12, padding:"10px 18px", fontSize:12, fontWeight:700, cursor:"pointer" }}>
                    Save to My Notes
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
