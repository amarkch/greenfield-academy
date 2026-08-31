import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Loader2, AlertCircle } from "lucide-react";
import { C, fontDisplay, fontBody } from "../theme.js";

function initials(name) {
  return name.replace(/^(Mr\.|Mrs\.|Ms\.)\s*/, "").split(" ").map((w) => w[0]).join("").slice(0, 2);
}

export default function Faculty() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFaculty() {
      try {
        setLoading(true);
        const response = await fetch("https://greenfield-academy-back-end.onrender.com/api/get-teachers-list"); // Replace with your actual API endpoint
        
        if (!response.ok) {
          throw new Error("Failed to fetch faculty list");
        }
        
        const data = await response.json();
        setFaculty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchFaculty();
  }, []);

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontFamily: fontBody, color: C.slate, fontSize: 14, margin: 0 }}>Class VIII-B</p>
        <h1 style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 26, color: C.ink, margin: "4px 0 0" }}>Faculty</h1>
      </div>

      {loading && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 0", color: C.slate, fontFamily: fontBody, gap: 8 }}>
          <Loader2 className="animate-spin" size={20} />
          <span>Loading faculty...</span>
        </div>
      )}

      {error && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 16, background: "#fee2e2", border: "1px solid #fecaca", borderRadius: 12, color: "#991b1b", fontFamily: fontBody, fontSize: 14 }}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && (
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
                  background: `${f.color || C.slate}22`,
                  color: f.color || C.slate,
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
                <div style={{ fontFamily: fontBody, fontSize: 12, color: C.slate, marginTop: 2 }}>{f.email} · {f.phone}</div>
              </div>
              <ChevronRight size={16} color={C.slate} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}