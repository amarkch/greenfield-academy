import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useParams, Link } from "react-router-dom";
import { CheckCircle2, CircleDot, Circle, ArrowLeft, Mail, GraduationCap, BriefcaseBusiness, Users, ChevronDown, Loader2 } from "lucide-react";
import { C, fontDisplay, fontBody, fontMono, getRandomColor } from "../theme.js";
import "./FacultyDetail.css";
import GreenfieldHeaderBar from "../components/GreenfieldHeaderBar.jsx";

const host = "https://greenfield-academy-back-end.onrender.com";
//const host = "http://localhost:3000";

const statusMeta = {
  done: { icon: CheckCircle2, label: "Completed", bg: "#E6F4EA", color: "#137333" },
  current: { icon: CircleDot, label: "Q&A Discussion done", bg: "#FEF7E0", color: "#B06000" },
  pending: { icon: Circle, label: "Start this chapter", bg: "#777777", color: "#FFFFFF" },
  homeworkGiven: { icon: Circle, label: "Homework Given", bg: "#E8F0FE", color: "#1A73E8" },
  homeworkChecking: { icon: Circle, label: "Homework Checked", bg: "#FCE8E6", color: "#C5221F" },
  homeworkChecked: { icon: Circle, label: "Mark as Completed", bg: "#FEF7E0", color: "#137333" },
};
const statusMetaSequence = ["pending", "current", "homeworkGiven", "homeworkChecking", "homeworkChecked", "done"];
const statusMetaDisplaySequence = ["current", "homeworkGiven", "homeworkChecking", "homeworkChecked","pending",  "done"];
const sortElementsByStatus = (items, authorizedFor) => {
  // Use spread [...items] to avoid mutating the original state array directly
  return [...items].sort((a, b) => {
    if(!authorizedFor) return 1;
    const indexA = statusMetaDisplaySequence.indexOf(a.status);
    const indexB = statusMetaDisplaySequence.indexOf(b.status);

    // Fallback for any unknown status (puts them at the end)
    const positionA = indexA !== -1 ? indexA : statusMetaDisplaySequence.length;
    const positionB = indexB !== -1 ? indexB : statusMetaDisplaySequence.length;

    return positionA - positionB;
  });
};

function formatLabel(str) {
  if (!str) return "";
  return str
    .split("-")
    .map((word) => {
      if (/^[ivxlcdm]+$/i.test(word)) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

const getProgressValue = (done, total) => {
  if (!total || total <= 0) return 0;
  return Math.round((done / total) * 100);
};

function SubjectAccordion({ authorizedFor, period, isOpen, onToggle, onStatusChange, updatingChapterId }) {
  const periodProgress = getProgressValue(period.doneChaptersCount, period.totalChapters);
  
  return (
    <div style={{ 
      background: C.paperCard, 
      border: `1px solid ${C.line}`, 
      borderRadius: 12, 
      overflow: "hidden",
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
    }}>
      {/* Header Bar */}
      <div 
        onClick={onToggle}
        style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        cursor: "pointer",
        padding: "7px 10px",
        background: "#F4F8FA",
        borderBottom: isOpen ? `1px solid ${C.line}` : "none",
      }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 14,
            background: "transparent",
            border: "none",
            textAlign: "left",
            padding: 0
          }}
        >
          
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>
              {formatLabel(period.class)} &bull; <span style={{ fontWeight: 900, fontStyle: "italic" }}>{formatLabel(period.subject)}</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.slate, marginTop: 2 }}>{period.chapter}</div>
          </div>
        </div>

        {/* Student Roster Nav Link (Separate from toggle button) */}
        <div style={{ display: "flex" }}>
          <NavLink
            to={`/class/${period.class}`}
            title="View Class Students"
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: 8,
              background: isActive ? C.sky : "#fff",
              border: `1px solid ${C.line}`,
              color: isActive ? "#fff" : C.ink,
              textDecoration: "none",
              transition: "all 0.2s ease"
            })}
          >
            <Users size={16} />
          </NavLink>

          <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "flex-end" }}>
            <button 
              onClick={onToggle}
              style={{ background: "transparent", border: "none", cursor: "pointer", padding: 4, display: "flex" }}
            >
              <ChevronDown
                size={18}
                color={C.slate}
                style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Accordion Body */}
      {isOpen && (
        <div style={{ padding: "5px", background: "#fff", animation: "fadeIn 0.25s ease" }}>
          <div style={{ display: "flex", alignItems: "center", padding: "4px 0", justifyContent: "space-between" }}>
            <span style={{ fontFamily: fontMono, fontSize: 12, fontWeight: 600, color: C.slate, padding: "0 10px 0 0"}}>Completed: {periodProgress}% </span>
            <div style={{ width: "65%", height: 6, borderRadius: 999, background: "#F1F3F4", overflow: "hidden" }}>
              <div style={{ width: `${periodProgress}%`, height: "100%", borderRadius: 999, background: C.sky, transition: "width 0.3s ease" }} />
            </div>
            
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            { sortElementsByStatus(period.chapters, authorizedFor).map((ch, i) => {
              const meta = statusMeta[ch.status] || statusMeta.pending;
              const isUpdating = updatingChapterId === ch._id;
              
              return (
                <div
                  key={i}
                  className="chapter-row"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 12px",
                    borderRadius: 8,
                    background: i % 2 === 0 ? "#FAFBFC" : "#fff",
                    border: `1px solid ${C.line}`,
                    gap: 12
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
                    <span style={{ fontSize: 14, color: C.ink, fontWeight: 500 }}>
                      Ch: <strong style={{ fontWeight: 600 }}>{ch.title}</strong><br/>
                      {(ch.status == "current" || ch.status == "homeworkGiven") && <span style={{color: "red", fontSize: 12}}><i> (Chapter In progress...)</i></span>}
                      {ch.status == "homeworkChecking" && <span style={{color: "red", fontSize: 12}}><i> (Homework checking in progress...)</i></span>}
                      {ch.status == "homeworkChecked" && <span style={{color: "green", fontSize: 12}}><i> (Homework checking done)</i></span>}
                    </span>
                  </div>
                  {
                    authorizedFor &&
                    <div className="chapter-controls">
                    {isUpdating ? (
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minWidth: 140, gap: 6, padding: 6 }}>
                        <Loader2 size={14} className="animate-spin" color={C.slate} />
                        <span style={{ fontSize: 12, color: C.slate, fontWeight: 600 }}>Updating...</span>
                      </div>
                    ) : (
                      <button
                        disabled={ch.status === "done"}
                        onClick={() => onStatusChange(ch._id, ch.status, "next", ch.class, ch.title, ch.subject)}
                        style={{
                          padding: "6px 12px",
                          borderRadius: 6,
                          border: `1px solid ${C.line}`,
                          background: meta.bg,
                          color: meta.color,
                          fontFamily: fontBody,
                          fontWeight: 600,
                          fontSize: 12,
                          cursor: ch.status === "done" ? "default" : "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          transition: "opacity 0.2s"
                        }}
                      >
                        <span>{meta.label}</span>
                        {ch.status === "done" && (
                          <CheckCircle2 size={16} color="#137333" />
                        )}
                      </button>
                    )}
                  </div>
                }
                { 
                  !authorizedFor && ch.status === "done" ?
                  <button
                        disabled={true}
                        style={{
                          padding: "6px 12px",
                          borderRadius: 6,
                          border: `1px solid ${C.line}`,
                          background: meta.bg,
                          color: meta.color,
                          fontFamily: fontBody,
                          fontWeight: 600,
                          fontSize: 12,
                          cursor: "default",
                          width:"113px",
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          transition: "opacity 0.2s"
                        }}
                      >
                        <span>{meta.label}</span>
                        {ch.status === "done" && (
                          <CheckCircle2 size={16} color="#137333" />
                        )}
                      </button>
                      : !authorizedFor && <button
                          disabled={true}
                          style={{
                            padding: "6px 12px",
                            border: `0px solid #fff`,
                            fontFamily: fontBody,
                            backgroundColor: "#eee",
                            fontSize: 11,
                            color: ch.status == "pending" ? "#000" : "red",
                            cursor: "default",
                            width: "fit-content",
                            gap: 6,
                            transition: "opacity 0.2s"
                          }}
                        >
                          <span>
                            {ch.status == "pending" ? "Not Started" : null}
                            {ch.status == "current" ? "In progress" : null}
                            {ch.status == "homeworkGiven" ? "Homework Given to the students" : null}
                            {ch.status == "homeworkChecking" ? "Teacher checking homework" : null}
                            {ch.status == "homeworkChecked" ? "Chapter almost completed" : null}
                            
                          </span>
                          
                        </button>

                }

                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function FacultyDetail() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [periods, setPeriods] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);
  const [authorizedFor, setAuthorizedFor] = useState(null);
  const [updatingChapterId, setUpdatingChapterId] = useState(null);

  useEffect(() => {
    if(id=="masnnuklelhd") {
      localStorage.removeItem("teacherId", null);
    }
    setLoading(true);
    setAuthorizedFor(localStorage.getItem("teacherId") == id);
    reloadTheChapterDetails();
  }, [id]);

  const handleStatusChange = async (chapterId, status, direction, classId, title, sub) => {
    const currentStatus = status;
    const currentIndex = statusMetaSequence.indexOf(currentStatus);
    if (currentIndex === -1) return;

    let newIndex;
    if (direction === "next") {
      if (currentIndex === statusMetaSequence.length - 1) return;
      newIndex = currentIndex + 1;
    } else if (currentIndex !== 0) {
      newIndex = currentIndex - 1;
    } else {
      newIndex = currentIndex;
    }
    const newStatus = statusMetaSequence[newIndex];
    try {
      setUpdatingChapterId(chapterId);
      await fetch(`${host}/api/update-chapter-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chapterId: chapterId,
          chapterStatus: newStatus,
          classId: classId,
          title: title,
          subject: sub
        }),
      })
        .then((res) => res.json())
        .then(() => {
          reloadTheChapterDetails();
        });
    } catch (err) {
      console.error("Failed to update chapter status in backend:", err);
      setUpdatingChapterId(null);
    }
  };

  const reloadTheChapterDetails = () => {
    fetch(`${host}/api/get-teacher/${id}`)
      .then((res) => res.json())
      .then(({ data }) => {
        setTeacher(data.teacher);
        setPeriods(data.periods);
        if (data?.periods && data.periods.length > 0 && openId === null) {
          setOpenId(data.periods[0].class + "-" + data.periods[0].subject);
        }
        setLoading(false);
        setUpdatingChapterId(null);
      })
      .catch((err) => {
        console.error("Failed to fetch teacher data:", err);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          gap: 12,
          color: C.ink,
          fontSize: 15,
          fontWeight: 600,
        }}
      >
        <Loader2 size={32} className="animate-spin" color={C.sky} />
        <span>Loading faculty details...</span>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div style={{ padding: 24, textAlign: "center" }}>
        <p style={{ color: C.ink, fontSize: 15, marginBottom: 12 }}>We couldn't find that faculty member.</p>
        <Link to="/faculty" style={{ fontWeight: 600, color: C.sky, textDecoration: "none" }}>&larr; Back to Faculty</Link>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", maxWidth: 900, margin: "0 auto", paddingBottom: 40 }}>
      <GreenfieldHeaderBar />
      
      {/* Teacher Profile Header Card */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        marginTop: 70,
        padding: 24,
        background: C.paperCard,
        border: `1px solid ${C.line}`,
        borderRadius: 16,
        boxShadow: "0 2px 6px rgba(0,0,0,0.03)"
      }}>
        <div
          style={{
            width: 84,
            height: 84,
            borderRadius: 14,
            background: "#F0F4F8",
            overflow: "hidden",
            flexShrink: 0,
            border: `1px solid ${C.line}`
          }}
        >
          <img 
            style={{ width: "100%", height: "100%", objectFit: "cover" }} 
            src={`/images/${teacher._id}.png`} 
            alt={teacher.name}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <h1 style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 22, color: C.ink, margin: 0 }}>{teacher.name}</h1>
          <div style={{ fontSize: 14, color: C.slate, fontWeight: 600, marginTop: 2 }}>{teacher.qualification} &bull; <span style={{ color: C.sky }}>{teacher.subject}</span></div>
          
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 10, fontSize: 13, color: C.ink, fontWeight: 500 }}>
            {teacher.classTeacherOf && (
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <GraduationCap size={15} color={C.slate} />
                <span>Class Teacher: <strong>{teacher.classTeacherOf.split("-")[1]}</strong></span>
              </div>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Mail size={15} color={C.slate} />
              <span>{teacher.email}</span>
            </div>
            {teacher.phone && (
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span>Phone: {teacher.phone}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Periods / Chapters Section */}
      <div style={{ marginTop: 24 }}>
        <h3 style={{ fontFamily: fontDisplay, fontSize: 18, color: C.ink, marginBottom: 12 }}>Assigned Classes & Syllabi</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {periods?.map((s) => (
            <SubjectAccordion
              authorizedFor={authorizedFor}
              key={`${s.class}-${s.subject}`}
              period={s}
              isOpen={openId === `${s.class}-${s.subject}`}
              onToggle={() => setOpenId(openId === `${s.class}-${s.subject}` ? null : `${s.class}-${s.subject}`)}
              onStatusChange={handleStatusChange}
              updatingChapterId={updatingChapterId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}