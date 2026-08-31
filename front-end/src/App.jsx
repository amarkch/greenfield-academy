import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import AcademicHome from "./pages/AcademicHome.jsx";
import Academics from "./pages/Academics.jsx";
import Notifications from "./pages/Notifications.jsx";
import Faculty from "./pages/Faculty.jsx";
import Students from "./pages/Students.jsx";
import FacultyDetail from "./pages/FacultyDetail.jsx";
import StudentDetail from "./pages/StudentDetail.jsx";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/academic-home" element={<AcademicHome />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/students" element={<Students />} />
          <Route path="/faculty/:id" element={<FacultyDetail />} />
          <Route path="/student/:id" element={<StudentDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
