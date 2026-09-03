import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useParams, Link } from "react-router-dom";
import { CheckCircle2, CircleDot, Circle, ArrowLeft, Mail, GraduationCap, BriefcaseBusiness, ChevronDown } from "lucide-react";
import { C, fontDisplay, fontBody, fontMono, getRandomColor } from "../theme.js";

const statusMeta = {
  done: { icon: CheckCircle2, label: "Completed" },
  current: { icon: CircleDot, label: "In progress" },
  pending: { icon: Circle, label: "Not started" },
  homeworkGiven: { icon: Circle, label: "Not started" },
  homeworkChecking: { icon: Circle, label: "Not started" },
};
const statusMetaSequence = ["pending", "current", "homeworkGiven", "homeworkChecking", "done"];

function initials(name) {
  return name.replace(/^(Mr\.|Mrs\.|Ms\.)\s*/, "").split(" ").map((w) => w[0]).join("").slice(0, 3);
}

function SubjectAccordion({ subject, isOpen, onToggle, onStatusChange }) {
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
          <div style={{ fontFamily: fontDisplay, fontSize: 16, color: C.ink }}>[Class: {subject.class}] {subject.subject}</div>
          <div style={{ fontFamily: fontBody, fontSize: 12, color: C.slate, marginTop: 2 }}>{subject.chapter}</div>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", border: "solid 1px #aaa", borderRadius: "5px", gap: 4 }}>
          <NavLink
            to={`/students`}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 12px",
              borderRadius: 10,
              textDecoration: "none",
              fontFamily: fontBody,
              fontWeight: 600,
              fontSize: 14,
              color: isActive ? "#fff" : C.ink,
              background: isActive ? C.ink : "transparent",
              position: "relative",
            })}
          >
            <span className="kaksha-nav-label">Students</span>
          </NavLink>
        </nav>
        <span style={{ fontFamily: fontMono, fontSize: 12, color: C.slate }}>{subject.progress}%</span>
        <ChevronDown
          size={18}
          color={C.slate}
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
        />
      </button>

      {isOpen && (
        <div style={{ padding: "0 20px 18px", animation: "fadeIn 0.25s ease", backgroundColor: "#eeeeee" }}>
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
                    color: ch.status === "pending" ? C.slate : C.ink,
                    flex: 1,
                  }}
                >
                  {ch.title}
                </span>
                <button
                  onClick={() => onStatusChange(ch._id, ch.status, "prev")}
                  style={{
                    padding: "7px 14px",
                    borderRadius: 999,
                    border: `1px solid ${C.line}`,
                    background: C.paperCard,
                    color: C.ink,
                    fontFamily: fontBody,
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  &lt;{ch.id}{ch.status}
                </button>
                <span style={{ fontFamily: fontBody, fontSize: 11, color: activeColor, fontWeight: 600, minWidth: 80, textAlign: "center" }}>{meta.label}</span>
                <button
                  onClick={() => onStatusChange(ch._id, ch.status, "next")}
                  style={{
                    padding: "7px 14px",
                    borderRadius: 999,
                    border: `1px solid ${C.line}`,
                    background: C.paperCard,
                    color: C.ink,
                    fontFamily: fontBody,
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  &gt;
                </button>
              </div>
            );
          })}
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

   useEffect(() => {
    setLoading(true);
    relodTheChapterDetails();
  }, [id]);

  const handleStatusChange = async (chapterId, status, direction) => {
    const currentStatus = status;
    const currentIndex = statusMetaSequence.indexOf(currentStatus);
    console.log(chapterId);
    if (currentIndex === -1) return;

    let newIndex;
    if (direction === "next" || currentIndex != statusMetaSequence.length()-1) {
      newIndex = (currentIndex + 1);
    } else if(currentIndex != 0){
      newIndex = (currentIndex - 1);
    }
    const newStatus = statusMetaSequence[newIndex];
    
    try {
      // Dummy API call simulation
      await fetch(`http://localhost:3000/api/update-chapter-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chapterId: chapterId, chapterStatus: newStatus }),
      }).then(res => res.json())
      .then(() => {
        relodTheChapterDetails();
      });
      
      
    } catch (err) {
      console.error("Failed to update chapter status in backend:", err);
    }
  };
  const relodTheChapterDetails = () => {
  fetch(`https://greenfield-academy-back-end.onrender.com/api/get-teacher/${id}`)
      .then((res) => res.json())
      .then(({ data }) => {
       
          setTeacher(data.teacher);
          setPeriods(data.periods);
          
          if (data?.periods && data.periods.length > 0) {
            setOpenId(data.periods[0].id);
          }
          setLoading(false);
        
      })
      .catch((err) => {
        console.error("Failed to fetch teacher data:", err);
      });

}
  if (loading) {
    return (
      <div style={{ animation: "fadeIn 0.4s ease", fontFamily: fontBody, color: C.ink, fontSize: 15 }}>
        Loading faculty details...
      </div>
    );
  }

  if (!teacher) {
    return (
      <div style={{ animation: "fadeIn 0.4s ease" }}>
        <p style={{ fontFamily: fontBody, color: C.ink, fontSize: 15 }}>We couldn't find that faculty member.</p>
        <Link to="/faculty" style={{ fontFamily: fontBody, fontWeight: 600, color: C.ink }}>← Back to Faculty</Link>
      </div>
    );
  }

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <Link
        to="/faculty"
        style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: fontBody, fontWeight: 600, fontSize: 13, color: C.slate, textDecoration: "none", marginBottom: 20 }}
      >
        <ArrowLeft size={15} /> Back to Faculty
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 26 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            background: `${getRandomColor()}22`,
            color: teacher.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: fontDisplay,
            fontWeight: 700,
            fontSize: 24,
            flexShrink: 0,
          }}
        >
          {initials(teacher.name)}
        </div>
        <div>
          <h1 style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 24, color: C.ink, margin: 0 }}>{teacher.name}</h1>
          <p style={{ fontFamily: fontBody, fontSize: 14, color: teacher.color, fontWeight: 600, margin: "4px 0 0" }}>{teacher.subject}</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 24 }}>
        <div style={{ background: C.paperCard, border: `1px solid ${C.line}`, borderRadius: 14, padding: 16, display: "flex", gap: 10, alignItems: "flex-start" }}>
          <GraduationCap size={18} color={C.slate} style={{ marginTop: 2 }} />
          <div>
            <div style={{ fontFamily: fontBody, fontSize: 12, color: C.slate }}>Qualification</div>
            <div style={{ fontFamily: fontBody, fontSize: 14, color: C.ink, fontWeight: 600, marginTop: 2 }}>{teacher.qualification}</div>
          </div>
        </div>
        <div style={{ background: C.paperCard, border: `1px solid ${C.line}`, borderRadius: 14, padding: 16, display: "flex", gap: 10, alignItems: "flex-start" }}>
          <BriefcaseBusiness size={18} color={C.slate} style={{ marginTop: 2 }} />
          <div>
            <div style={{ fontFamily: fontBody, fontSize: 12, color: C.slate }}>Phone</div>
            <div style={{ fontFamily: fontBody, fontSize: 14, color: C.ink, fontWeight: 600, marginTop: 2 }}>{teacher.phone}</div>
          </div>
        </div>
        <div style={{ background: C.paperCard, border: `1px solid ${C.line}`, borderRadius: 14, padding: 16, display: "flex", gap: 10, alignItems: "flex-start" }}>
          <Mail size={18} color={C.slate} style={{ marginTop: 2 }} />
          <div>
            <div style={{ fontFamily: fontBody, fontSize: 12, color: C.slate }}>Email</div>
            <div style={{ fontFamily: fontBody, fontSize: 14, color: C.ink, fontWeight: 600, marginTop: 2 }}>{teacher.email}</div>
          </div>
        </div>
      </div>

      <div style={{ background: C.paperCard, border: `1px solid ${C.line}`, borderRadius: 16, padding: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {periods?.map((s) => (
            <SubjectAccordion
              key={`${s.class}-${s.subject}`}
              subject={s}
              isOpen={openId === `${s.class}-${s.subject}`}
              onToggle={() => setOpenId(openId === `${s.class}-${s.subject}` ? null : `${s.class}-${s.subject}`)}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}