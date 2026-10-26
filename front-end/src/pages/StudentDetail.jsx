import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ClipboardList, CalendarDays, AlertTriangle, Megaphone, Star } from "lucide-react";
import { C, fontDisplay, fontBody } from "../theme.js";
import GreenfieldHeaderBar from "../components/GreenfieldHeaderBar.jsx";

const typeMeta = {
  assignment: { icon: ClipboardList, color: C.marigold, label: "Assignment" },
  marks: { icon: CalendarDays, color: C.sky, label: "Event" },
  remarksFromHigherAuthority: { icon: CalendarDays, color: C.sky, label: "Event" },
};

const filters = [
  { id: "all", label: "All" },
  { id: "assignment", label: "Assignments" },
  { id: "marks", label: "Marks" },
  { id: "remarks", label: "Remarks" }
];
const host = "https://greenfield-academy-ipqx.onrender.com";
//const host = "http://localhost:3000";

export default function StudentDetail() {
  const { studentId } = useParams();
  const [items, setItems] = useState([]);
  const [whoIs, setWhoIs] = useState(window.localStorage.getItem("teacherId"));
  const [studentsData, setStudentsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [showRemarkForm, setShowRemarkForm] = useState(false);
  const [remark, setRemark] = useState("");
  const [remarkSubmitting, setRemarkSubmitting] = useState(false);
  const [remarkMessage, setRemarkMessage] = useState("");
  
  const displayMarksCategory = (cat) => {
    return <span style={{fontSize: "16px", color: cat == "Good" ? "green" :  cat == "Fail" ? "red" : "black" }}> - {cat}</span>
  }
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
          setItems(data.notifications);
          setStudentsData(data.student);
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
  
  const handleStatusChange = async (notificationId, newStatus) => {
    try {
      const response = await fetch(`${host}/api/change-notification-status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id: notificationId, 
          status: newStatus 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update notification status');
      }

      const data = await response.json();
      console.log('Status updated successfully:', data);
      
      // Update local state so the UI updates immediately
      setItems(items.map((n) => (n._id === notificationId ? { ...n, status: newStatus } : n)));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleRemarkSubmit = async (e) => {
    e.preventDefault();
    const trimmedRemark = remark.trim();
    if (!trimmedRemark) {
      setRemarkMessage("Please enter a remark.");
      return;
    }

    setRemarkSubmitting(true);
    setRemarkMessage("");

    try {
      const response = await fetch(`${host}/api/student-remark`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          remark: trimmedRemark
        })
      });

      if (!response.ok) {
        throw new Error("Failed to save remark.");
      }

      setRemark("");
      setShowRemarkForm(false);
      setRemarkMessage("Remark saved successfully.");
    } catch (err) {
      setRemarkMessage(err.message || "Unable to save remark.");
    } finally {
      setRemarkSubmitting(false);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <GreenfieldHeaderBar />
      <div style={{ marginBottom: 20,  marginTop: 70, fontFamily: "'Bentham', serif", display: "flex", alignItems: "center"}}>
        <div style={{width: "100px", height: "100px", float: "left"}}>
          {studentsData.gender ? <img src={studentsData.gender == "male" ? `/images/ma.png` : `/images/fe.png`} style={{width: "100%", height: "100%"}} /> : <span>Image</span>}
        </div>
        <div style={{float: "right", padding: "12px"}}>
          <h1 style={{fontWeight: 700, fontSize: "clamp(22px, 5vw, 26px)", color: C.ink, margin: "4px 0 0" }}>
            {studentsData.name}
          </h1>
          <h3>Class: {studentsData.className} </h3>
          <h3>Roll: {studentsData.rollNumber} </h3>
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {[1, 2, 3, 4, 5].map((star) => {
              const rating = studentsData.rating || 0;
              const filled = star <= rating;
              return (
                <Star
                  key={star}
                  size={20}
                  fill={filled ? "#F59E0B" : "transparent"}
                  color={filled ? "#F59E0B" : "#D1D5DB"}
                />
              );
            })}
          </div>
        </div>

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
      {
        (whoIs == "6ac67597fc864121be000322" || whoIs == "6a98284f551b3fd1d79b4317") &&
        <div style={{ display: "flex", flexDirection: "column", padding: "10px 0" }}>

        <span style={{color: "red", fontSize: 12, padding: "5px 0"}}><i>(Only higher authority can add remark)</i></span>
        <div style={{ display: "flex" }}>
        <button
          type="button"
          onClick={() => {
            setShowRemarkForm((shown) => !shown);
            setRemarkMessage("");
          }}
          style={{
            width: "150px",
            padding: "8px 12px",
            border: `1px solid ${C.line}`,
            borderRadius: 8,
            background: "Red",
            color: "white",
            fontFamily: fontBody,
            fontWeight: 600,
            cursor: "pointer",
            
          }}
        >
          {showRemarkForm ? "Cancel" : "Add Remark"}
        </button>
        {showRemarkForm && <button
              type="submit"
              disabled={remarkSubmitting}
              style={{
                width: "150px",
                padding: "8px 12px",
                border: "none",
                borderRadius: 8,
                background: C.ink,
                color: "#fff",
                fontFamily: fontBody,
                fontWeight: 600,
                cursor: remarkSubmitting ? "wait" : "pointer",
                opacity: remarkSubmitting ? 0.7 : 1
              }}
            >
              {remarkSubmitting ? "Saving..." : "Save Remark"}
            </button>
          }
          </div>
        {showRemarkForm && (
          <form
            onSubmit={handleRemarkSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              marginTop: 10,
              minWidth: 220
            }}
          >
            <textarea
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="Enter student remark..."
              rows={3}
              required
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: 10,
                border: `1px solid ${C.line}`,
                borderRadius: 8,
                fontFamily: fontBody,
                fontSize: 13,
                resize: "vertical"
              }}
            />
            
          </form>
        )}
        {remarkMessage && (
          <p role="status" style={{ fontFamily: fontBody, fontSize: 12, marginTop: 8, color: remarkMessage.includes("successfully") ? "green" : "red" }}>
            {remarkMessage}
          </p>
        )}
      </div>
      }
      
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
                      <span style={{ fontFamily: fontBody, fontWeight: 500, fontSize: 14, color: C.ink, wordBreak: "break-word" }}>
                        {n.title} {n.type == "marks" ? displayMarksCategory(n.marksCategory) : ""}
                      </span>
                      
                    </div>
                    <p style={{ fontWeight: 700, fontFamily: fontBody, fontSize: 15, color: C.slate, margin: "4px 0 0", wordBreak: "break-word" }}>
                      Chapter: <i>{n.message}</i>
                    </p>
                    <span style={{ fontFamily: fontBody, fontSize: 11, color: C.slate, opacity: 0.8, display: "block", marginTop: 4 }}>
                      {n.date}
                    </span>
                  </div>
                </div>

                {/* Action Button or Green Checkmark */}
                {n.status === "done" ? (
                  <span
                    style={{
                      padding: "5px 10px",
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#22c55e",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      alignSelf: "center"
                    }}
                  >
                    {n.type == "marks" ? "Viewed by Parents" : "Done"}  ✓
                  </span>
                ) : whoIs !=null && (n.teacherId == null || whoIs == n.teacherId) ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusChange(n._id, 'done');
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
                    {n.type == "marks" ? "Viewed by Parents" : "Received"}
                  </button>
                ) : null}
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