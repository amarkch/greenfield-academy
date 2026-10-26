
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Star,
  ChevronRight,
  BookOpen,
  CalendarDays
} from "lucide-react";
import { C, fontDisplay, fontBody } from "../theme.js";
import GreenfieldHeaderBar from "../components/GreenfieldHeaderBar.jsx";
import "./ParentDashboard.css";
// Demo data — replace with your selected students later.
const students = [
  {
    _id: "student-1",
    name: "Rahul Das",
    className: "class-v",
    rollNumber: 12,
    rating: 4,
    color: "#4F46E5"
  },
  {
    _id: "student-2",
    name: "Priya Das",
    className: "class-viii",
    rollNumber: 7,
    rating: 5,
    color: "#059669"
  }
];

function initials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .map(word => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatClass(className = "") {
  const names = {
    nursery: "Nursery",
    lkg: "LKG",
    ukg: "UKG",
    i: "I",
    ii: "II",
    iii: "III",
    iv: "IV",
    v: "V",
    vi: "VI",
    vii: "VII",
    viii: "VIII",
    ix: "IX",
    x: "X"
  };

  const key = className.replace(/^class-/i, "").toLowerCase();
  return `Class ${names[key] || key.toUpperCase()}`;
}


const getExistingDetails = () => {
  try {
    const preferredChildren = JSON.parse(
      window.localStorage.getItem("setUpData") || "{}"
    );

    return Array.isArray(preferredChildren) ? preferredChildren : {};
  } catch (error) {
    console.error("Error reading setUpData:", error);
    return {};
  }
};


const saveStudentToLocalStorage = (newStudent) => {
  // 1. Retrieve existing students from localStorage (default to empty array if none exist)
  const existingStudents = JSON.parse(localStorage.getItem('students')) || [];

  // 2. Check if a student with the same ID already exists
  const studentExists = existingStudents.some(
    (student) => student.id === newStudent.id
  );

  if (studentExists) {
    console.warn(`Student with ID "${newStudent.id}" already exists.`);
    return { success: false, message: 'Student ID already exists in storage.' };
  }

  // 3. Append the new student to the array
  const updatedStudents = [...existingStudents, newStudent];

  // 4. Save the updated array back to localStorage
  localStorage.setItem('students', JSON.stringify(updatedStudents));

  return { success: true, message: 'Student saved successfully!' };
};

export default function ParentsDashboard() {
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { name, stdClass, roll, gender, id } = useParams();

  const host = "https://greenfield-academy-ipqx.onrender.com";
  //const host = "http://localhost:3000";
  useEffect(() => {
    if(name && stdClass && roll && gender && id)
      saveStudentToLocalStorage({name, stdClass, roll, gender, id});
    setStudents(JSON.parse(window.localStorage.getItem("students")));
  }, []);
  // const fetchStudentsByClass = async (className) => {
  //   setSelectedClass(className);
  //   setStudents([]);
  //   setError("");

  //   if (!className) return;

  //   setLoading(true);

  //   try {
  //     const response = await fetch(
  //       `${host}/api/get-students/${encodeURIComponent(className)}`
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch students");
  //     }

  //     const responseData = await response.json();
  //     // Supports either an array or { students: [...] }
  //     const studentList = responseData.data;

  //     setStudents(studentList);
  //   } catch (err) {
  //     console.error("Error fetching students:", err);
  //     setError("Unable to load students. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.background || "#F8FAFC"
      }}
    >
      <GreenfieldHeaderBar />

      <main
        className="holder"
        style={{
          paddingTop: 30,
          paddingBottom: 50,
          fontFamily: fontBody
        }}
      >
        {/* Welcome banner */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "30px 28px",
            borderRadius: 22,
            background: "linear-gradient(120deg, #172554, #1D4ED8)",
            color: "#FFFFFF",
            marginBottom: 28
          }}
        >
          <div
            style={{
              position: "absolute",
              right: -25,
              top: -50,
              width: 190,
              height: 190,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.07)"
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                fontSize: 12,
                fontWeight: 600,
                color: "#DBEAFE",
                background: "rgba(255,255,255,0.12)",
                borderRadius: 30,
                padding: "7px 12px",
                marginBottom: 18
              }}
            >
              <GraduationCap size={16} />
              GREENFIELD ACADEMY
            </div>

            <h1
              style={{
                fontFamily: fontDisplay,
                fontSize: "clamp(25px, 4vw, 34px)",
                lineHeight: 1.2,
                margin: "0 0 10px",
                fontWeight: 750
              }}
            >
              Welcome, Parent!
            </h1>

            <p
              style={{
                color: "#DBEAFE",
                margin: 0,
                fontSize: 14,
                lineHeight: 1.7,
                maxWidth: 450
              }}
            >
              Stay connected with your children's learning journey,
              academic progress and achievements.
            </p>

            <div
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                marginTop: 24,
                fontSize: 13,
                color: "#FFFFFF"
              }}
            >
              <CalendarDays size={16} />
              Academic Year 2026–27
            </div>
          </div>
        </section>

        {/* Summary cards */}


        {/* Children heading */}
        <section>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 18
            }}
          >
            <span
              style={{
                padding: "7px 12px",
                borderRadius: 20,
                background: "#E0E7FF",
                color: "#3730A3",
                fontSize: 12,
                fontWeight: 700
              }}
            >
              {students.length} {students.length === 1 ? "Student" : "Students"}
            </span>
          </div>

          {/* Student cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
              gap: 18
            }}
          >
            {students.map(student => {
              return (
                <Link
                  key={student.id}
                  to={`/student-details/${student.id}`}
                  style={{
                    display: "block",
                    textDecoration: "none",
                    color: "inherit",
                    background: C.paperCard || "#FFFFFF",
                    border: `1px solid ${C.line}`,
                    borderRadius: 18,
                    padding: 20,
                    boxShadow: "0 3px 12px rgba(15,23,42,0.035)",
                    transition: "transform .2s ease, box-shadow .2s ease"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 25px rgba(15,23,42,0.09)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 3px 12px rgba(15,23,42,0.035)";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      marginBottom: 20
                    }}
                  >
                    <div
                      style={{
                        width: 58,
                        height: 58,
                        flexShrink: 0,
                        borderRadius: 17,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: `${student.color || "#4F46E5"}15`,
                        color: student.color || "#4F46E5",
                        fontFamily: fontDisplay,
                        fontSize: 20,
                        fontWeight: 800
                      }}
                    >
                      {initials(student.name)}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3
                        style={{
                          fontFamily: fontDisplay,
                          fontSize: 17,
                          fontWeight: 750,
                          color: C.ink,
                          margin: "0 0 7px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap"
                        }}
                      >
                        {student.name}
                      </h3>

                      <span
                        style={{
                          display: "inline-block",
                          fontSize: 12,
                          fontWeight: 650,
                          color: "#1D4ED8",
                          background: "#EFF6FF",
                          borderRadius: 6,
                          padding: "5px 8px"
                        }}
                      >
                        {formatClass(student.stdClass)}
                      </span>
                    </div>

                    <ChevronRight size={19} color={C.slate} />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderTop: `1px solid ${C.line}`,
                      paddingTop: 15,
                      marginBottom: 15
                    }}
                  >
                    <span style={{ color: C.slate, fontSize: 13 }}>
                      Roll Number
                    </span>

                    <strong style={{ color: C.ink, fontSize: 14 }}>
                      {student.roll ?? "—"}
                    </strong>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 8
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 650,
                        color: "#2563EB"
                      }}
                    >
                      View Profile →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Footer note */}
        <div
          style={{
            marginTop: 30,
            padding: "15px 17px",
            borderRadius: 12,
            background: "#EFF6FF",
            color: "#1E40AF",
            fontSize: 13,
            lineHeight: 1.6
          }}
        >
          <strong>Stay involved.</strong> Follow your children's progress
          and stay connected with Greenfield Academy.
        </div>
      </main>
    </div>
  );
}

function SummaryCard({ icon, label, value, color, background }) {
  return (
    <div
      style={{
        padding: 18,
        borderRadius: 16,
        background: C.paperCard || "#FFFFFF",
        border: `1px solid ${C.line}`,
        display: "flex",
        alignItems: "center",
        gap: 13
      }}
    >
      <div
        style={{
          width: 46,
          height: 46,
          flexShrink: 0,
          borderRadius: 13,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color,
          background
        }}
      >
        {icon}
      </div>

      <div>
        <div
          style={{
            fontSize: 12,
            color: C.slate,
            marginBottom: 5
          }}
        >
          {label}
        </div>

        <div
          style={{
            fontFamily: fontDisplay,
            fontSize: 24,
            fontWeight: 800,
            color: C.ink
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}
