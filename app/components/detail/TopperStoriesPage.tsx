"use client";
import { useState } from "react";

const Back = ({ onBack }: { onBack: () => void }) => (
  <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:8, color:"#2B1700", fontSize:14, fontWeight:700, padding:"14px 16px 0" }}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2B1700" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
    CLATians Toppers
  </button>
);

const toppers = [
  {
    name:"Aanya Gupta", rank:"AIR 1", college:"NLU Delhi", score:"99.8%ile", city:"Delhi", initials:"AG",
    color:"#1B2B6B", year:2025, course:"CLAT 2025 Complete",
    quote:"CLATians' legal reasoning sessions completely changed how I approach principle-fact questions.",
    tips:["Focus on legal reasoning — it's the highest scorer","Read newspapers daily for GK","Attempt at least 50 mocks","Revise vocabulary from editorial sections"],
    timeline:[
      { month:"Jun 2024", event:"Joined CLATians online batch" },
      { month:"Aug 2024", event:"Completed legal reasoning module" },
      { month:"Nov 2024", event:"Mock rank stabilized in top 50" },
      { month:"Dec 2024", event:"CLAT exam — scored 111.5/120" },
      { month:"Feb 2025", event:"Secured NLU Delhi seat" },
    ],
  },
  {
    name:"Rohan Mehta", rank:"AIR 4", college:"NLU Bangalore", score:"99.6%ile", city:"Mumbai", initials:"RM",
    color:"#DC2626", year:2025, course:"CLAT 2025 Complete",
    quote:"The doubt solving feature saved me during exam prep. Faculty response within minutes!",
    tips:["Solve previous year papers first","Don't ignore quantitative techniques","Mock tests are the real preparation","Current affairs — 1 hour daily minimum"],
    timeline:[
      { month:"Jul 2024", event:"Started with CLATians free demo" },
      { month:"Sep 2024", event:"Upgraded to full course" },
      { month:"Oct 2024", event:"Started mock test series" },
      { month:"Dec 2024", event:"CLAT exam — scored 109/120" },
      { month:"Feb 2025", event:"Secured NLU Bangalore seat" },
    ],
  },
  {
    name:"Shreya Agarwal", rank:"AIR 3", college:"NLU Delhi", score:"99.7%ile", city:"Jaipur", initials:"SA",
    color:"#7C3AED", year:2025, course:"CLAT 2025 Complete",
    quote:"Consistency is the key. I studied 6 hours daily for 8 months and never missed a live class.",
    tips:["Consistency beats intensity","Join live classes — don't just watch recordings","Practice reading comprehension every single day","Sleep 7 hours — don't exhaust yourself"],
    timeline:[
      { month:"May 2024", event:"Enrolled in CLATians batch" },
      { month:"Sep 2024", event:"Completed English & RC module" },
      { month:"Nov 2024", event:"Mock rank — consistently top 20" },
      { month:"Dec 2024", event:"CLAT exam — scored 110.5/120" },
      { month:"Feb 2025", event:"Secured NLU Delhi seat" },
    ],
  },
];

export default function TopperStoriesPage({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState<number|null>(null);

  if (selected !== null) {
    const t = toppers[selected];
    return (
      <div style={{ background:"#F0F4FF", paddingBottom:90, minHeight:"100vh" }}>
        <button onClick={()=>setSelected(null)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:8, color:"#2B1700", fontSize:14, fontWeight:700, padding:"14px 16px 0" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2B1700" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          All Toppers
        </button>

        <div style={{ padding:"12px 16px 0" }}>
          {/* Profile Card */}
          <div style={{ background:`linear-gradient(135deg,${t.color},${t.color}BB)`, borderRadius:22, padding:"22px 18px", marginBottom:14, position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:-20, right:-20, width:100, height:100, borderRadius:"50%", background:"rgba(255,255,255,0.07)" }}/>
            <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:14 }}>
              <div style={{ width:64, height:64, borderRadius:"50%", background:"rgba(255,255,255,0.2)", border:"2.5px solid rgba(255,255,255,0.4)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, fontWeight:900, color:"white" }}>{t.initials}</div>
              <div>
                <p style={{ margin:0, fontSize:18, fontWeight:900, color:"white" }}>{t.name}</p>
                <p style={{ margin:"2px 0", fontSize:13, color:"rgba(255,255,255,0.8)" }}>{t.city} · Batch {t.year}</p>
                <div style={{ display:"flex", gap:8, marginTop:4 }}>
                  <span style={{ background:"rgba(255,255,255,0.2)", color:"white", fontSize:11, fontWeight:800, padding:"3px 10px", borderRadius:20 }}>{t.rank}</span>
                  <span style={{ background:"#C8860A", color:"white", fontSize:11, fontWeight:800, padding:"3px 10px", borderRadius:20 }}>{t.score}</span>
                </div>
              </div>
            </div>
            <p style={{ margin:"0 0 4px", fontSize:13, color:"rgba(255,255,255,0.7)", fontStyle:"italic" }}>"{t.quote}"</p>
            <p style={{ margin:0, fontSize:11, color:"rgba(255,255,255,0.55)" }}>📍 {t.college}</p>
          </div>

          {/* Journey Timeline */}
          <div style={{ background:"white", borderRadius:18, padding:"16px", marginBottom:14, boxShadow:"0 2px 10px rgba(0,0,0,0.06)" }}>
            <p style={{ margin:"0 0 14px", fontSize:15, fontWeight:800, color:"#1A1A2E" }}>📅 My Journey</p>
            {t.timeline.map((step,i)=>(
              <div key={i} style={{ display:"flex", gap:12, marginBottom: i<t.timeline.length-1 ? 14 : 0 }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                  <div style={{ width:12, height:12, borderRadius:"50%", background:t.color, flexShrink:0, marginTop:2 }}/>
                  {i<t.timeline.length-1 && <div style={{ width:2, flex:1, background:`${t.color}30`, marginTop:4 }}/>}
                </div>
                <div style={{ paddingBottom: i<t.timeline.length-1 ? 0 : 0 }}>
                  <p style={{ margin:0, fontSize:11, fontWeight:700, color:"#9CA3AF" }}>{step.month}</p>
                  <p style={{ margin:"2px 0 0", fontSize:13, fontWeight:600, color:"#374151" }}>{step.event}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div style={{ background:"white", borderRadius:18, padding:"16px", boxShadow:"0 2px 10px rgba(0,0,0,0.06)" }}>
            <p style={{ margin:"0 0 12px", fontSize:15, fontWeight:800, color:"#1A1A2E" }}>💡 {t.name.split(" ")[0]}'s Top Tips</p>
            {t.tips.map((tip,i)=>(
              <div key={i} style={{ display:"flex", gap:10, marginBottom:12, alignItems:"flex-start" }}>
                <div style={{ width:26, height:26, borderRadius:"50%", background:`${t.color}15`, border:`1.5px solid ${t.color}30`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:12, fontWeight:800, color:t.color }}>{i+1}</div>
                <p style={{ margin:0, fontSize:13, color:"#374151", lineHeight:1.5 }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background:"#F0F4FF", paddingBottom:90, minHeight:"100vh" }}>
      <Back onBack={onBack} />

      <div style={{ padding:"12px 16px 0" }}>
        <div style={{ background:"linear-gradient(135deg,#2B1700,#5C3A00)", borderRadius:20, padding:"18px 16px", marginBottom:16 }}>
          <span style={{ background:"#C8860A", color:"white", fontSize:10, fontWeight:800, padding:"3px 10px", borderRadius:20 }}>🏆 HALL OF FAME</span>
          <p style={{ margin:"8px 0 2px", fontSize:18, fontWeight:800, color:"white" }}>CLATians Toppers</p>
          <p style={{ margin:0, fontSize:12, color:"rgba(255,255,255,0.7)" }}>Real stories from NLU qualifiers who trained with us</p>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {toppers.map((t,i)=>(
            <div key={i} onClick={()=>setSelected(i)} style={{ background:"white", borderRadius:18, overflow:"hidden", boxShadow:"0 4px 16px rgba(0,0,0,0.08)", cursor:"pointer" }}>
              <div style={{ height:6, background:`linear-gradient(90deg,${t.color},${t.color}88)` }}/>
              <div style={{ padding:"14px 16px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
                  <div style={{ width:52, height:52, borderRadius:"50%", background:`linear-gradient(135deg,${t.color},${t.color}BB)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, fontWeight:900, color:"white", flexShrink:0 }}>{t.initials}</div>
                  <div style={{ flex:1 }}>
                    <p style={{ margin:0, fontSize:15, fontWeight:800, color:"#1A1A2E" }}>{t.name}</p>
                    <p style={{ margin:"2px 0", fontSize:12, color:"#6B7280" }}>{t.city} · {t.year}</p>
                    <div style={{ display:"flex", gap:6, marginTop:4 }}>
                      <span style={{ background:`${t.color}15`, color:t.color, fontSize:10.5, fontWeight:800, padding:"2px 9px", borderRadius:20 }}>{t.rank}</span>
                      <span style={{ background:"#FEF3E2", color:"#92400E", fontSize:10.5, fontWeight:700, padding:"2px 9px", borderRadius:20 }}>{t.score}</span>
                    </div>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C8860A" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
                <div style={{ background:"#F9FAFB", borderRadius:12, padding:"10px 12px" }}>
                  <p style={{ margin:0, fontSize:12.5, color:"#374151", fontStyle:"italic", lineHeight:1.5 }}>"{t.quote}"</p>
                </div>
                <p style={{ margin:"8px 0 0", fontSize:11.5, color:"#6B7280" }}>🎓 {t.college}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
