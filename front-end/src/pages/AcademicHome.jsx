import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Flame,
  Award,
  Star,
  ChevronRight,
  CalendarCheck,
  TrendingUp,
  Clock,
  Bell,
} from "lucide-react";
import { C, fontDisplay, fontBody, fontMono } from "../theme.js";
import ModeSwitch from "../components/ModeSwitch.jsx";
import {
  subjects,
  badges,
  weekActivity,
  dayLabels,
  overviewStats,
  activityFeed,
} from "../data/mockData.js";

const iconFor = { flame: Flame, star: Star, award: Award };

function StudentHome() {
  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontFamily: fontBody, color: C.slate, fontSize: 14, margin: 0 }}>Wednesday · Class VIII</p>
        <h1 style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 30, color: C.ink, margin: "4px 0 0" }}>
          Good afternoon, Anupam 👋
        </h1>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
        {badges.map((b, i) => {
          const Icon = iconFor[b.icon];
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: C.paperCard,
                border: `1px solid ${C.line}`,
                borderRadius: 999,
                padding: "8px 16px",
                fontFamily: fontBody,
                fontWeight: 600,
                fontSize: 13,
                color: C.ink,
              }}
            >
              <Icon size={16} color={C.marigold} fill={b.icon === "flame" ? C.coral : "none"} />
              {b.label}
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
        <h2 style={{ fontFamily: fontDisplay, fontSize: 18, color: C.ink, margin: 0 }}>Continue where you left off</h2>
        <Link to="/academics" style={{ fontFamily: fontBody, fontWeight: 600, fontSize: 13, color: C.ink, textDecoration: "none" }}>
          View all subjects →
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
        {subjects.map((s, i) => (
          <div key={i} style={{ background: C.paperCard, borderRadius: 18, overflow: "hidden", border: `1px solid ${C.line}`, boxShadow: "0 1px 3px rgba(35,33,82,0.06)" }}>
            <div style={{ height: 8, background: s.color }} />
            <div style={{ padding: 18 }}>
              <h3 style={{ fontFamily: fontDisplay, fontSize: 17, color: C.ink, margin: "0 0 4px" }}>{s.name}</h3>
              <p style={{ fontFamily: fontBody, fontSize: 13, color: C.slate, margin: "0 0 14px" }}>{s.chapter}</p>
              <div style={{ height: 8, borderRadius: 999, background: C.paper, marginBottom: 8, border: `1px solid ${C.line}` }}>
                <div style={{ width: `${s.progress}%`, height: "100%", borderRadius: 999, background: s.color }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: fontMono, fontSize: 12, color: C.slate }}>{s.progress}% complete</span>
                <span style={{ display: "flex", alignItems: "center", gap: 2, fontFamily: fontBody, fontWeight: 600, fontSize: 13, color: s.color }}>
                  Continue <ChevronRight size={14} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ParentHome() {
  const max = Math.max(...weekActivity);
  const stats = [
    { label: "Attendance", value: overviewStats.attendance, icon: CalendarCheck, color: C.mint },
    { label: "Avg. score", value: overviewStats.avgScore, icon: TrendingUp, color: C.marigold },
    { label: "Time today", value: overviewStats.timeToday, icon: Clock, color: C.sky },
    { label: "Pending", value: `${overviewStats.pending} tasks`, icon: Bell, color: C.coral },
  ];

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontFamily: fontBody, color: C.slate, fontSize: 14, margin: 0 }}>Anupam Sharma · Class VIII</p>
        <h1 style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 26, color: C.ink, margin: "4px 0 0" }}>This week's progress</h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 14, marginBottom: 28 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: C.paperCard, border: `1px solid ${C.line}`, borderRadius: 14, padding: 16 }}>
            <s.icon size={18} color={s.color} />
            <div style={{ fontFamily: fontMono, fontSize: 22, fontWeight: 600, color: C.ink, marginTop: 10 }}>{s.value}</div>
            <div style={{ fontFamily: fontBody, fontSize: 12, color: C.slate, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16, marginBottom: 16 }}>
        <div style={{ background: C.paperCard, border: `1px solid ${C.line}`, borderRadius: 16, padding: 20 }}>
          <h3 style={{ fontFamily: fontDisplay, fontSize: 16, color: C.ink, margin: "0 0 16px" }}>Subject-wise mastery</h3>
          {subjects.map((s, i) => (
            <div key={i} style={{ marginBottom: i === subjects.length - 1 ? 0 : 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: fontBody, fontSize: 13, color: C.ink, marginBottom: 6 }}>
                <span>{s.name}</span>
                <span style={{ fontFamily: fontMono, color: C.slate }}>{s.progress}%</span>
              </div>
              <div style={{ height: 8, borderRadius: 999, background: C.paper, border: `1px solid ${C.line}` }}>
                <div style={{ width: `${s.progress}%`, height: "100%", borderRadius: 999, background: s.color }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: C.paperCard, border: `1px solid ${C.line}`, borderRadius: 16, padding: 20 }}>
          <h3 style={{ fontFamily: fontDisplay, fontSize: 16, color: C.ink, margin: "0 0 16px" }}>Time spent this week</h3>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 110 }}>
            {weekActivity.map((v, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ width: "100%", height: `${(v / max) * 80}px`, borderRadius: 6, background: i === 5 ? C.marigold : C.ink, opacity: i === 5 ? 1 : 0.85 }} />
                <span style={{ fontFamily: fontBody, fontSize: 11, color: C.slate }}>{dayLabels[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: C.paperCard, border: `1px solid ${C.line}`, borderRadius: 16, padding: 20 }}>
        <h3 style={{ fontFamily: fontDisplay, fontSize: 16, color: C.ink, margin: "0 0 14px" }}>Recent activity</h3>
        {activityFeed.map((a, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "10px 0", borderTop: i === 0 ? "none" : `1px solid ${C.line}`, fontFamily: fontBody }}>
            <span style={{ fontSize: 13, color: C.ink }}>{a.text}</span>
            <span style={{ fontSize: 12, color: C.slate, whiteSpace: "nowrap" }}>{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [mode, setMode] = useState("student");

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
        <ModeSwitch mode={mode} setMode={setMode} />
      </div>
      {mode === "student" ? <StudentHome /> : <ParentHome />}
    </div>
  );
}
