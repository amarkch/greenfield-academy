import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Home, BookOpen, Bell, Users } from "lucide-react";
import { C, FONT_IMPORT, fontDisplay, fontBody } from "../theme.js";
import { notifications } from "../data/mockData.js";

const navItems = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/academics", label: "Academics", icon: BookOpen },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/faculty", label: "Faculty", icon: Users },
  { to: "/students", label: "Students", icon: Users },
];

export default function Layout() {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div style={{ minHeight: "100vh", background: C.paper, display: "flex" }}>
      
      <main style={{ flex: 1, padding: "28px 32px 60px", maxWidth: 1200, margin: "0 auto" }}>
        <Outlet />
      </main>
    </div>
  );
}
