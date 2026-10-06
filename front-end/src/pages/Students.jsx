import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ChevronRight, Star } from "lucide-react";
import { C, fontDisplay, fontBody } from "../theme.js";
import GreenfieldHeaderBar from "../components/GreenfieldHeaderBar.jsx";

const host = "https://greenfield-academy-back-end.onrender.com";
//const host = "http://localhost:3000";

function initials(name) {
  return name.replace(/^(Mr\.|Mrs\.|Ms\.)\s*/, "").split(" ").map((w) => w[0]).join("").slice(0, 2);
}

// List of classes for the dropdown
const availableClasses = [
  { label: "Class I", value: "class-i" },
  { label: "Class II", value: "class-ii" },
  { label: "Class III", value: "class-iii" },
  { label: "Class IV", value: "class-iv" },
  { label: "Class V", value: "class-v" },
  { label: "Class VI", value: "class-vi" },
  { label: "Class VII", value: "class-vii" },
  { label: "Class VIII", value: "class-viii" },
  { label: "Class IX", value: "class-ix" },
  { label: "Class X", value: "class-x" },
];

export default function Students() {
  const { className } = useParams();
  const navigate = useNavigate();
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

  // Handle class selection change and update the URL route
  const handleClassChange = (e) => {
    const selectedClass = e.target.value;
    if (selectedClass) {
      navigate(`/students/${selectedClass}`); // Adjust this path if your route prefix is different (e.g., /class-students/:className)
    }
  };

  const jsxStudents = () => {
    return (
      <>
        {/* Header and Dropdown Section */}
        <div 
          style={{ 
            marginBottom: "clamp(16px, 4vw, 24px)", 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12 
          }}
        >
          <div>
            <h1>Students</h1>
            <h3>Class: {className}</h3>
          </div>

          {/* Class Dropdown Selection */}
          <div>
            <select
              value={className || ""}
              onChange={handleClassChange}
              style={{
                padding: "8px 14px",
                borderRadius: 8,
                border: `1px solid ${C.line}`,
                background: C.paperCard,
                color: C.ink,
                fontFamily: fontBody,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                outline: "none"
              }}
            >
              <option value="" disabled>Select Class</option>
              {availableClasses.map((cls) => (
                <option key={cls.value} value={cls.value}>
                  {cls.label}
                </option>
              ))}
            </select>
          </div>
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
                {/* Star rating displayed below the roll number */}
                <div style={{ display: "flex", alignItems: "center", gap: 2, marginTop: 4 }}>
                  {[1, 2, 3, 4, 5].map((star) => {
                    const rating = std.rating || 0;
                    const filled = star <= rating;
                    return (
                      <Star
                        key={star}
                        size={14}
                        fill={filled ? "#F59E0B" : "transparent"}
                        color={filled ? "#F59E0B" : "#bbb"}
                      />
                    );
                  })}
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
      <div style={{ marginTop: "70px"}}>
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