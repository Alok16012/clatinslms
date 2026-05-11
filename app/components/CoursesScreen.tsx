"use client";

import { StarIcon, ClockIcon, CheckIcon, LockIcon, PlayIcon } from "./icons";
import { useState, useEffect } from "react";

const SearchSvg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
);
const BackArrow = ({ onBack, label }: { onBack: () => void; label: string }) => (
  <button onClick={onBack} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:8, color:"#1A1A2E", fontSize:14, fontWeight:700, padding:"14px 16px 0", marginBottom:4 }}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
    {label}
  </button>
);

const categories = ["All", "CLAT", "CUET", "AILET", "Law Entrance"];

const courses = [
  {
    id: 1, title:"CLAT 2026 Complete Course", desc:"Full syllabus · 500+ hours of video + live classes",
    price:"₹18,999", original:"₹35,000", rating:4.9, students:"12.4k", hours:"500+",
    tag:"BESTSELLER", tagColor:"#DC2626", gradient:"linear-gradient(135deg,#1B2B6B,#2D4499)",
    emoji:"⚖️", category:"CLAT", features:["Live + Recorded","500+ Practice Qs","All India Mock Rank"],
    discount:"46% off", faculty:"Adv. Priya Sharma", validity:"12 Months",
    curriculum:[
      { chapter:"Legal Reasoning", topics:["Principle-Fact Method","Cause & Effect","Tort Law Basics","Constitutional Provisions"], locked:false },
      { chapter:"English Language", topics:["Reading Comprehension","Vocabulary","Grammar Rules","Para Jumbles"], locked:false },
      { chapter:"GK & Current Affairs", topics:["Indian Polity","Economy Basics","International Affairs","Static GK"], locked:true },
      { chapter:"Quantitative Techniques", topics:["Ratio & Proportion","Percentages","Data Interpretation","Time & Work"], locked:true },
    ],
    includes:["500+ video lectures","20 full-length mock tests","Live doubt sessions","Study notes PDF","All India rank"],
    reviews:[
      { name:"Aanya G.", stars:5, text:"Best CLAT course online. Faculty is extremely good.", rank:"AIR 1" },
      { name:"Rohan M.", stars:5, text:"The mock tests were exactly like the real exam.", rank:"AIR 4" },
    ],
  },
  {
    id: 2, title:"CLAT Mock Test Series 2026", desc:"100+ full-length mocks with detailed analysis",
    price:"₹4,999", original:"₹9,999", rating:4.8, students:"8.2k", hours:"100+ Tests",
    tag:"FREE TRIAL", tagColor:"#059669", gradient:"linear-gradient(135deg,#059669,#047857)",
    emoji:"📝", category:"CLAT", features:["100 Full Mocks","AIR Ranking","Detailed Solutions"],
    discount:"50% off", faculty:"CLATians Faculty Team", validity:"6 Months",
    curriculum:[
      { chapter:"Section Mocks", topics:["Legal Reasoning Mocks (20)","English Mocks (20)","GK Mocks (20)","Quant Mocks (20)"], locked:false },
      { chapter:"Full Length Mocks", topics:["CLAT Pattern Mock 1–10","CLAT Pattern Mock 11–25","CLAT Pattern Mock 26–50","CLAT Pattern Mock 51–100"], locked:false },
    ],
    includes:["100 full-length tests","Detailed solutions","All India rank","Performance analytics","Topic-wise analysis"],
    reviews:[
      { name:"Shreya A.", stars:5, text:"Mock quality is exactly like real CLAT. Must have!", rank:"AIR 3" },
    ],
  },
  {
    id: 3, title:"CUET Law 2026 Preparation", desc:"CUET-UG Law entrance complete package",
    price:"₹12,999", original:"₹22,000", rating:4.7, students:"5.1k", hours:"300+",
    tag:"NEW", tagColor:"#7C3AED", gradient:"linear-gradient(135deg,#7C3AED,#6D28D9)",
    emoji:"🏛️", category:"CUET", features:["Live Classes","Mock Tests","Study Material"],
    discount:"41% off", faculty:"Prof. Kavita Singh", validity:"8 Months",
    curriculum:[
      { chapter:"Legal Aptitude", topics:["Legal Principles","Landmark Cases","Constitutional Law","Criminal Law"], locked:false },
      { chapter:"Logical Reasoning", topics:["Syllogisms","Coding-Decoding","Blood Relations","Puzzles"], locked:true },
    ],
    includes:["300+ video lectures","15 full-length mock tests","PDF study notes","Live doubt sessions"],
    reviews:[
      { name:"Vikram S.", stars:4, text:"Great content for CUET. Faculty is knowledgeable.", rank:"Rank 12" },
    ],
  },
  {
    id: 4, title:"Legal Reasoning Mastery", desc:"1000+ practice questions with video solutions",
    price:"₹3,499", original:"₹7,000", rating:4.9, students:"9.8k", hours:"80+",
    tag:"TOP RATED", tagColor:"#D97706", gradient:"linear-gradient(135deg,#D97706,#B45309)",
    emoji:"⚖️", category:"CLAT", features:["1000+ Questions","Video Solutions","Topic-wise Tests"],
    discount:"50% off", faculty:"Adv. Rahul Verma", validity:"6 Months",
    curriculum:[
      { chapter:"Principle-Fact Questions", topics:["Tort Law","Contract Law","Criminal Law","Constitutional Law"], locked:false },
      { chapter:"Advanced Reasoning", topics:["Multi-Principle Questions","Tricky Exceptions","Speed Practice"], locked:false },
    ],
    includes:["1000+ practice questions","80+ video solutions","Topic-wise tests","Performance tracker"],
    reviews:[
      { name:"Priya K.", stars:5, text:"Transformed my legal reasoning skills completely.", rank:"AIR 8" },
    ],
  },
  {
    id: 5, title:"Free CLAT Demo Classes", desc:"7-day free trial with top faculty",
    price:"FREE", original:"", rating:4.8, students:"20k+", hours:"20+",
    tag:"FREE", tagColor:"#059669", gradient:"linear-gradient(135deg,#1B2B6B,#1E3A8A)",
    emoji:"🎁", category:"CLAT", features:["Live + Recorded","Doubt Support","No Credit Card"],
    discount:"", faculty:"Multiple Faculty", validity:"7 Days",
    curriculum:[
      { chapter:"Demo Content", topics:["Legal Reasoning Intro","RC Strategy","GK Crash Course","Exam Pattern Overview"], locked:false },
    ],
    includes:["20+ demo lectures","1 free mock test","Study plan PDF","Community access"],
    reviews:[
      { name:"Ananya P.", stars:5, text:"Demo classes are superb. Enrolled in full course after this.", rank:"Student" },
    ],
  },
  {
    id: 6, title:"AILET 2026 Crash Course", desc:"NLU Delhi-focused preparation in 60 days",
    price:"₹8,499", original:"₹15,000", rating:4.6, students:"3.4k", hours:"150+",
    tag:"POPULAR", tagColor:"#DC2626", gradient:"linear-gradient(135deg,#DC2626,#B91C1C)",
    emoji:"🏆", category:"AILET", features:["60-Day Plan","Past Papers","Faculty Mentors"],
    discount:"43% off", faculty:"NLU Delhi Alumni Team", validity:"4 Months",
    curriculum:[
      { chapter:"Legal Aptitude", topics:["AILET-specific Reasoning","Legal Maxims","Constitutional MCQs"], locked:false },
      { chapter:"English & GK", topics:["Vocabulary Deep Dive","Reading Speed","Polity & Economics"], locked:true },
    ],
    includes:["150+ video lectures","5 AILET-pattern mocks","Mentor sessions","Past papers with solutions"],
    reviews:[
      { name:"Arjun K.", stars:5, text:"This course is specifically designed for AILET. Highly recommended.", rank:"AIR 6" },
    ],
  },
];

const enrolledCourses = [
  { id:1, title:"CLAT 2026 Complete Course", progress:42, nextLesson:"Cause & Effect in Law", lessonsLeft:58, icon:"⚖️", gradient:"linear-gradient(135deg,#1B2B6B,#2D4499)" },
  { id:5, title:"Free CLAT Demo Classes", progress:80, nextLesson:"Exam Pattern Overview", lessonsLeft:4, icon:"🎁", gradient:"linear-gradient(135deg,#059669,#047857)" },
];

type View = "list" | "detail" | "checkout" | "success" | "mylearning";

export default function CoursesScreen() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [view, setView] = useState<View>("list");
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);
  const [payMethod, setPayMethod] = useState("upi");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [successCount, setSuccessCount] = useState(0);
  const [activeTab, setActiveTab] = useState<"courses"|"mylearning">("courses");
  const [openChapter, setOpenChapter] = useState<number | null>(0);

  useEffect(() => {
    if (view === "success") {
      const t = setInterval(() => setSuccessCount(c => c + 1), 300);
      return () => clearInterval(t);
    }
  }, [view]);

  const filtered = courses.filter(c => {
    const matchCat = activeCategory === "All" || c.category === activeCategory;
    const matchSearch = c.title.toLowerCase().includes(searchText.toLowerCase());
    return matchCat && matchSearch;
  });

  // ── MY LEARNING ──
  if (view === "mylearning" || activeTab === "mylearning") {
    return (
      <div style={{ background:"#F0F4FF", paddingBottom:90, minHeight:"100vh" }}>
        <div style={{ background:"white", padding:"16px 16px 0", borderBottom:"1px solid #F3F4F6" }}>
          <h2 style={{ margin:"0 0 14px", fontSize:22, fontWeight:800, color:"#1A1A2E" }}>My Learning</h2>
          <div style={{ display:"flex", gap:8, paddingBottom:14 }}>
            {(["courses","mylearning"] as const).map(t => (
              <button key={t} onClick={() => { setActiveTab(t); if (t === "courses") setView("list"); }} style={{
                flex:1, padding:"10px", borderRadius:12, fontSize:13, fontWeight:600,
                border:"none", cursor:"pointer",
                background: activeTab === t ? "#1B2B6B" : "#F3F4F6",
                color: activeTab === t ? "white" : "#374151",
              }}>{t === "courses" ? "All Courses" : "My Courses"}</button>
            ))}
          </div>
        </div>

        <div style={{ padding:"16px 16px 0" }}>
          {/* Stats */}
          <div style={{ display:"flex", gap:10, marginBottom:16 }}>
            {[
              { label:"Enrolled", value:"2", icon:"📚" },
              { label:"Avg Progress", value:"61%", icon:"📈" },
              { label:"Hours Watched", value:"84h", icon:"⏱" },
            ].map((s,i) => (
              <div key={i} style={{ flex:1, background:"white", borderRadius:14, padding:"12px 10px", textAlign:"center", boxShadow:"0 2px 8px rgba(0,0,0,0.05)" }}>
                <p style={{ margin:0, fontSize:18 }}>{s.icon}</p>
                <p style={{ margin:"4px 0 2px", fontSize:18, fontWeight:800, color:"#1B2B6B" }}>{s.value}</p>
                <p style={{ margin:0, fontSize:10, color:"#9CA3AF" }}>{s.label}</p>
              </div>
            ))}
          </div>

          <p style={{ margin:"0 0 12px", fontSize:13, fontWeight:700, color:"#1A1A2E" }}>Continue Learning</p>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {enrolledCourses.map((c) => (
              <div key={c.id} style={{ background:"white", borderRadius:20, overflow:"hidden", boxShadow:"0 4px 16px rgba(0,0,0,0.08)" }}>
                <div style={{ height:80, background:c.gradient, display:"flex", alignItems:"center", padding:"0 16px", gap:12 }}>
                  <span style={{ fontSize:32 }}>{c.icon}</span>
                  <div>
                    <p style={{ margin:0, fontSize:14, fontWeight:800, color:"white" }}>{c.title}</p>
                    <p style={{ margin:"3px 0 0", fontSize:11, color:"rgba(255,255,255,0.75)" }}>Next: {c.nextLesson}</p>
                  </div>
                </div>
                <div style={{ padding:"14px 16px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                    <span style={{ fontSize:12, color:"#374151", fontWeight:600 }}>Progress</span>
                    <span style={{ fontSize:12, fontWeight:800, color:"#1B2B6B" }}>{c.progress}%</span>
                  </div>
                  <div style={{ height:8, background:"#E5E7EB", borderRadius:20, overflow:"hidden", marginBottom:12 }}>
                    <div style={{ height:"100%", width:`${c.progress}%`, background:"linear-gradient(90deg,#1B2B6B,#4263C8)", borderRadius:20 }} />
                  </div>
                  <div style={{ display:"flex", gap:10 }}>
                    <button style={{
                      flex:1, background:"linear-gradient(135deg,#1B2B6B,#2D4499)", color:"white",
                      border:"none", borderRadius:12, padding:"11px", fontSize:13, fontWeight:700, cursor:"pointer",
                    }}>▶ Continue</button>
                    <button style={{
                      background:"#EEF2FF", color:"#1B2B6B", border:"none",
                      borderRadius:12, padding:"11px 14px", fontSize:12, fontWeight:600, cursor:"pointer",
                    }}>📊 Progress</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Tools */}
          <p style={{ margin:"20px 0 12px", fontSize:13, fontWeight:700, color:"#1A1A2E" }}>Quick Access</p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {[
              { icon:"🎥", label:"Video Lectures", color:"#7C3AED", bg:"#F5F3FF" },
              { icon:"📄", label:"Study Notes", color:"#1B2B6B", bg:"#EEF2FF" },
              { icon:"📝", label:"Mock Tests", color:"#DC2626", bg:"#FEF2F2" },
              { icon:"🃏", label:"Flashcards", color:"#D97706", bg:"#FEF9C3" },
              { icon:"📰", label:"Current Affairs", color:"#059669", bg:"#DCFCE7" },
              { icon:"🏆", label:"My Rank", color:"#C8860A", bg:"#FEF3E2" },
            ].map((t,i) => (
              <div key={i} style={{ background:"white", borderRadius:14, padding:"14px", display:"flex", alignItems:"center", gap:10, boxShadow:"0 2px 8px rgba(0,0,0,0.05)", cursor:"pointer" }}>
                <div style={{ width:40, height:40, borderRadius:12, background:t.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{t.icon}</div>
                <span style={{ fontSize:12.5, fontWeight:700, color:t.color }}>{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── SUCCESS ──
  if (view === "success" && selectedCourse) {
    return (
      <div style={{ background:"#F0F4FF", minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", padding:"40px 20px", textAlign:"center" }}>
        <div style={{ fontSize:80, marginBottom:16, animation:"bounce 0.5s ease" }}>🎉</div>
        <div style={{ background:"linear-gradient(135deg,#1B2B6B,#2D4499)", borderRadius:24, padding:"28px 24px", width:"100%", maxWidth:340, marginBottom:20, boxShadow:"0 12px 36px rgba(27,43,107,0.35)" }}>
          <div style={{ width:72, height:72, borderRadius:"50%", background:"rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, margin:"0 auto 16px" }}>✅</div>
          <p style={{ margin:"0 0 6px", fontSize:22, fontWeight:900, color:"white" }}>Enrollment Successful!</p>
          <p style={{ margin:"0 0 16px", fontSize:13, color:"rgba(255,255,255,0.75)" }}>{selectedCourse.title}</p>
          <div style={{ background:"rgba(255,255,255,0.1)", borderRadius:14, padding:"12px 16px", marginBottom:16 }}>
            {[
              { label:"Amount Paid", value: couponApplied ? `₹${parseInt(selectedCourse.price.replace(/[₹,]/g,"")) - 1000}` : selectedCourse.price },
              { label:"Order ID", value:"CLT" + Math.random().toString(36).substring(2,8).toUpperCase() },
              { label:"Validity", value:selectedCourse.validity },
            ].map((r,i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", marginBottom: i < 2 ? 8 : 0, paddingBottom: i < 2 ? 8 : 0, borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
                <span style={{ fontSize:12, color:"rgba(255,255,255,0.6)" }}>{r.label}</span>
                <span style={{ fontSize:12, fontWeight:700, color:"white" }}>{r.value}</span>
              </div>
            ))}
          </div>
          <p style={{ margin:0, fontSize:11, color:"rgba(255,255,255,0.5)" }}>Receipt sent to your registered email</p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:10, width:"100%", maxWidth:340 }}>
          <button onClick={() => { setActiveTab("mylearning"); setView("mylearning"); }} style={{
            background:"linear-gradient(135deg,#C8860A,#D97706)", color:"white",
            border:"none", borderRadius:14, padding:"16px", fontSize:15, fontWeight:800, cursor:"pointer",
            boxShadow:"0 6px 16px rgba(200,134,10,0.4)",
          }}>🚀 Start Learning Now</button>
          <button onClick={() => setView("list")} style={{
            background:"white", color:"#1B2B6B", border:"none",
            borderRadius:14, padding:"14px", fontSize:14, fontWeight:600, cursor:"pointer",
          }}>Browse More Courses</button>
        </div>
      </div>
    );
  }

  // ── CHECKOUT ──
  if (view === "checkout" && selectedCourse) {
    const basePrice = selectedCourse.price === "FREE" ? 0 : parseInt(selectedCourse.price.replace(/[₹,]/g,""));
    const discount = couponApplied ? 1000 : 0;
    const final = basePrice - discount;

    return (
      <div style={{ background:"#F0F4FF", paddingBottom:90, minHeight:"100vh" }}>
        <BackArrow onBack={() => setView("detail")} label="Checkout" />
        <div style={{ padding:"0 16px" }}>

          {/* Order Summary */}
          <div style={{ background:"white", borderRadius:18, padding:"16px", marginBottom:14, boxShadow:"0 2px 10px rgba(0,0,0,0.06)" }}>
            <p style={{ margin:"0 0 14px", fontSize:15, fontWeight:800, color:"#1A1A2E" }}>Order Summary</p>
            <div style={{ display:"flex", gap:12, alignItems:"center", paddingBottom:12, borderBottom:"1px solid #F3F4F6", marginBottom:12 }}>
              <div style={{ width:52, height:52, borderRadius:14, background:selectedCourse.gradient, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>
                {selectedCourse.emoji}
              </div>
              <div>
                <p style={{ margin:0, fontSize:13, fontWeight:700, color:"#1A1A2E" }}>{selectedCourse.title}</p>
                <p style={{ margin:"3px 0 0", fontSize:11, color:"#9CA3AF" }}>Validity: {selectedCourse.validity} · By {selectedCourse.faculty}</p>
              </div>
            </div>
            {[
              { label:"Course Price", value:selectedCourse.price },
              ...(couponApplied ? [{ label:"Coupon (CLAT1000)", value:"-₹1,000" }] : []),
              { label:"GST (18%)", value:`₹${Math.round(final * 0.18)}` },
            ].map((r,i,arr) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", marginBottom: i < arr.length-1 ? 8 : 12 }}>
                <span style={{ fontSize:13, color:"#6B7280" }}>{r.label}</span>
                <span style={{ fontSize:13, fontWeight:600, color: r.label.startsWith("Coupon") ? "#059669" : "#1A1A2E" }}>{r.value}</span>
              </div>
            ))}
            <div style={{ display:"flex", justifyContent:"space-between", paddingTop:12, borderTop:"1px solid #F3F4F6" }}>
              <span style={{ fontSize:15, fontWeight:800, color:"#1A1A2E" }}>Total Payable</span>
              <span style={{ fontSize:18, fontWeight:900, color:"#1B2B6B" }}>₹{(final + Math.round(final * 0.18)).toLocaleString()}</span>
            </div>
          </div>

          {/* Coupon */}
          <div style={{ background:"white", borderRadius:18, padding:"16px", marginBottom:14, boxShadow:"0 2px 10px rgba(0,0,0,0.06)" }}>
            <p style={{ margin:"0 0 10px", fontSize:14, fontWeight:700, color:"#1A1A2E" }}>🎟 Apply Coupon</p>
            <div style={{ display:"flex", gap:8 }}>
              <input
                value={coupon}
                onChange={e => setCoupon(e.target.value.toUpperCase())}
                placeholder="Enter coupon code"
                style={{ flex:1, border:"1.5px solid #E5E7EB", borderRadius:10, padding:"10px 14px", fontSize:13, outline:"none" }}
              />
              <button onClick={() => { if (coupon === "CLAT1000") setCouponApplied(true); }} style={{
                background: couponApplied ? "#059669" : "#1B2B6B", color:"white",
                border:"none", borderRadius:10, padding:"10px 16px", fontSize:13, fontWeight:700, cursor:"pointer",
              }}>{couponApplied ? "✓ Applied" : "Apply"}</button>
            </div>
            {couponApplied && <p style={{ margin:"8px 0 0", fontSize:12, color:"#059669", fontWeight:600 }}>✅ Coupon applied! You save ₹1,000</p>}
            <p style={{ margin:"8px 0 0", fontSize:11, color:"#9CA3AF" }}>Try: CLAT1000 for ₹1000 off</p>
          </div>

          {/* Payment Method */}
          <div style={{ background:"white", borderRadius:18, padding:"16px", marginBottom:16, boxShadow:"0 2px 10px rgba(0,0,0,0.06)" }}>
            <p style={{ margin:"0 0 14px", fontSize:14, fontWeight:700, color:"#1A1A2E" }}>Payment Method</p>
            {[
              { id:"upi", icon:"📱", label:"UPI / Google Pay / PhonePe", sub:"Instant payment" },
              { id:"card", icon:"💳", label:"Credit / Debit Card", sub:"Visa, Mastercard, Rupay" },
              { id:"netbanking", icon:"🏦", label:"Net Banking", sub:"All major banks" },
              { id:"emi", icon:"📅", label:"EMI", sub:"Starting ₹499/month" },
            ].map(m => (
              <div key={m.id} onClick={() => setPayMethod(m.id)} style={{
                display:"flex", alignItems:"center", gap:12, padding:"12px 14px",
                borderRadius:12, marginBottom:8, cursor:"pointer",
                border:`1.5px solid ${payMethod === m.id ? "#1B2B6B" : "#E5E7EB"}`,
                background: payMethod === m.id ? "#EEF2FF" : "white",
              }}>
                <span style={{ fontSize:22 }}>{m.icon}</span>
                <div style={{ flex:1 }}>
                  <p style={{ margin:0, fontSize:13, fontWeight:600, color:"#1A1A2E" }}>{m.label}</p>
                  <p style={{ margin:0, fontSize:11, color:"#9CA3AF" }}>{m.sub}</p>
                </div>
                <div style={{
                  width:18, height:18, borderRadius:"50%",
                  border:`2px solid ${payMethod === m.id ? "#1B2B6B" : "#D1D5DB"}`,
                  background: payMethod === m.id ? "#1B2B6B" : "white",
                  display:"flex", alignItems:"center", justifyContent:"center",
                }}>
                  {payMethod === m.id && <div style={{ width:8, height:8, borderRadius:"50%", background:"white" }} />}
                </div>
              </div>
            ))}
          </div>

          <div style={{ background:"#DCFCE7", borderRadius:14, padding:"12px 16px", marginBottom:16, display:"flex", gap:10 }}>
            <span style={{ fontSize:18 }}>🔒</span>
            <p style={{ margin:0, fontSize:12, color:"#15803D", lineHeight:1.5 }}>
              Payments are 100% secure & encrypted. Protected by SSL. Money-back guarantee within 7 days.
            </p>
          </div>

          <button onClick={() => setView("success")} style={{
            width:"100%", background:"linear-gradient(135deg,#1B2B6B,#2D4499)",
            color:"white", border:"none", borderRadius:16, padding:"18px",
            fontSize:16, fontWeight:800, cursor:"pointer",
            boxShadow:"0 6px 20px rgba(27,43,107,0.4)",
          }}>
            🔒 Pay {selectedCourse.price === "FREE" ? "& Enroll Free" : `₹${(final + Math.round(final * 0.18)).toLocaleString()}`}
          </button>
        </div>
      </div>
    );
  }

  // ── COURSE DETAIL ──
  if (view === "detail" && selectedCourse) {
    const c = selectedCourse;

    return (
      <div style={{ background:"#F0F4FF", paddingBottom:100, minHeight:"100vh" }}>
        {/* Hero */}
        <div style={{ background:c.gradient, padding:"0 0 24px", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-30, right:-30, width:120, height:120, borderRadius:"50%", background:"rgba(255,255,255,0.06)" }}/>
          <div style={{ position:"absolute", bottom:-20, left:-20, width:80, height:80, borderRadius:"50%", background:"rgba(255,255,255,0.04)" }}/>
          <button onClick={() => setView("list")} style={{ background:"rgba(255,255,255,0.15)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:6, color:"white", fontSize:13, fontWeight:700, padding:"14px 16px 0", marginBottom:16, borderRadius:0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
            All Courses
          </button>
          <div style={{ padding:"0 16px" }}>
            <span style={{ background:c.tagColor, color:"white", fontSize:10, fontWeight:800, padding:"3px 10px", borderRadius:20 }}>{c.tag}</span>
            <p style={{ margin:"10px 0 6px", fontSize:20, fontWeight:900, color:"white", lineHeight:1.3 }}>{c.title}</p>
            <p style={{ margin:"0 0 14px", fontSize:13, color:"rgba(255,255,255,0.75)" }}>{c.desc}</p>
            <div style={{ display:"flex", gap:14 }}>
              <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                <StarIcon /><span style={{ fontSize:13, fontWeight:800, color:"white" }}>{c.rating}</span>
              </div>
              <span style={{ fontSize:12, color:"rgba(255,255,255,0.75)" }}>👥 {c.students} students</span>
              <span style={{ fontSize:12, color:"rgba(255,255,255,0.75)" }}>⏱ {c.hours}</span>
            </div>
            <p style={{ margin:"10px 0 0", fontSize:12, color:"rgba(255,255,255,0.7)" }}>👨‍🏫 By {c.faculty}</p>
          </div>
        </div>

        <div style={{ padding:"16px 16px 0" }}>

          {/* What's included */}
          <div style={{ background:"white", borderRadius:18, padding:"16px", marginBottom:14, boxShadow:"0 2px 10px rgba(0,0,0,0.06)" }}>
            <p style={{ margin:"0 0 12px", fontSize:15, fontWeight:800, color:"#1A1A2E" }}>✅ What's Included</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              {c.includes.map((item,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ width:20, height:20, borderRadius:"50%", background:"#DCFCE7", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <CheckIcon />
                  </div>
                  <span style={{ fontSize:12, color:"#374151", fontWeight:600 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum */}
          <div style={{ background:"white", borderRadius:18, padding:"16px", marginBottom:14, boxShadow:"0 2px 10px rgba(0,0,0,0.06)" }}>
            <p style={{ margin:"0 0 14px", fontSize:15, fontWeight:800, color:"#1A1A2E" }}>📚 Course Curriculum</p>
            {c.curriculum.map((ch,i) => (
              <div key={i} style={{ marginBottom: i < c.curriculum.length-1 ? 10 : 0 }}>
                <div onClick={() => setOpenChapter(openChapter === i ? null : i)} style={{
                  display:"flex", justifyContent:"space-between", alignItems:"center",
                  padding:"12px 14px", background:openChapter===i ? "#EEF2FF" : "#F9FAFB",
                  borderRadius:12, cursor:"pointer",
                }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    {ch.locked ? <LockIcon /> : <span style={{ fontSize:14 }}>📖</span>}
                    <span style={{ fontSize:13, fontWeight:700, color: ch.locked ? "#9CA3AF" : "#1A1A2E" }}>{ch.chapter}</span>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontSize:11, color:"#9CA3AF" }}>{ch.topics.length} topics</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"
                      style={{ transform: openChapter===i ? "rotate(90deg)" : "rotate(0)", transition:"0.2s" }}>
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </div>
                </div>
                {openChapter===i && (
                  <div style={{ padding:"8px 0 4px 14px" }}>
                    {ch.topics.map((t,j) => (
                      <div key={j} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px", borderLeft:"2px solid #EEF2FF" }}>
                        {ch.locked ? <LockIcon /> : <PlayIcon size={12} color="#1B2B6B" />}
                        <span style={{ fontSize:12, color: ch.locked ? "#9CA3AF" : "#374151" }}>{t}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Reviews */}
          <div style={{ background:"white", borderRadius:18, padding:"16px", marginBottom:80, boxShadow:"0 2px 10px rgba(0,0,0,0.06)" }}>
            <p style={{ margin:"0 0 14px", fontSize:15, fontWeight:800, color:"#1A1A2E" }}>⭐ Student Reviews</p>
            {c.reviews.map((r,i) => (
              <div key={i} style={{ marginBottom: i < c.reviews.length-1 ? 14 : 0, paddingBottom: i < c.reviews.length-1 ? 14 : 0, borderBottom: i < c.reviews.length-1 ? "1px solid #F3F4F6" : "none" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                  <div style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,#1B2B6B,#4263C8)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:800, color:"white" }}>
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p style={{ margin:0, fontSize:13, fontWeight:700, color:"#1A1A2E" }}>{r.name}</p>
                    <span style={{ background:"#FEF3E2", color:"#92400E", fontSize:10, fontWeight:700, padding:"1px 8px", borderRadius:20 }}>{r.rank}</span>
                  </div>
                  <div style={{ marginLeft:"auto", display:"flex", gap:2 }}>
                    {[...Array(r.stars)].map((_,k) => <StarIcon key={k} />)}
                  </div>
                </div>
                <p style={{ margin:0, fontSize:13, color:"#6B7280", lineHeight:1.5 }}>"{r.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sticky Buy */}
        <div style={{
          position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)",
          width:390, background:"white", padding:"12px 16px",
          boxShadow:"0 -4px 20px rgba(0,0,0,0.12)", display:"flex", alignItems:"center", gap:12, zIndex:50,
        }}>
          <div>
            <span style={{ fontSize:22, fontWeight:900, color: c.price === "FREE" ? "#059669" : "#1A1A2E" }}>{c.price}</span>
            {c.original && <span style={{ fontSize:12, color:"#9CA3AF", marginLeft:6, textDecoration:"line-through" }}>{c.original}</span>}
            {c.discount && <span style={{ display:"block", fontSize:11, color:"#059669", fontWeight:700 }}>{c.discount}</span>}
          </div>
          <button onClick={() => { setCouponApplied(false); setCoupon(""); setView("checkout"); }} style={{
            flex:1, background:"linear-gradient(135deg,#1B2B6B,#2D4499)", color:"white",
            border:"none", borderRadius:14, padding:"14px", fontSize:14, fontWeight:800, cursor:"pointer",
            boxShadow:"0 4px 14px rgba(27,43,107,0.35)",
          }}>
            {c.price === "FREE" ? "Enroll Free" : "Buy Now →"}
          </button>
        </div>
      </div>
    );
  }

  // ── COURSE LIST ──
  return (
    <div style={{ background:"#F0F4FF", paddingBottom:20 }}>
      <div style={{ background:"white", padding:"16px 16px 0", borderBottom:"1px solid #F0F0F5" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
          <h2 style={{ margin:0, fontSize:22, fontWeight:800, color:"#1A1A2E" }}>Our Courses</h2>
          <button onClick={() => { setActiveTab("mylearning"); setView("mylearning"); }} style={{
            background:"#EEF2FF", color:"#1B2B6B", border:"none",
            borderRadius:10, padding:"8px 14px", fontSize:12, fontWeight:700, cursor:"pointer",
            display:"flex", alignItems:"center", gap:6,
          }}>📚 My Learning</button>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:10, background:"#F9FAFB", borderRadius:14, padding:"11px 14px", border:"1.5px solid #EEEFF5", marginBottom:14, boxShadow:"inset 0 1px 3px rgba(0,0,0,0.04)" }}>
          <SearchSvg />
          <input value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="Search courses, topics..."
            style={{ flex:1, background:"none", border:"none", fontSize:14, color:"#374151", outline:"none" }} />
        </div>

        <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:14 }} className="no-scroll">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding:"8px 18px", borderRadius:22, fontSize:12.5, fontWeight:700,
              border:"none", cursor:"pointer", whiteSpace:"nowrap",
              background: activeCategory === cat ? "#1B2B6B" : "#F3F4F6",
              color: activeCategory === cat ? "white" : "#374151",
              boxShadow: activeCategory === cat ? "0 3px 10px rgba(27,43,107,0.3)" : "none",
            }}>{cat}</button>
          ))}
        </div>
      </div>

      <div style={{ padding:"14px 16px 0" }}>
        <p style={{ margin:"0 0 12px", fontSize:13, color:"#6B7280" }}>
          Showing <strong style={{ color:"#1A1A2E" }}>{filtered.length}</strong> courses
        </p>

        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {filtered.map((course) => (
            <div key={course.id} onClick={() => { setSelectedCourse(course); setView("detail"); }} style={{
              background:"white", borderRadius:20, overflow:"hidden",
              boxShadow:"0 4px 18px rgba(0,0,0,0.08)", cursor:"pointer",
            }}>
              <div style={{ height:100, background:course.gradient, display:"flex", alignItems:"center", padding:"0 18px", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", right:-20, top:-20, width:100, height:100, borderRadius:"50%", background:"rgba(255,255,255,0.07)" }}/>
                <div style={{ display:"flex", alignItems:"center", gap:14, flex:1 }}>
                  <div style={{ width:58, height:58, borderRadius:16, background:"rgba(255,255,255,0.18)", border:"1.5px solid rgba(255,255,255,0.3)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, flexShrink:0 }}>{course.emoji}</div>
                  <div>
                    <h3 style={{ margin:0, fontSize:14.5, fontWeight:800, color:"white", lineHeight:1.3 }}>{course.title}</h3>
                    <p style={{ margin:"4px 0 0", fontSize:11, color:"rgba(255,255,255,0.75)" }}>{course.desc}</p>
                  </div>
                </div>
                <div style={{ position:"absolute", top:12, right:12, background:course.tagColor, color:"white", fontSize:9.5, fontWeight:800, padding:"3px 10px", borderRadius:20 }}>{course.tag}</div>
              </div>

              <div style={{ padding:"14px 16px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:10 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:4 }}><StarIcon /><span style={{ fontSize:12.5, fontWeight:800, color:"#374151" }}>{course.rating}</span></div>
                  <span style={{ fontSize:12, color:"#6B7280", fontWeight:600 }}>👥 {course.students}</span>
                  <span style={{ fontSize:12, color:"#6B7280", fontWeight:600 }}>⏱ {course.hours}</span>
                </div>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:12 }}>
                  {course.features.map((f,j) => (
                    <span key={j} style={{ background:"#F0F4FF", color:"#1B2B6B", fontSize:10.5, fontWeight:700, padding:"4px 10px", borderRadius:20, border:"1px solid #C7D2FE" }}>✓ {f}</span>
                  ))}
                </div>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div>
                    <span style={{ fontSize:22, fontWeight:900, color: course.price === "FREE" ? "#059669" : "#1A1A2E" }}>{course.price}</span>
                    {course.original && <span style={{ fontSize:13, color:"#9CA3AF", marginLeft:6, textDecoration:"line-through" }}>{course.original}</span>}
                    {course.discount && <span style={{ display:"block", fontSize:11, fontWeight:700, color:"#059669" }}>{course.discount}</span>}
                  </div>
                  <button style={{
                    background:"linear-gradient(135deg,#1B2B6B,#2D4499)", color:"white",
                    border:"none", borderRadius:14, padding:"11px 20px",
                    fontSize:13, fontWeight:700, cursor:"pointer",
                    boxShadow:"0 4px 12px rgba(27,43,107,0.3)",
                  }}>
                    {course.price === "FREE" ? "Enroll Free" : "View Course →"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* All Access Pass */}
        <div style={{ marginTop:20 }}>
          <div style={{ background:"linear-gradient(135deg,#1B2B6B,#2D4499)", borderRadius:22, padding:"20px 18px", position:"relative", overflow:"hidden", boxShadow:"0 8px 28px rgba(27,43,107,0.3)" }}>
            <div style={{ position:"absolute", top:-20, right:-20, width:100, height:100, borderRadius:"50%", background:"rgba(255,255,255,0.05)" }}/>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div>
                <span style={{ background:"#F5A623", color:"white", fontSize:10, fontWeight:800, padding:"3px 10px", borderRadius:20 }}>BEST VALUE</span>
                <p style={{ margin:"8px 0 3px", fontSize:17, fontWeight:800, color:"white" }}>All Access Pass</p>
                <p style={{ margin:"0 0 8px", fontSize:12, color:"rgba(255,255,255,0.75)" }}>Unlock all courses + live classes + tests</p>
                <p style={{ margin:0, fontSize:24, fontWeight:900, color:"#F5A623" }}>₹24,999<span style={{ fontSize:13, fontWeight:400, color:"rgba(255,255,255,0.6)" }}>/year</span></p>
              </div>
              <button style={{
                background:"linear-gradient(135deg,#F5A623,#E8930A)", color:"white",
                border:"none", borderRadius:14, padding:"13px 18px",
                fontSize:13, fontWeight:800, cursor:"pointer",
                boxShadow:"0 4px 14px rgba(245,166,35,0.4)", flexShrink:0,
              }}>Get Access</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
