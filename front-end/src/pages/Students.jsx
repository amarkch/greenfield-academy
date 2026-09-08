import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { C, fontDisplay, fontBody } from "../theme.js";
import GreenfieldHeaderBar from "../components/GreenfieldHeaderBar.jsx";

//const host = "https://greenfield-academy-back-end.onrender.com";
const host = "http://localhost:3000";

function initials(name) {
  return name.replace(/^(Mr\.|Mrs\.|Ms\.)\s*/, "").split(" ").map((w) => w[0]).join("").slice(0, 2);
}

export default function Students() {
  const { className } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!className) return;
    
    setLoading(true);
    fetch(`${host}/api/get-students/${className}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch students");
        return res.json();
      })
      .then((responseData) => {
        setStudents(responseData.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [className]);

  if (loading) {
    return (
      <div style={{ padding: "50px 12px", textAlign: "center", fontFamily: fontBody, color: C.slate }}>
        Loading students...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "50px 12px", textAlign: "center", fontFamily: fontBody, color: "red" }}>
        Error: {error}
      </div>
    );
  }
  const jsxStudents = () => {
    return (
      <>
        <div style={{ marginBottom: "clamp(16px, 4vw, 24px)" }}>
          <h1>Students</h1>
          <h3>Class: {className}</h3>
        </div>

        {/* Grid layout optimized for fluid responsiveness down to small mobile screens */}
        <div 
          style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))", 
            gap: "clamp(12px, 3vw, 16px)" 
          }}
        >
          {students.map((std) => (
            <Link
              key={std.id || std._id}
              to={`/student-details/${std._id}`}
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
                  background: `${std.color}22`,
                  color: std.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: fontDisplay,
                  fontWeight: 700,
                  fontSize: 16,
                  flexShrink: 0,
                }}
              >
                {initials(std.name)}
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
                  {std.name}
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
                  {std.className}<br/>Roll: {std.rollNumber}
                </div>
              </div>
              <ChevronRight size={16} color={C.slate} style={{ flexShrink: 0 }} />
            </Link>
          ))}
        </div>
      </>
    )
  }
  return (
    <div style={{ position: "relative" }}>
      <GreenfieldHeaderBar />
      {/* Header section with responsive margins */}
      <div style={{ marginTop: "50px"}}>
      {
        loading ? 
          <div style={{ padding: "50px 12px", textAlign: "center", fontFamily: fontBody, color: C.slate }}>
            Loading students...
          </div>
          : error ?
            <div style={{ padding: "50px 12px", textAlign: "center", fontFamily: fontBody, color: "red" }}>
              Error: {error}
            </div>
            : jsxStudents()
          
      }
      </div>
    </div>
  );
}