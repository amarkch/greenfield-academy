import React, { useState, useEffect } from "react";
import {
  Loader2,
  AlertCircle,
  Calendar,
  X,
  Image as ImageIcon,
  Maximize2
} from "lucide-react";

import {
  C,
  fontBody
} from "../theme.js";

import GreenfieldHeaderBar from "../components/GreenfieldHeaderBar.jsx?v=1";

const host = "https://greenfield-academy-ipqx.onrender.com";
// const host = "http://localhost:3000";

// Sample fallback data in case your API endpoint isn't wired up yet
const SAMPLE_EVENTS = [
  {
    _id: "1",
    title: "Art Competition",
    category: "Competition",
    date: "2026-11-15",
    imageUrl: "https://res.cloudinary.com/ds72vzw9j/image/upload/v1794832623/Art_Competition_gyycad.jpg",
    caption: "Class V, Artist. Ritika and Alia own the prizes"
  },
  {
    _id: "2",
    title: "Children's Day",
    category: "Event",
    date: "2026-11-14",
    imageUrl: "https://res.cloudinary.com/ds72vzw9j/image/upload/v1794832973/childrenDay_krilmk.jpg",
    caption: "Children's Day at Greenfield Academy."
  },
  {
    _id: "3",
    title: "Science Competition",
    category: "Science",
    date: "2026-11-11",
    imageUrl: "https://res.cloudinary.com/ds72vzw9j/image/upload/v1794833126/science-competition_ll9n2r.jpg",
    caption: "Science Competition at Gyandeep Jatiya Vidyalaya."
  },
  {
    _id: "4",
    title: "Earth Day Plantation Drive",
    category: "Campus Life",
    date: "2026-10-24",
    imageUrl: "https://res.cloudinary.com/ds72vzw9j/image/upload/v1794833547/PosterMaking_joleuq.jpg",
    caption: "Poster making."
  },
  {
    _id: "5",
    title: "Cleanliness Drive",
    category: "Ceremony",
    date: "2026-05-15",
    imageUrl: "https://res.cloudinary.com/ds72vzw9j/image/upload/v1794834030/a58a482e-3d54-4822-8728-349588b43029_zvzvim.jpg",
    caption: "Greenfield Academy Cleanliness drive."
  },
  {
    _id: "6",
    title: "Art & Craft Showcase",
    category: "Cultural",
    date: "2026-08-19",
    imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80",
    caption: "Student paintings and sculptures displayed in the main hall."
  }
];

export default function EventsGallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  useEffect(() => {
    async function fetchEventPhotos() {
      try {
        setLoading(true);
        // Replace with your actual backend endpoint when ready
        const response = await fetch(`${host}/api/get-event-photos`);

        if (!response.ok) {
          throw new Error("API not ready");
        }
        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        // Falls back to sample photos if the API endpoint doesn't exist yet
        setPhotos(SAMPLE_EVENTS);
      } finally {
        setLoading(false);
      }
    }

    fetchEventPhotos();
  }, []);

  // Extract unique categories dynamically
  const categories = ["All", ...new Set(photos.map((p) => p.category).filter(Boolean))];

  const filteredPhotos =
    selectedCategory === "All"
      ? photos
      : photos.filter((p) => p.category === selectedCategory);

  return (
    <div style={{ position: "relative", paddingBottom: 40 }}>
      <GreenfieldHeaderBar />

      {/* Page Header */}
      <div style={{ marginBottom: 20, marginTop: 50, paddingTop: 20 }}>
        <h1
          style={{
            fontFamily: "'Bentham', serif",
            fontWeight: 700,
            fontSize: 28,
            color: C.ink,
            margin: "4px 0 0"
          }}
        >
          School Events & Memories
        </h1>
        <p
          style={{
            fontFamily: fontBody,
            fontSize: 14,
            color: C.slate,
            margin: "4px 0 0"
          }}
        >
          Moments captured across campus activities, celebrations, and achievements.
        </p>
      </div>

      {/* Category Filter Pills */}
      {!loading && !error && categories.length > 1 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 20
          }}
        >
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 999,
                  border: `1px solid ${active ? C.ink : C.line}`,
                  background: active ? C.ink : C.paperCard,
                  color: active ? "#ffffff" : C.ink,
                  fontFamily: fontBody,
                  fontSize: 13,
                  fontWeight: active ? 600 : 500,
                  cursor: "pointer",
                  transition: "all 0.15s ease"
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "50px 0",
            color: C.slate,
            fontFamily: fontBody,
            gap: 8
          }}
        >
          <Loader2 className="animate-spin" size={20} />
          <span>Loading event photographs...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: 16,
            background: "#fee2e2",
            border: "1px solid #fecaca",
            borderRadius: 12,
            color: "#991b1b",
            fontFamily: fontBody,
            fontSize: 14
          }}
        >
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Photo Grid */}
      {!loading && !error && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16
          }}
        >
          {filteredPhotos.map((item) => (
            <div
              key={item._id}
              onClick={() => setLightboxPhoto(item)}
              style={{
                background: C.paperCard,
                border: `1px solid ${C.line}`,
                borderRadius: 16,
                overflow: "hidden",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s ease, box-shadow 0.2s ease"
              }}
            >
              {/* Photo Container */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: 220,
                  background: "#f1f5f9",
                  overflow: "hidden"
                }}
              >
                <img
                  src={item.imageUrl || `/images/events/${item._id}.jpg`}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block"
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    if (e.currentTarget.nextSibling) {
                      e.currentTarget.nextSibling.style.display = "flex";
                    }
                  }}
                />

                {/* Fallback Placeholder if image fails */}
                <div
                  style={{
                    display: "none",
                    position: "absolute",
                    inset: 0,
                    alignItems: "center",
                    justifyContent: "center",
                    color: C.slate,
                    flexDirection: "column",
                    gap: 6
                  }}
                >
                  <ImageIcon size={32} strokeWidth={1.5} />
                  <span style={{ fontFamily: fontBody, fontSize: 12 }}>Photo unavailable</span>
                </div>

                {/* Category Badge */}
                {item.category && (
                  <span
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      background: "rgba(15, 23, 42, 0.75)",
                      backdropFilter: "blur(4px)",
                      color: "#fff",
                      fontFamily: fontBody,
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "4px 10px",
                      borderRadius: 999
                    }}
                  >
                    {item.category}
                  </span>
                )}

                {/* Expand Hint Icon */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.85)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: C.ink
                  }}
                >
                  <Maximize2 size={14} />
                </div>
              </div>

              {/* Caption & Date Footer */}
              <div style={{ padding: 14, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div
                    style={{
                      fontFamily: fontBody,
                      fontWeight: 700,
                      fontSize: 15,
                      color: C.ink,
                      marginBottom: 4
                    }}
                  >
                    {item.title}
                  </div>
                  {item.caption && (
                    <p
                      style={{
                        fontFamily: fontBody,
                        fontSize: 13,
                        color: C.slate,
                        margin: 0,
                        lineHeight: 1.4
                      }}
                    >
                      {item.caption}
                    </p>
                  )}
                </div>

                {item.date && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      marginTop: 10,
                      fontFamily: fontBody,
                      fontSize: 12,
                      color: C.slate
                    }}
                  >
                    <Calendar size={13} />
                    <span>
                      {new Date(item.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {filteredPhotos.length === 0 && (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: 40,
                color: C.slate,
                fontFamily: fontBody
              }}
            >
              No event photographs found in this category.
            </div>
          )}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {lightboxPhoto && (
        <div
          onClick={() => setLightboxPhoto(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(4px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 850,
              width: "100%",
              background: C.paperCard,
              borderRadius: 16,
              overflow: "hidden",
              position: "relative"
            }}
          >
            <button
              type="button"
              onClick={() => setLightboxPhoto(null)}
              aria-label="Close modal"
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "none",
                background: "rgba(0, 0, 0, 0.6)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10
              }}
            >
              <X size={20} />
            </button>

            <img
              src={lightboxPhoto.imageUrl || `/images/events/${lightboxPhoto._id}.jpg`}
              alt={lightboxPhoto.title}
              style={{
                width: "100%",
                maxHeight: "70vh",
                objectFit: "contain",
                background: "#000",
                display: "block"
              }}
            />

            <div style={{ padding: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                <h3 style={{ fontFamily: "'Bentham', serif", fontSize: 22, margin: 0, color: C.ink }}>
                  {lightboxPhoto.title}
                </h3>
                {lightboxPhoto.date && (
                  <span style={{ fontFamily: fontBody, fontSize: 13, color: C.slate }}>
                    {new Date(lightboxPhoto.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </span>
                )}
              </div>
              {lightboxPhoto.caption && (
                <p style={{ fontFamily: fontBody, fontSize: 14, color: C.slate, margin: "6px 0 0" }}>
                  {lightboxPhoto.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}