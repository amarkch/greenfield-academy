import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Home, BookOpen, Bell, Users } from "lucide-react";
import { C, FONT_IMPORT, fontDisplay, fontBody } from "../theme.js";
import { notifications } from "../data/mockData.js";
import "./Overlay.css";

const navItems = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/academics", label: "Academics", icon: BookOpen },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/faculty", label: "Faculty", icon: Users },
  { to: "/students", label: "Students", icon: Users },
];

const teachersData = [
    {
        "_id": "6ad0d8e81134feecfccafaaa",
        "name": "Manish Krsn. Kachari",
        "subjects": null,
        "qualification": "Masters",
        "phone": "NA",
        "email": "na@gmail.com",
        "rank": 1
    },
    {
        "_id": "6ad0d8e81134feecfccaf45f",
        "name": "Prashanta Kr. Bhagawati",
        "subjects": null,
        "qualification": "Masters",
        "phone": "NA",
        "email": "na@gmail.com",
        "classTeacherOf": "class-ix",
        "rank": 1
    },
    {
        "_id": "6ac67597fc864121be000322",
        "name": "Bidyut Pratim Bharali",
        "subjects": null,
        "qualification": "MA, BEd",
        "phone": "NA",
        "email": "bidyutbharali78966@gmail.com",
        "rank": 2
    },
    {
        "_id": "6ac50e335e687eedea49871e",
        "name": "Miss Nabadipa Baruah",
        "subjects": null,
        "qualification": "B.A",
        "phone": "NA",
        "email": "nabadipabaruah@gmail.com",
        "classTeacherOf": "class-nursery",
        "rank": 2
    },
    {
        "_id": "6ac50dfd5e687eedea49871d",
        "name": "Miss Krishna Baruah",
        "subjects": null,
        "qualification": "HS",
        "phone": "NA",
        "email": "krishnabaruah55@gmail.com",
        "rank": 3
    },
    {
        "_id": "6a9f9bd6c006123cf2ab491f",
        "name": "Shishu Ray",
        "subjects": null,
        "qualification": "HS",
        "phone": "NA",
        "email": "shishurai@gmail.com",
        "rank": 4
    },
    {
        "_id": "6a9f9925c006123cf2ab491d",
        "name": "Pobitra Bharali",
        "subjects": null,
        "qualification": "BSc Ms",
        "phone": "NA",
        "email": "bharalipobitra@gmail.com",
        "classTeacherOf": "class-x",
        "rank": 5
    },
    {
        "_id": "6ac50ca75e687eedea498718",
        "name": "Priyanka Gayan",
        "subjects": null,
        "qualification": "M.A (Assamese)",
        "phone": "NA",
        "email": "priyankagayan416@gmail.com",
        "classTeacherOf": "class-ukg",
        "rank": 6
    },
    {
        "_id": "6ac50c545e687eedea498717",
        "name": "Babin Rehman",
        "subjects": null,
        "qualification": "PGDCA",
        "phone": "NA",
        "email": "babinrahman30004@gmail.com",
        "classTeacherOf": "class-v",
        "rank": 7
    },
    {
        "_id": "6ac50d815e687eedea49871b",
        "name": "Utpal Saikia",
        "subjects": null,
        "qualification": "B.A",
        "phone": "NA",
        "email": "us718080@gmail.com",
        "classTeacherOf": "class-ii",
        "rank": 8
    },
    {
        "_id": "6a9f9a5fc006123cf2ab491e",
        "name": "Amlan J Saikia",
        "subjects": null,
        "qualification": "MSc zoology ",
        "phone": "NA",
        "email": "amlanjyoti1996@gmail.com",
        "classTeacherOf": "class-viii",
        "rank": 9
    },
    {
        "_id": "6ac50c035e687eedea498716",
        "name": "Hushna B. Khanikar",
        "subjects": null,
        "qualification": "B.A",
        "phone": "NA",
        "email": "husnakhanikar0998@gmail.com",
        "classTeacherOf": "class-vii",
        "rank": 10
    },
    {
        "_id": "6a9f9859c006123cf2ab491c",
        "name": "Tridib Borah",
        "subjects": null,
        "qualification": "B.Sc",
        "phone": "NA",
        "email": "tidakp24@gmail.com",
        "classTeacherOf": "class-vi",
        "rank": 11
    },
    {
        "_id": "6ac50dca5e687eedea49871c",
        "name": "Miss Doli Borah",
        "subjects": null,
        "qualification": "B.A",
        "phone": "N.A",
        "email": "borahdoli3333@gmail.com",
        "classTeacherOf": "class-i",
        "rank": 12
    },
    {
        "_id": "6ac50d575e687eedea49871a",
        "name": "Bidisha Kachari",
        "subjects": null,
        "qualification": "B.A",
        "phone": "NA",
        "email": "bidixak@gmail.com",
        "classTeacherOf": "class-LKG",
        "rank": 14
    },
    {
        "_id": "6a98284f551b3fd1d79b4317",
        "name": "Amar Kachari",
        "qualification": "MCA",
        "phone": "NA",
        "email": "amarkch1990@gmail.com",
        "rank": 14
    },
    {
        "_id": "6ac50ef15e687eedea498720",
        "name": "Bishal Malakar",
        "subjects": null,
        "qualification": "M.A (Geography)",
        "phone": "NA",
        "email": "bishalmalakar@gmail.com",
        "classTeacherOf": "class-iv",
        "rank": 15
    },
    {
        "_id": "6ac50ce95e687eedea498719",
        "name": "Miss Mou Sen",
        "subjects": null,
        "qualification": "B.A",
        "phone": "NA",
        "email": "mous91831@gmail.com",
        "rank": 15
    },
    {
        "_id": "6ac50e875e687eedea49871f",
        "name": "Miss Sapna Gogoi",
        "subjects": null,
        "qualification": "B.Sc (Hons)",
        "phone": "NA",
        "email": "sapnagogoi927@gmail.com",
        "classTeacherOf": "class-iii",
        "rank": 16
    },
    {
        "_id": "6ac50f225e687eedea498721",
        "name": "Miss Plabita Saikia",
        "subjects": null,
        "qualification": "M.A",
        "phone": "NA",
        "email": "plabitasaikia5@gmail.com",
        "rank": 17
    }
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
        .layout-content {
          padding 5;
        }
        @media screen and (max-width: 768px) {
          .layout-main {
            padding: 0;
          }
          .layout-content {
            padding: 10px;
            padding-bottom: 150px;
          }
        }
      `}</style>
      
      <main className="layout-main">

        <div className="layout-content">
          {
            !localStorage.getItem("teacherId") && <div className="overlay">
              <h3 style={{color: "#fff"}}>Select Your Profile</h3>
              <div style={{ maxHeight: "calc(100vh - 40px)", overflowY: "auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 7 }}>
                {teachersData.map((f) => (
                  <div
                    onClick={()=>{localStorage.setItem("teacherId", f._id); window.location.reload();}}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: 18,
                      background: C.paperCard,
                      border: `1px solid ${C.line}`,
                      borderRadius: 16,
                      textDecoration: "none",
                    }}
                  >
                    <div
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: 12,
                        color: f.color || C.slate,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: fontDisplay,
                        fontWeight: 700,
                        fontSize: 16,
                        flexShrink: 0,
                      }}
                    >

                      
                      <img style={{ display: "inline-block", overflow: "auto", borderRadius: "6px"}} src={`/images/${f._id}.png`} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: fontBody, fontWeight: 700, fontSize: 14, color: C.ink }}>{f.name}</div>
                      {f.classTeacherOf && <div style={{ fontFamily: fontBody, fontWeight: 700, fontSize: 14, color: C.ink }}>Class Teacher: ({f.classTeacherOf.split("-")[1]})</div>}
                      <div style={{ fontFamily: fontBody, fontSize: 12, color: C.slate, marginTop: 2 }}>{f.email}<br/> Phone: {f.phone}</div>
                    </div>
                    
                  </div>
                ))}
              </div>
            </div>
          }
          <Outlet />
        </div>
      </main>
    </div>
  );
}