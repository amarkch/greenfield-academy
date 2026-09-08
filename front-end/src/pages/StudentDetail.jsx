import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ClipboardList, CalendarDays, AlertTriangle, Megaphone } from "lucide-react";
import { C, fontDisplay, fontBody } from "../theme.js";

const typeMeta = {
  assignment: { icon: ClipboardList, color: C.marigold, label: "Assignment" },
  marks: { icon: CalendarDays, color: C.sky, label: "Event" },
  feedback: { icon: AlertTriangle, color: C.coral, label: "Alert" },
  taskCompletion: { icon: AlertTriangle, color: C.coral, label: "Alert" }
};

const filters = [
  { id: "all", label: "All" },
  { id: "assignment", label: "Assignments" },
  { id: "marks", label: "Marks" },
  { id: "feedback", label: "Feedback" },
  { id: "taskCompletion", label: "Task Completion" },
];
const host = "https://greenfield-academy-back-end.onrender.com";
//const host = "http://localhost:3000";

export default function StudentDetail() {
  const { studentId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(`${host}/api/student-notifications/${studentId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch notifications");
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setItems(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [studentId]);

  const visible = filter === "all" ? items : items.filter((n) => n.type === filter);
  const markRead = (id) => setItems(items.map((n) => (n.id === id ? { ...n, read: true } : n)));

  return (
    <div style={{ animation: "fadeIn 0.4s ease", width: "100%", boxSizing: "border-box", padding: "10px 20px" }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontFamily: fontBody, color: C.slate, fontSize: 13, margin: 0 }}>Aarav Sharma · Class VIII-B</p>
        <h1 style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: "clamp(22px, 5vw, 26px)", color: C.ink, margin: "4px 0 0" }}>
          Student's Detail
        </h1>
      </div>

      {/* Filters: Horizontal scrollable/wrappable on mobile */}
      <div 
        style={{ 
          display: "flex", 
          gap: 8, 
          marginBottom: 20, 
          flexWrap: "wrap",
          overflowX: "auto",
          paddingBottom: 4 
        }}
      >
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              border: `1px solid ${filter === f.id ? C.ink : C.line}`,
              background: filter === f.id ? C.ink : C.paperCard,
              color: filter === f.id ? "#fff" : C.ink,
              fontFamily: fontBody,
              fontWeight: 600,
              fontSize: 12,
              cursor: "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {loading && (
          <div style={{ textAlign: "center", padding: 40, fontFamily: fontBody, color: C.slate, fontSize: 14 }}>
            Loading notifications...
          </div>
        )}

        {error && (
          <div style={{ textAlign: "center", padding: 40, fontFamily: fontBody, color: C.coral, fontSize: 14 }}>
            Error: {error}
          </div>
        )}

        {!loading && !error && visible.map((n) => {
          const meta = typeMeta[n.type];
          const Icon = meta && meta.icon;
          
          if (meta !== undefined) {
            return (
              <div
                key={n.id}
                onClick={() => markRead(n.id)}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 12,
                  textAlign: "left",
                  padding: "14px",
                  background: C.paperCard,
                  border: `1px solid ${n.read ? C.line : meta.color}`,
                  borderRadius: 14,
                  cursor: n.read ? "default" : "pointer",
                  position: "relative",
                  width: "100%",
                  boxSizing: "border-box"
                }}
              >
                {/* Main Content Group */}
                <div style={{ display: "flex", gap: 12, flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 10,
                      background: `${meta.color}1A`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={16} color={meta.color} />
                  </div>
                  
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: fontBody, fontWeight: 700, fontSize: 13, color: C.ink, wordBreak: "break-word" }}>
                        {n.title}
                      </span>
                      {!n.read && (
                        <span style={{ width: 6, height: 6, borderRadius: 999, background: meta.color, flexShrink: 0 }} />
                      )}
                    </div>
                    <p style={{ fontFamily: fontBody, fontSize: 12, color: C.slate, margin: "4px 0 0", wordBreak: "break-word" }}>
                      {n.message}
                    </p>
                    <span style={{ fontFamily: fontBody, fontSize: 11, color: C.slate, opacity: 0.8, display: "block", marginTop: 4 }}>
                      {n.date}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  style={{
                    padding: "5px 10px",
                    fontSize: 11,
                    fontFamily: fontBody,
                    fontWeight: 600,
                    background: "transparent",
                    border: `1px solid ${C.line}`,
                    borderRadius: 8,
                    cursor: "pointer",
                    color: C.ink,
                    flexShrink: 0,
                    alignSelf: "center"
                  }}
                >
                  Submitted
                </button>
              </div>
            );
          } else {
            return null;
          }
        })}

        {!loading && !error && visible.length === 0 && (
          <div style={{ textAlign: "center", padding: 40, fontFamily: fontBody, color: C.slate, fontSize: 14 }}>
            Nothing here for this filter.
          </div>
        )}
      </div>
    </div>
  );
}