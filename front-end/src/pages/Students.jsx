import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { C, fontDisplay, fontBody } from "../theme.js";
import { students } from "../data/mockData.js";

function initials(name) {
  return name.replace(/^(Mr\.|Mrs\.|Ms\.)\s*/, "").split(" ").map((w) => w[0]).join("").slice(0, 2);
}

export default function Students() {
  return (
    <div style={{ animation: "fadeIn 0.4s ease", padding: "0 12px", boxSizing: "border-box" }}>
      {/* Header section with responsive margins */}
      <div style={{ marginBottom: "clamp(16px, 4vw, 24px)" }}>
        <p style={{ fontFamily: fontBody, color: C.slate, fontSize: "clamp(12px, 3vw, 14px)", margin: 0 }}>Class VIII-B</p>
        <h1 style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: "clamp(20px, 5vw, 26px)", color: C.ink, margin: "4px 0 0" }}>Students</h1>
      </div>

      {/* Grid layout optimized for fluid responsiveness down to small mobile screens */}
      <div 
        style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))", 
          gap: "clamp(12px, 3vw, 16px)" 
        }}
      >
        {students.map((f) => (
          <Link
            key={f.id}
            to={`/student/${f.id}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "clamp(12px, 3vw, 18px)",
              background: C.paperCard,
              border: `1px solid ${C.line}`,
              borderRadius: 16,
              textDecoration: "none",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 12,
                background: `${f.color}22`,
                color: f.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: fontDisplay,
                fontWeight: 700,
                fontSize: 16,
                flexShrink: 0,
              }}
            >
              {initials(f.name)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div 
                style={{ 
                  fontFamily: fontBody, 
                  fontWeight: 700, 
                  fontSize: 14, 
                  color: C.ink,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {f.name}
              </div>
              <div 
                style={{ 
                  fontFamily: fontBody, 
                  fontSize: 12, 
                  color: C.slate, 
                  marginTop: 2,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {f.subject} · {f.experience}
              </div>
            </div>
            <ChevronRight size={16} color={C.slate} style={{ flexShrink: 0 }} />
          </Link>
        ))}
      </div>
    </div>
  );
}