import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useParams, Link } from "react-router-dom";
import { CheckCircle2, CircleDot, Circle, ArrowLeft, Mail, GraduationCap, BriefcaseBusiness, Users, ChevronDown, Loader2 } from "lucide-react";
import { C, fontDisplay, fontBody, fontMono, getRandomColor } from "../theme.js";
import "./FacultyDetail.css";
import GreenfieldHeaderBar from "../components/GreenfieldHeaderBar.jsx";

const host = "https://greenfield-academy-back-end.onrender.com";
//const host = "http://localhost:3000";

const statusMeta = {
  done: { icon: CheckCircle2, label: "Completed" },
  current: { icon: CircleDot, label: "In progress" },
  pending: { icon: Circle, label: "Not started" },
  homeworkGiven: { icon: Circle, label: "Homework Given" },
  homeworkChecking: { icon: Circle, label: "Homework Checking" },
};
const statusMetaSequence = ["pending", "current", "homeworkGiven", "homeworkChecking", "done"];

function initials(name) {
  return name.replace(/^(Mr\.|Mrs\.|Ms\.)\s*/, "").split(" ").map((w) => w[0]).join("").slice(0, 3);
}
function formatLabel(str) {
  if (!str) return "";
  return str
    .split("-")
    .map((word) => {
      // Keep roman numerals fully capitalized (e.g., vii -> VII)
      if (/^[ivxlcdm]+$/i.test(word)) {
        return word.toUpperCase();
      }
      // Capitalize standard words
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}
const getProgressValue = (done, total) => {
  if (!total || total <= 0) return 0;
  return Math.round((done / total) * 100);
};
function SubjectAccordion({ period, isOpen, onToggle, onStatusChange, updatingChapterId }) {
  const periodProgreess = getProgressValue(period.doneChaptersCount, period.totalChapters);
  return (
    <div style={{ marginBottom: "20px", background: C.paperCard, border: `1px solid ${C.line}`, borderRadius: 16, overflow: "hidden" }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "16px 20px",
          background: "#CFECF3",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <div style={{ width: 10, height: 10, borderRadius: 999, background: C.sky, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 900 }}>{formatLabel(period.class)}<br/><i>{formatLabel(period.subject)}</i></div>
          <div style={{ fontSize: 12, fontWeight: 900, marginTop: 2 }}>{period.chapter}</div>
        </div>
        <nav style={{ background: "#fff", display: "flex", flexDirection: "column", border: "solid 1px #aaa", borderRadius: "5px", gap: 4 }}>
          <NavLink
            to={`/students/${period.class}`}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 12px",
              borderRadius: 10,
              textDecoration: "none",
              fontFamily: fontBody,
              fontWeight: 600,
              fontSize: 14,
              color: isActive ? "#fff" : C.ink,
              position: "relative",
            })}
          >
            <Users size={16} />
          </NavLink>
        </nav>
        <span style={{ fontFamily: fontMono, fontSize: 12, color: C.slate }}>{periodProgreess}%</span>
        <ChevronDown
          size={18}
          color={C.slate}
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
        />
      </button>

      {isOpen && (
        <div style={{ padding: "0 20px 18px", animation: "fadeIn 0.25s ease", background: "#F9DFDF" }}>
          <div style={{ height: 8, borderRadius: 999, background: C.paperCard, border: `1px solid ${C.line}`, marginBottom: 16 }}>
            <div style={{ width: `${periodProgreess}%`, height: "100%", borderRadius: 999, background: C.sky }} />
          </div>
          {period.chapters.map((ch, i) => {
            const meta = statusMeta[ch.status];
            const Icon = meta.icon;
            const activeColor = ch.status === "done" ? C.mint : ch.status === "current" ? C.coral : ch.status === "pending" ? "#000" : "red";
            const isUpdating = updatingChapterId === ch._id;
            return (
              <div
                key={i}
                className="chapter-row"
                style={{
                  borderTop: i === 0 ? "none" : `1px solid ${C.line}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
                  <Icon size={16} color={activeColor} />
                  <span
                    style={{
                      fontFamily: fontBody,
                      fontSize: 13,
                      color: activeColor,
                      fontWeight: ch.status == "pending" ? 500 : 800,
                    }}
                  >
                    Ch[{i+1}]: {ch.title}
                  </span>
                </div>

                <div className="chapter-controls">
                  {isUpdating ? (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minWidth: 160, gap: 6 }}>
                      <Loader2 size={16} className="animate-spin" color={C.slate} />
                      <span style={{ fontSize: 12, color: C.slate, fontWeight: 600 }}>Updating...</span>
                    </div>
                  ) : (
                    <>
                      <button
                        disabled={ch.status === "pending"}
                        onClick={() => onStatusChange(ch._id, ch.status, "prev", ch.class, ch.title, ch.subject)}
                        style={{
                          padding: "7px 14px",
                          borderRadius: 9,
                          border: `1px solid ${C.line}`,
                          background: ch.status !== "pending" ? C.paperCard : null,
                          color: ch.status !== "pending" ? C.ink : null,
                          fontFamily: fontBody,
                          fontWeight: 600,
                          fontSize: 13,
                          cursor: "pointer",
                        }}
                      >
                        &lt;
                      </button>
                      <span style={{ fontFamily: fontBody, fontSize: 14, color: activeColor, fontWeight: ch.status == "pending" ? 500 : 800, minWidth: 80, textAlign: "center" }}>{meta.label}</span>
                      <button
                        disabled={ch.status === "done"}
                        onClick={() => onStatusChange(ch._id, ch.status, "next", ch.class, ch.title, ch.subject)}
                        style={{
                          padding: "7px 14px",
                          borderRadius: 9,
                          border: `1px solid ${C.line}`,
                          background: ch.status !== "done" ? C.paperCard : null,
                          color: ch.status !== "done" ? C.ink : null,
                          fontFamily: fontBody,
                          fontWeight: 600,
                          fontSize: 13,
                          cursor: "pointer",
                        }}
                      >
                        &gt;
                      </button>
                    </>
                  )}
                </div>
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
  const [updatingChapterId, setUpdatingChapterId] = useState(null);

  useEffect(() => {
    setLoading(true);
    relodTheChapterDetails();
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
          relodTheChapterDetails();
        });
    } catch (err) {
      console.error("Failed to update chapter status in backend:", err);
    }
  };

  const relodTheChapterDetails = () => {
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
          animation: "fadeIn 0.4s ease",
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
      <div style={{ animation: "fadeIn 0.4s ease" }}>
        <p style={{ color: C.ink, fontSize: 15, padding: 5 }}>We couldn't find that faculty member.</p>
        <Link to="/faculty" style={{ padding: 5, fontWeight: 600, color: C.ink }}>← Back to Faculty</Link>
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <GreenfieldHeaderBar />
      <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: "55px", padding: "20px 10px" }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            background: `${getRandomColor()}`,
            color: teacher.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 24,
            flexShrink: 0,
          }}
        >
          {initials(teacher.name)}
        </div>
        <div>
          <h1 style={{  fontWeight: 700, fontSize: 24, color: C.ink, margin: 0 }}>{teacher.name}</h1>
          <p style={{ fontSize: 14, color: teacher.color, fontWeight: 600, margin: "4px 0 0" }}>{teacher.subject}</p>
        </div>
      </div>
      <div style={{ padding: "10px" }}>
        <div>{teacher.qualification}</div>
        <div>{teacher.phone}</div>
        <div>{teacher.email}</div>
      </div>
      <div style={{padding: 5 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {periods?.map((s) => (
            <SubjectAccordion
              key={`${s.class}-${s.subject}`}
              period={s}
              isOpen={openId === `${s.class}-${s.subject}`}
              onToggle={() => setOpenId(`${s.class}-${s.subject}`)}
              onStatusChange={handleStatusChange}
              updatingChapterId={updatingChapterId}
            />
          ))}
        </div>
      </div>
      
    </div>
  );
}