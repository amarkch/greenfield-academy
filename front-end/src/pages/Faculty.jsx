import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Loader2,
  AlertCircle,
  Trash2
} from "lucide-react";

import {
  C,
  fontDisplay,
  fontBody,
  getRandomColor
} from "../theme.js";

import GreenfieldHeaderBar from "../components/GreenfieldHeaderBar.jsx";

function initials(name) {
  return name.replace(/^(Mr\.|Mrs\.|Ms\.)\s*/, "").split(" ").map((w) => w[0]).join("").slice(0, 3);
}

export default function Faculty() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [whoIs, setWhoIs] = useState(window.localStorage.getItem("teacherId"));

  useEffect(() => {
    async function fetchFaculty() {
      try {
        setLoading(true);
        const response = await fetch("https://greenfield-academy-ipqx.onrender.com/api/get-teachers-list"); // Replace with your actual API endpoint
        
      if (!response.ok) {
          throw new Error("Failed to fetch faculty list");
        }
        const data = await response.json();
        setFaculty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchFaculty();
  }, []);
  const deleteFaculty = async (id, name) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${name}?\n\n` +
      "The faculty record will be retained in the database."
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `https://greenfield-academy-ipqx.onrender.com/api/delete-faculty/${id}`,
        {
          method: "PATCH"
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete faculty");
      }

      // Remove the faculty member from the current list.
      setFaculty((previousFaculty) =>
        previousFaculty.filter((f) => f._id !== id)
      );

    } catch (error) {
      console.error("Error deleting faculty:", error);
      alert(error.message);
    }
  };
  return (
    <div style={{ position: "relative" }}>
      <GreenfieldHeaderBar />
      <div style={{ marginBottom: 10, marginTop: 50, paddingTop: 20 }}>
        <h1 style={{ fontFamily: "'Bentham', serif", fontWeight: 700, fontSize: 26, color: C.ink, margin: "4px 0 0" }}>Teachers list</h1>
      </div>

      {loading && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 0", color: C.slate, fontFamily: fontBody, gap: 8 }}>
          <Loader2 className="animate-spin" size={20} />
          <span>Loading faculty...</span>
        </div>
      )}

      {error && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 16, background: "#fee2e2", border: "1px solid #fecaca", borderRadius: 12, color: "#991b1b", fontFamily: fontBody, fontSize: 14 }}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 7
          }}
        >
          {faculty.map((f) => (
            <div
              key={f._id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: 14,
                background: C.paperCard,
                border: `1px solid ${C.line}`,
                borderRadius: 16
              }}
            >
              {/* Faculty profile: clicking navigates to the profile */}
              <Link
                to={`/faculty/${f._id}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  flex: 1,
                  minWidth: 0,
                  textDecoration: "none"
                }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 12,
                    background: `${f.color || getRandomColor()}22`,
                    color: f.color || C.slate,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    overflow: "hidden"
                  }}
                >
                  <img
                    src={`/images/${f._id}.png`}
                    alt={f.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: 6
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: fontBody,
                      fontWeight: 700,
                      fontSize: 14,
                      color: C.ink
                    }}
                  >
                    {f.name}
                  </div>

                  {f.classTeacherOf && (
                    <div
                      style={{
                        fontFamily: fontBody,
                        fontWeight: 700,
                        fontSize: 12,
                        color: C.ink
                      }}
                    >
                      Class Teacher: {f.classTeacherOf.split("-")[1]}
                    </div>
                  )}

                  <div
                    style={{
                      fontFamily: fontBody,
                      fontSize: 12,
                      color: C.slate,
                      marginTop: 2,
                      overflowWrap: "anywhere"
                    }}
                  >
                    {f.email}
                    <br />
                    Phone: {f.phone}
                  </div>
                </div>

                <ChevronRight size={16} color={C.slate} />
              </Link>

              {/* Soft-delete button */}
              {

                (whoIs == "6ac67597fc864121be000322" || whoIs == "6a98284f551b3fd1d79b4317") &&
              <button
                type="button"
                title={`Delete ${f.name}`}
                aria-label={`Delete ${f.name}`}
                onClick={() => deleteFaculty(f._id, f.name)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                  flexShrink: 0,
                  border: "1px solid #fecaca",
                  borderRadius: 10,
                  background: "#fef2f2",
                  color: "#dc2626",
                  cursor: "pointer"
                }}
              >
                <Trash2 size={17} />
              </button>
            }
            </div>
          ))}

          {faculty.length === 0 && (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: 30,
                color: C.slate,
                fontFamily: fontBody
              }}
            >
              No teacher found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}