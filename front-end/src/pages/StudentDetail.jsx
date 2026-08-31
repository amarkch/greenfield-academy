import React, { useState } from "react";
import { ClipboardList, CalendarDays, AlertTriangle, Megaphone } from "lucide-react";
import { C, fontDisplay, fontBody } from "../theme.js";
import { notifications as initialNotifications } from "../data/mockData.js";

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

export default function StudentDetail() {
  const [items, setItems] = useState(initialNotifications);
  const [filter, setFilter] = useState("all");

  const visible = filter === "all" ? items : items.filter((n) => n.type === filter);
  const markRead = (id) => setItems(items.map((n) => (n.id === id ? { ...n, read: true } : n)));

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontFamily: fontBody, color: C.slate, fontSize: 14, margin: 0 }}>Aarav Sharma · Class VIII-B</p>
        <h1 style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 26, color: C.ink, margin: "4px 0 0" }}>Student's Detail</h1>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            style={{
              padding: "7px 14px",
              borderRadius: 999,
              border: `1px solid ${filter === f.id ? C.ink : C.line}`,
              background: filter === f.id ? C.ink : C.paperCard,
              color: filter === f.id ? "#fff" : C.ink,
              fontFamily: fontBody,
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {visible.map((n) => {
          const meta = typeMeta[n.type];
          const Icon = meta && meta.icon;
          
          if(meta !== undefined)
          return (
            <button
              key={n.id}
              onClick={() => markRead(n.id)}
              style={{
                display: "flex",
                gap: 14,
                textAlign: "left",
                padding: 16,
                background: C.paperCard,
                border: `1px solid ${n.read ? C.line : meta.color}`,
                borderRadius: 14,
                cursor: n.read ? "default" : "pointer",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: `${meta.color}1A`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon size={17} color={meta.color} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: fontBody, fontWeight: 700, fontSize: 14, color: C.ink }}>{n.title}</span>
                  {!n.read && <span style={{ width: 7, height: 7, borderRadius: 999, background: meta.color, flexShrink: 0 }} />}
                </div>
                <p style={{ fontFamily: fontBody, fontSize: 13, color: C.slate, margin: "4px 0 0" }}>{n.message}</p>
                <span style={{ fontFamily: fontBody, fontSize: 11, color: C.slate, opacity: 0.8 }}>{n.date}</span>
              </div>
              <button>
                Submitted
              </button>
            </button>
          );
          else return <div></div>;
          

        })}

        {visible.length === 0 && (
          <div style={{ textAlign: "center", padding: 40, fontFamily: fontBody, color: C.slate, fontSize: 14 }}>
            Nothing here for this filter.
          </div>
        )}
      </div>
    </div>
  );
}
