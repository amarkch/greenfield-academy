import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { C, fontDisplay, fontBody } from "../theme.js";
import { faculty } from "../data/mockData.js";

function initials(name) {
  return name.replace(/^(Mr\.|Mrs\.|Ms\.)\s*/, "").split(" ").map((w) => w[0]).join("").slice(0, 2);
}

export default function Faculty() {
  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontFamily: fontBody, color: C.slate, fontSize: 14, margin: 0 }}>Class VIII-B</p>
        <h1 style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 26, color: C.ink, margin: "4px 0 0" }}>Faculty</h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
        {faculty.map((f) => (
          <Link
            key={f.id}
            to={`/faculty/${f.id}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: 18,
              background: C.paperCard,
              border: `1px solid ${C.line}`,
              borderRadius: 16,
              textDecoration: "none",
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
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: fontBody, fontWeight: 700, fontSize: 14, color: C.ink }}>{f.name}</div>
              <div style={{ fontFamily: fontBody, fontSize: 12, color: C.slate, marginTop: 2 }}>{f.subject} · {f.experience}</div>
            </div>
            <ChevronRight size={16} color={C.slate} />
          </Link>
        ))}
      </div>
    </div>
  );
}
