# Kaksha — frontend

The student/parent dashboard UI, as a runnable Vite + React project with
client-side routing.

## Run it

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Pages

| Route | File | Purpose |
|---|---|---|
| `/` | `pages/Home.jsx` | Landing dashboard — the flip-card student/parent switch, subject shortcuts, weekly stats |
| `/academics` | `pages/Academics.jsx` | Academic content — expandable per-subject chapter lists with progress |
| `/notifications` | `pages/Notifications.jsx` | Announcements/assignments/alerts, filterable, mark-as-read |
| `/faculty` | `pages/Faculty.jsx` | Faculty directory grid |
| `/faculty/:id` | `pages/FacultyDetail.jsx` | One teacher's profile, qualifications, and weekly schedule |

`components/Layout.jsx` renders the persistent left sidebar nav (with an
unread-notifications badge) around all pages. `data/mockData.js` holds all
demo content in one place — swap it for API calls when you're ready.

## Connecting to the Kaksha API

If you're also using the `kaksha-backend` project, replace the imports from
`data/mockData.js` with `fetch` calls to the matching endpoints, e.g. in
`pages/Home.jsx`:

```jsx
import { useEffect, useState } from "react";

const [subjects, setSubjects] = useState([]);

useEffect(() => {
  fetch("http://localhost:4000/api/students/aarav-1")
    .then((r) => r.json())
    .then((data) => setSubjects(data.subjects));
}, []);
```

Run the backend (`npm run dev` in `kaksha-backend`) on port 4000 alongside
this frontend on port 5173 — CORS is already open on the API side for local
development. The backend doesn't yet have endpoints for faculty or
notifications; those still come from `mockData.js` until you add routes for
them (following the same pattern as `src/routes/student.js`).
