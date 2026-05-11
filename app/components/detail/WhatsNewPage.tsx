"use client";

const Back = ({ onBack }: { onBack: () => void }) => (
  <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:8, color:"#2B1700", fontSize:14, fontWeight:700, padding:"14px 16px 0" }}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2B1700" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
    What's New
  </button>
);

const updates = [
  { icon:"🎥", title:"AI-Powered Doubt Resolution", desc:"Get instant AI hints on your doubts before faculty responds. Available 24/7 for all enrolled students.", tag:"Feature", date:"May 10, 2026", color:"#7C3AED", hot:true },
  { icon:"📝", title:"CLAT 2026 Mock Test #8 Live", desc:"Brand new full-length mock test based on the latest CLAT pattern. 120 questions · 120 minutes.", tag:"New Test", date:"May 9, 2026", color:"#DC2626", hot:true },
  { icon:"🎓", title:"NLU Spotlight Series — Live Sessions", desc:"Weekly live sessions with NLU students sharing their experience. First session with NLU Delhi student this Sunday.", tag:"Live Event", date:"May 8, 2026", color:"#0891B2", hot:false },
  { icon:"📚", title:"CUET Law 2026 — Full Course Launched", desc:"Complete preparation course for CUET-UG Law entrance with 300+ hours of content.", tag:"New Course", date:"May 7, 2026", color:"#059669", hot:false },
  { icon:"🏆", title:"AIR Ranking Updated — May Week 2", desc:"All India Ranks have been recalculated based on Mock Tests 5–7. Check your updated standing.", tag:"Update", date:"May 6, 2026", color:"#C8860A", hot:false },
  { icon:"💡", title:"Flashcard Feature — 500 Law Terms Added", desc:"Brand new legal vocabulary flashcards covering 500 key law terms with definitions and examples.", tag:"Feature", date:"May 5, 2026", color:"#DB2777", hot:false },
];

export default function WhatsNewPage({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ background:"#F0F4FF", paddingBottom:90, minHeight:"100vh" }}>
      <Back onBack={onBack} />

      <div style={{ padding:"12px 16px 0" }}>
        <div style={{ background:"linear-gradient(135deg,#0891B2,#0E7490)", borderRadius:20, padding:"18px 16px", marginBottom:16 }}>
          <span style={{ background:"rgba(255,255,255,0.2)", color:"white", fontSize:10, fontWeight:800, padding:"3px 10px", borderRadius:20 }}>✨ LATEST UPDATES</span>
          <p style={{ margin:"8px 0 2px", fontSize:18, fontWeight:800, color:"white" }}>What's New at CLATians</p>
          <p style={{ margin:0, fontSize:12, color:"rgba(255,255,255,0.75)" }}>New features, courses & events this week</p>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {updates.map((u,i)=>(
            <div key={i} style={{ background:"white", borderRadius:18, padding:"0", boxShadow:"0 2px 12px rgba(0,0,0,0.07)", overflow:"hidden" }}>
              <div style={{ display:"flex", alignItems:"stretch" }}>
                <div style={{ width:5, background:`linear-gradient(180deg,${u.color},${u.color}88)`, flexShrink:0 }}/>
                <div style={{ padding:"14px 16px", flex:1 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ fontSize:22 }}>{u.icon}</span>
                      <div>
                        <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                          <span style={{ background:`${u.color}15`, color:u.color, fontSize:9.5, fontWeight:800, padding:"2px 8px", borderRadius:20 }}>{u.tag}</span>
                          {u.hot && <span style={{ background:"#FEF2F2", color:"#DC2626", fontSize:9.5, fontWeight:800, padding:"2px 8px", borderRadius:20 }}>🔥 HOT</span>}
                        </div>
                      </div>
                    </div>
                    <span style={{ fontSize:10.5, color:"#9CA3AF", flexShrink:0 }}>{u.date}</span>
                  </div>
                  <p style={{ margin:"0 0 6px", fontSize:14, fontWeight:800, color:"#1A1A2E", lineHeight:1.35 }}>{u.title}</p>
                  <p style={{ margin:"0 0 10px", fontSize:12.5, color:"#6B7280", lineHeight:1.5 }}>{u.desc}</p>
                  <button style={{ background:`${u.color}12`, color:u.color, border:`1px solid ${u.color}30`, borderRadius:10, padding:"7px 16px", fontSize:12, fontWeight:700, cursor:"pointer" }}>
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
