import { C } from "../theme.js";


export const subjects = [
  {
    id: "math",
    name: "Mathematics",
    class:"2",
    chapter: "Ch. 7 — Algebraic Expressions",
    color: C.marigold,
    progress: 72,
    chapters: [
      { name: "Ch. 5 — Data Handling", status: "done" },
      { name: "Ch. 6 — Squares and Square Roots", status: "done" },
      { name: "Ch. 7 — Algebraic Expressions", status: "current" },
      { name: "Ch. 8 — Mensuration", status: "upcoming" },
      { name: "Ch. 9 — Direct and Inverse Proportions", status: "upcoming" },
    ],
  },
  {
    id: "science",
    name: "Science",
    class:"3",
    chapter: "Ch. 4 — Chemical Reactions",
    color: C.mint,
    progress: 58,
    chapters: [
      { name: "Ch. 2 — Microorganisms", status: "done" },
      { name: "Ch. 3 — Synthetic Fibres and Plastics", status: "done" },
      { name: "Ch. 4 — Chemical Reactions", status: "current" },
      { name: "Ch. 5 — Metals and Non-metals", status: "upcoming" },
    ],
  },
  {
    id: "english",
    name: "English",
    class:"1",
    chapter: "Ch. 9 — The Road Not Taken",
    color: C.coral,
    progress: 90,
    chapters: [
      { name: "Ch. 7 — A Short Monsoon Diary", status: "done" },
      { name: "Ch. 8 — The Tsunami", status: "done" },
      { name: "Ch. 9 — The Road Not Taken", status: "current" },
      { name: "Ch. 10 — The Duck and the Kangaroo", status: "upcoming" },
    ],
  },
  {
    id: "hindi",
    name: "Hindi",
    class:"8",
    chapter: "पाठ ६ — बड़े भाई साहब",
    color: C.violet,
    progress: 45,
    chapters: [
      { name: "पाठ ४ — साखियाँ एवं सबद", status: "done" },
      { name: "पाठ ५ — यह सबसे कठिन समय नहीं", status: "current" },
      { name: "पाठ ६ — बड़े भाई साहब", status: "upcoming" },
      { name: "पाठ ७ — डायरी का एक पन्ना", status: "upcoming" },
    ],
  },
  {
    id: "social",
    name: "Social Studies",
    class:"10",
    chapter: "Ch. 3 — The French Revolution",
    color: C.sky,
    progress: 63,
    chapters: [
      { name: "Ch. 1 — Resources", status: "done" },
      { name: "Ch. 2 — Land, Soil, Water", status: "done" },
      { name: "Ch. 3 — The French Revolution", status: "current" },
      { name: "Ch. 4 — Understanding Secularism", status: "upcoming" },
    ],
  },
];

export const badges = [
  { label: "7-day streak", icon: "flame" },
  { label: "Math whiz", icon: "star" },
  { label: "Perfect week", icon: "award" },
];

export const weekActivity = [40, 65, 20, 80, 55, 90, 30];
export const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];

export const overviewStats = {
  attendance: "96%",
  avgScore: "84%",
  timeToday: "1h 20m",
  pending: 2,
};

export const activityFeed = [
  { text: "Completed English — Ch. 9 quiz, scored 9/10", time: "Today, 5:40 PM" },
  { text: "Started Science — Ch. 4 video lesson", time: "Today, 4:55 PM" },
  { text: "Missed homework reminder — Hindi worksheet", time: "Yesterday" },
  { text: "Completed Mathematics — Ch. 6 test, scored 88%", time: "2 days ago" },
];

export const faculty = [
  {
    "name": "Mr. Tridib Bora",
    "subject": [
      "class-v-mathematics",
      "class-vi-mathematics"
    ],
    "qualification": "M.Sc. Mathematics, B.Ed.",
    "phone": "",
    "email": ""
  },
  {
    id: "6a95d551c177b6802ee2e11b",
    "name": "Mr. Amar Jyoti Kachari",
    "subject": [
      "class-v-computer",
      "class-vi-computer",
      "class-vii-computer",
      "class-viii-computer",
      "class-ix-computer",
      "class-x-computer",
    ],
    "qualification": "MCA Computer Science",
    "phone": "",
    "email": ""
  },
  {
    "name": "Mrs. Doli Bora",
    "subject": [
      "class-one-english",
      "class-nur-numeracy",
      "class-v-assamese",
      "class-x-hindi",
      "class-lkg-awreness",
    ],
    "qualification": "",
    "phone": "",
    "email": ""
  },
  {
    "name": "Mr. Utpal Saikia",
    "subject": [
      "class-two-english",
      "class-one-mathematics",
      "class-vi-social-g",
      "class-two-eng-curssive",
      "class-lkg-awreness",
    ],
    "qualification": "",
    "phone": "",
    "email": ""
  },
];

export const students = [
  {
    id: "aaron-sharma",
    name: "Aaron Sharma",
    subject: "Mathematics",
    color: C.marigold,
    qualification: "Grade VIII, Roll No. 01",
    phone: "+911234567890",
    email: "Aaron.Sharma@kaksha.edu",
    schedule: [
      { day: "Monday", time: "9:00 – 9:45 AM", class: "VIII" },
      { day: "Wednesday", time: "10:00 – 10:45 AM", class: "VIII" },
      { day: "Friday", time: "9:00 – 9:45 AM", class: "VIII" },
    ],
  },
  {
    id: "riya-das",
    name: "Riya Das",
    subject: "Science",
    color: C.mint,
    qualification: "Grade VIII, Roll No. 02",
    phone: "+911234567890",
    email: "Riya.Das@kaksha.edu",
    about:
      "Riya is an enthusiastic science enthusiast who loves participating in hands-on lab experiments and science exhibitions.",
    schedule: [
      { day: "Tuesday", time: "11:00 – 11:45 AM", class: "VIII" },
      { day: "Thursday", time: "9:00 – 9:45 AM", class: "VIII" },
    ],
  },
  {
    id: "rohan-gogoi",
    name: "Rohan Gogoi",
    subject: "English",
    color: C.coral,
    qualification: "Grade VIII, Roll No. 03",
    phone: "+911234567890",
    email: "Rohan.Gogoi@kaksha.edu",
    about:
      "Rohan is an avid reader and active member of the school's creative writing circle and annual literary magazine.",
    schedule: [
      { day: "Monday", time: "11:00 – 11:45 AM", class: "VIII" },
      { day: "Thursday", time: "10:00 – 10:45 AM", class: "VIII" },
    ],
  },
  {
    id: "neha-deka",
    name: "Neha Deka",
    subject: "Hindi",
    color: C.violet,
    qualification: "Grade VIII, Roll No. 04",
    phone: "+911234567890",
    email: "Neha.Deka@kaksha.edu",
    about:
      "Neha enjoys reciting poetry and actively participates in the school's annual Hindi Diwas celebrations.",
    schedule: [
      { day: "Tuesday", time: "9:00 – 9:45 AM", class: "VIII" },
      { day: "Friday", time: "11:00 – 11:45 AM", class: "VIII" },
    ],
  },
  {
    id: "karan-bora",
    name: "Karan Bora",
    subject: "Social Studies",
    color: C.sky,
    qualification: "Grade VIII, Roll No. 05",
    phone: "+911234567890",
    email: "Karan.Bora@kaksha.edu",
    about:
      "Karan is deeply interested in history and geography, and takes part in the middle school Model United Nations chapter.",
    schedule: [
      { day: "Wednesday", time: "9:00 – 9:45 AM", class: "VIII" },
      { day: "Friday", time: "10:00 – 10:45 AM", class: "VIII" },
    ],
  },
];
export const notifications = [
  {
    id: "n1",
    type: "assignment",
    title: "Worksheet due",
    message: "Class V - Hindi - Chapter 1",
    date: "Today, 6:00 PM",
    read: false,
  },
  {
    id: "n2",
    type: "event",
    title: "Annual Science Exhibition — Sep 12",
    message: "Project proposals must be submitted to Mr. Malakar by Sep 5.",
    date: "Today, 2:15 PM",
    read: false,
  },
  {
    id: "n21",
    type: "marks",
    title: "Class V, Hindi 1st unit test - 20/40",
    message: "Secured 20",
    date: "Today, 2:15 PM",
    read: false,
  },
  {
    id: "n22",
    type: "feedback",
    title: "Focus on his dress",
    message: "Project proposals must be submitted to Mr. Malakar by Sep 5.",
    date: "Today, 2:15 PM",
    read: false,
  },
  {
    id: "n3",
    type: "feedback",
    title: "Sir please give him homework",
    message: "Attendance for August is at 89%. 90% is required for exam eligibility.",
    date: "Yesterday",
    read: false,
  },
  {
    id: "n4",
    type: "general",
    title: "PTM scheduled for Sep 20",
    message: "Parent-teacher meetings for Class VIII will be held from 10 AM to 1 PM.",
    date: "Yesterday",
    read: true,
  },
  {
    id: "n5",
    type: "assignment",
    title: "Worksheet due",
    message: "Class V - Hindi - Chapter 2",
    date: "2 days ago",
    read: true,
  },
  {
    id: "n6",
    type: "event",
    title: "Republic Day rehearsal moved to Thursday",
    message: "All Class VIII students should assemble in the main hall by 8:30 AM.",
    date: "3 days ago",
    read: true,
  },
  {
    id: "n61",
    type: "taskCompletion",
    title: "Homework Done",
    message: "Class V - Hindi - Chapter 3 home work done",
    date: "3 days ago",
    read: true,
  },
];
