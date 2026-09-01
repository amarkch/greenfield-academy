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
    <div style={{ minHeight: "100vh", background: C.paper, display: "flex", flexDirection: "column" }}>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .layout-main {
          flex: 1;
          padding: 28px 32px 60px;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        @media screen and (max-width: 768px) {
          .layout-main {
            padding: 10px 0;
          }
        }
      `}</style>
      
      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  );
}