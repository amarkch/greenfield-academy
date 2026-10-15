import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ChevronRight, Star, BookOpen, UserCheck, GraduationCap } from "lucide-react";
import { C, fontDisplay, fontBody } from "../theme.js";
import GreenfieldHeaderBar from "../components/GreenfieldHeaderBar.jsx";
import "./ClassDetails.css";
// const host = "https://greenfield-academy-back-end.onrender.com";
const host = "http://localhost:3000";

function initials(name) {
  return name.replace(/^(Mr\.|Mrs\.|Ms\.)\s*/, "").split(" ").map((w) => w[0]).join("").slice(0, 2);
}

// List of classes for the dropdown
const availableClasses = [
  { label: "Class Nursery", value: "class-NURSERY" },
  { label: "Class LKG", value: "class-LKG" },
  { label: "Class UKG", value: "class-UKG" },
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

const getProgressValue = (done, total) => {
  if (!total || total <= 0) return 0;
  return Math.round((done / total) * 100);
};

export default function Students() {
  const { className } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [subjectProgressCount, setSubjectProgressCount] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const processSubjectProgress = (data) => {
    let d = {};
    data.forEach((x) => {
      d[x.subject] = getProgressValue(x.doneCount, x.totalChapters);
    });
    setSubjectProgressCount(d);
  };

  
const recalculateRatings = async () => {
  try {
    // First, recalculate student ratings
    const ratingRes = await fetch(
      `${host}/api/students-rating-recalculation/${className}`
    );

    if (!ratingRes.ok) {
      throw new Error("Failed to recalculate student ratings");
    }

    // Then, fetch students after recalculation completes
    const studentsRes = await fetch(
      `${host}/api/get-students/${className}`
    );

    if (!studentsRes.ok) {
      throw new Error("Failed to fetch students");
    }

    const studentData = await studentsRes.json();

    //console.log(data);
    setStudents(studentData.data);

  } catch (error) {
    console.error("Error:", error);
  }
};


  useEffect(() => {
    if (!className) return;
    setLoading(true);
    Promise.all([
      fetch(`${host}/api/subjects/${className}`).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch subjects");
        return res.json();
      }),
      fetch(`${host}/api/get-students/${className}`).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch students");
        return res.json();
      }),
    ])
      .then(([subjectData, studentData]) => {
        setSubjects(subjectData.subjects || []);
        processSubjectProgress(subjectData.subjectProgress || []);
        setStudents(studentData.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [className]);

  const handleClassChange = (e) => {
    const selectedClass = e.target.value;
    if (selectedClass) {
      navigate(`/class/${selectedClass}`);
    }
  };

  const getProgressColor = (v) => {
    return v < 50 ? (v < 30 ? "#DC2626" : "#2563EB") : "#16A34A";
  };

  const jsxStudents = () => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        {/* Top Control Bar: Class Selector & Title */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 16,
            background: C.paperCard,
            padding: "20px 24px",
            borderRadius: 16,
            border: `1px solid ${C.line}`,
            boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
          }}
        >
          <div style={{width: "100%"}}>
            <label
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                color: C.slate,
                marginBottom: 6,
                fontFamily: fontBody,
              }}
            >
              Select Academic Class
            </label>

            <select
              value={className || ""}
              onChange={handleClassChange}
              className="drop-down"
            >
              <option value="" disabled>
                Choose class...
              </option>
              {availableClasses.map((cls) => (
                <option key={cls.value} value={cls.value}>
                  {cls.label}
                </option>
              ))}
            </select>
          </div>

          {className !== "all" && (
            <div style={{ textAlign: "right" }}>
              <span
                style={{
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: C.slate,
                  fontWeight: 700,
                }}
              >
                Current View
              </span>
              <div
                style={{
                  fontFamily: fontDisplay,
                  fontSize: 28,
                  fontWeight: 800,
                  color: C.ink,
                }}
              >
                {className}
              </div>
            </div>
          )}
        </div>

        {/* Subjects Section */}
        {className !== "all" && subjects.length > 0 && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <BookOpen size={20} color={C.ink} />
              <h3 style={{ fontFamily: fontDisplay, fontSize: 20, fontWeight: 700, margin: 0, color: C.ink }}>
                Class Subjects & Faculty
              </h3>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "14px",
              }}
            >
              {subjects.map((std) => {
                const progress = subjectProgressCount[std.subjectName] || 0;
                return (
                  <Link
                    key={std.id || std._id}
                    to={`/faculty/${std.teacherId}`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: "16px",
                      background: C.paperCard,
                      border: `1px solid ${C.line}`,
                      borderRadius: 14,
                      textDecoration: "none",
                      color: C.ink,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
                      transition: "all 0.2s ease-in-out",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.06)";
                      e.currentTarget.style.borderColor = C.primary || "#000";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.02)";
                      e.currentTarget.style.borderColor = C.line;
                    }}
                  >
                    <div>
                      <b style={{ fontSize: 16, fontFamily: fontDisplay, display: "block", marginBottom: 4 }}>
                        {std.subjectName}
                      </b>
                      <span style={{ fontSize: 13, color: C.slate, fontFamily: fontBody }}>
                        {std.teacherName}
                      </span>
                    </div>
                    <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${C.line}40` }}>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: getProgressColor(progress),
                          fontFamily: fontBody,
                        }}
                      >
                        Completed: {progress}%
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Students List Section */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <GraduationCap size={22} color={C.ink} />
              <h3 style={{ fontFamily: fontDisplay, fontSize: 20, fontWeight: 700, margin: 0, color: C.ink }}>
                Students Directory
              </h3>
            </div>
            <div style={{ display: "flex", alignItems: "center"}}>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: C.slate,
                  background: `${C.line}40`,
                  padding: "4px 10px",
                  borderRadius: 20,
                }}
              >
                Total students: {students.length}
              </span>
              <button className="ga-banner-buttons ga-btn-primary" onClick={recalculateRatings}>Refresh Ratings</button>
            </div>
            
            
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "14px",
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
                  padding: "16px",
                  background: C.paperCard,
                  border: `1px solid ${C.line}`,
                  borderRadius: 16,
                  textDecoration: "none",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
                  transition: "all 0.2s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.06)";
                  e.currentTarget.style.borderColor = std.color || C.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.02)";
                  e.currentTarget.style.borderColor = C.line;
                }}
              >
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 14,
                    background: `${std.color || "#4F46E5"}15`,
                    color: std.color || "#4F46E5",
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
                      fontFamily: fontDisplay,
                      fontWeight: 700,
                      fontSize: 15,
                      color: C.ink,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      marginBottom: 2,
                    }}
                  >
                    {std.name}
                  </div>
                  <div
                    style={{
                      fontFamily: fontBody,
                      fontSize: 12,
                      color: C.slate,
                      marginBottom: 6,
                    }}
                  >
                    Roll: <strong style={{ color: C.ink }}>{std.rollNumber}</strong> &bull; {std.className}
                  </div>

                  {/* Star Rating */}
                  <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {[1, 2, 3, 4, 5].map((star) => {
                      const rating = std.rating || 0;
                      const filled = star <= rating;
                      return (
                        <Star
                          key={star}
                          size={13}
                          fill={filled ? "#F59E0B" : "transparent"}
                          color={filled ? "#F59E0B" : "#D1D5DB"}
                        />
                      );
                    })}
                  </div>
                </div>

                <ChevronRight size={18} color={C.slate} style={{ flexShrink: 0 }} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: C.background || "#F9FAFB" }}>
      <GreenfieldHeaderBar />
      <div className="holder">
        {loading ? (
          <div style={{ padding: "80px 12px", textAlign: "center", fontFamily: fontBody, color: C.slate, fontSize: 16 }}>
            Loading academic data...
          </div>
        ) : error ? (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              fontFamily: fontBody,
              color: "#DC2626",
              background: "#FEE2E2",
              borderRadius: 12,
              margin: "40px auto",
              maxWidth: 500,
            }}
          >
            <strong>Error:</strong> {error}
          </div>
        ) : (
          jsxStudents()
        )}
      </div>
    </div>
  );
}