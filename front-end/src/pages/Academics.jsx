import React, { useState } from "react";
import { CheckCircle2, CircleDot, Circle, ChevronDown } from "lucide-react";
import { C, fontDisplay, fontBody, fontMono } from "../theme.js";
import { subjects } from "../data/mockData.js";

const statusMeta = {
  done: { icon: CheckCircle2, label: "Completed" },
  current: { icon: CircleDot, label: "In progress" },
  upcoming: { icon: Circle, label: "Not started" },
};

function SubjectAccordion({ subject, isOpen, onToggle }) {
  return (
    <div style={{ background: C.paperCard, border: `1px solid ${C.line}`, borderRadius: 16, overflow: "hidden" }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "16px 20px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <div style={{ width: 10, height: 10, borderRadius: 999, background: subject.color, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: fontDisplay, fontSize: 16, color: C.ink }}>{subject.name}</div>
          <div style={{ fontFamily: fontBody, fontSize: 12, color: C.slate, marginTop: 2 }}>{subject.chapter}</div>
        </div>
        <span style={{ fontFamily: fontMono, fontSize: 12, color: C.slate }}>{subject.progress}%</span>
        <ChevronDown
          size={18}
          color={C.slate}
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
        />
      </button>

      {isOpen && (
        <div style={{ padding: "0 20px 18px", animation: "fadeIn 0.25s ease" }}>
          <div style={{ height: 8, borderRadius: 999, background: C.paper, border: `1px solid ${C.line}`, marginBottom: 16 }}>
            <div style={{ width: `${subject.progress}%`, height: "100%", borderRadius: 999, background: subject.color }} />
          </div>
          {subject.chapters.map((ch, i) => {
            const meta = statusMeta[ch.status];
            const Icon = meta.icon;
            const activeColor = ch.status === "done" ? C.mint : ch.status === "current" ? subject.color : C.slate;
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "9px 0",
                  borderTop: i === 0 ? "none" : `1px solid ${C.line}`,
                }}
              >
                <Icon size={16} color={activeColor} />
                <span
                  style={{
                    fontFamily: fontBody,
                    fontSize: 13,
                    color: ch.status === "upcoming" ? C.slate : C.ink,
                    flex: 1,
                  }}
                >
                  {ch.name}
                </span>
                <span style={{ fontFamily: fontBody, fontSize: 11, color: activeColor, fontWeight: 600 }}>{meta.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Academics() {
  const [openId, setOpenId] = useState(subjects[0].id);

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontFamily: fontBody, color: C.slate, fontSize: 14, margin: 0 }}>Class VIII-B</p>
        <h1 style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 26, color: C.ink, margin: "4px 0 0" }}>Academics</h1>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {subjects.map((s) => (
          <SubjectAccordion key={s.id} subject={s} isOpen={openId === s.id} onToggle={() => setOpenId(openId === s.id ? null : s.id)} />
        ))}
      </div>
    </div>
  );
}
