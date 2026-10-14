import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ChevronRight, Star } from "lucide-react";
import { C, fontDisplay, fontBody } from "../theme.js";
import GreenfieldHeaderBar from "../components/GreenfieldHeaderBar.jsx";

//const host = "https://greenfield-academy-back-end.onrender.com";
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
    let d={};
    data.map(x=> {
      d[x.subject] = getProgressValue(x.doneCount, x.totalChapters)
    });
    setSubjectProgressCount(d);
  }
  useEffect(() => {
    if (!className) return;
    
    setLoading(true);
    fetch(`${host}/api/subjects/${className}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch students");
        return res.json();
      })
      .then((responseData) => {
        setSubjects(responseData.subjects);
        processSubjectProgress(responseData.subjectProgress);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
    });
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
      navigate(`/class/${selectedClass}`); // Adjust this path if your route prefix is different (e.g., /class-students/:className)
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
          

          {/* Class Dropdown Selection */}
          <div style={{width: "100%"}}>
            <b>Select Class: </b>
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
          
          {
                className !== "all" ?
                <div>
                  <div style={{width: "100%", fontSize: 32, fontWeight: 900}}>
                    {className}
                  </div>
                  <h3>Subjects:</h3>
                  <div style={{width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "space-between"}}>
                  {
                    subjects.map((std) => (
                      <Link
                      key={std.id || std._id}
                      to={`/faculty/${std.teacherId}`}
                      style={{
                        alignItems: "center",
                        gap: 14,
                        color: "#000",
                        padding: "clamp(12px, 3vw, 18px)",
                        background: C.paperCard,
                        border: `1px solid ${C.line}`,
                        borderRadius: 16,
                        textDecoration: "none",
                        width: "200px",
                        float: "left",
                        marginBottom: "10px",
                        boxSizing: "border-box",
                      }}
                    >
                      
                        <div>
                          <b>{std.subjectName}</b>
                        </div>
                        <div>
                          {std.teacherName}<br/><i>
                          <span style={{color: subjectProgressCount[std.subjectName] < 40 ? "#900" : "#090"}}>Completed: {subjectProgressCount[std.subjectName]}%</span>
                          </i>
                        </div>
                        

                      </Link>
                    ))
                  }
                  </div>
                </div>
                : null
          }
          
        </div>

        
        <h3>Students list - Total: {students.length}</h3>
        <div 
          style={{ 
            display: "grid", 
            marginTop: "10px",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))", 
            gap: "7px" 
          }}
        >
          {
            students.map((std) => (
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
                    fontFamily: "'Bentham', serif", 
                    fontWeight: 700, 
                    fontSize: 16, 

                    color: C.ink,
                    textOverflow: "ellipsis",
                  }}
                >
                  <i>{std.name}</i>
                </div>
                <div 
                  style={{ 
                    fontFamily: fontBody, 
                    fontSize: 12, 
                    color: C.slate, 
                    marginTop: 2,
                    textOverflow: "ellipsis",
                  }}
                >
                  <b>Roll: {std.rollNumber}</b><br/>
                  {std.className}
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