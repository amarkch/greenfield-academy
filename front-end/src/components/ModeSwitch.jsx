import React from "react";
import { Star, CheckCircle2 } from "lucide-react";
import { C, fontBody } from "../theme.js";

export default function ModeSwitch({ mode, setMode }) {
  const flipped = mode === "parent";
  return (
    <button
      onClick={() => setMode(flipped ? "student" : "parent")}
      aria-label="Switch view"
      style={{ perspective: "800px", border: "none", background: "transparent", cursor: "pointer", padding: 0 }}
    >
      <div
        style={{
          width: 168,
          height: 56,
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(.4,.2,.2,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            borderRadius: 14,
            background: C.ink,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            fontFamily: fontBody,
            fontWeight: 600,
            fontSize: 14,
            boxShadow: "0 2px 10px rgba(35,33,82,0.25)",
          }}
        >
          <Star size={16} color={C.marigold} fill={C.marigold} />
          Student view
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: 14,
            background: "#fff",
            border: `1.5px solid ${C.ink}`,
            color: C.ink,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            fontFamily: fontBody,
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          <CheckCircle2 size={16} color={C.mint} />
          Parent view
        </div>
      </div>
      <div style={{ textAlign: "center", fontSize: 11, color: C.slate, marginTop: 6, fontFamily: fontBody }}>
        Tap to switch
      </div>
    </button>
  );
}
