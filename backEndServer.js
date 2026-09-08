const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://amarkch1990_db_user:d09ZQp5K6U6lDxpW@cluster0.ppud2xq.mongodb.net/?appName=Cluster0";
// Middleware to parse JSON bodies
const allowedOrigins = [
  'https://greenfieldttb.com',
  'https://www.greenfieldttb.com',
  'https://greenfield-academy.onrender.com',
  'http://localhost:4000/'
];
// 1. Parse incoming JSON payloads
app.use(express.json());

// 2. Parse URL-encoded payloads (if sending data from standard HTML forms)
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
      return callback(null, true);
    }
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy violation'), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));


// Helper function to read data
const readData = () => {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  }
  const fileData = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(fileData);
};

// Helper function to write data
const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
};

const getChapters = async (teacherId) => {
  const db = await connectDB();
  
  const pipeline = [
    { $match: { teacher: teacherId } },
    { 
      $group: {
        _id: {
          subject: "$subject",
          class: "$class"
        },
        chapters: { $push: "$$ROOT" }
      }
    },
    {
      $project: {
        _id: 0,
        subject: "$_id.subject",
        class: "$_id.class",
        chapters: 1
      }
    }
  ];

  const result = await db.collection('chapters').aggregate(pipeline).toArray();

  return result;
};

app.get('/api/get-teacher/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid teacher ID format' 
      });
    }
    const db = await connectDB();
    const teacher = await db.collection('faculty').findOne({ _id: new ObjectId(id) });
    if (!teacher) {
      return res.status(404).json({ 
        success: false, 
        error: 'Teacher not found' 
      });
    }
    
    // Pass the teacher's string ID directly to query chapters by teacherId
    const periods = await getChapters(id);

    res.status(200).json({ 
      success: true, 
      data: { teacher, periods } 
    });
  } catch (error) {
    console.error('Database retrieval error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch teacher data' 
    });
  }
});

app.get('/api/data', (req, res) => {
  try {
    const data = readData();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error reading data' });
  }
});

app.post('/api/data', (req, res) => {
  try {
    const newEntry = req.body;
    
    if (!newEntry || Object.keys(newEntry).length === 0) {
      return res.status(400).json({ success: false, message: 'Payload cannot be empty' });
    }

    const data = readData();
    data.push(newEntry);
    writeData(data);

    res.status(201).json({ success: true, message: 'Data added successfully', data: newEntry });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error saving data' });
  }
});

// Initialize client once outside the route handler
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let dbConnection;

async function connectDB() {
  if (!dbConnection) {
    await client.connect();
    dbConnection = client.db("gfa");
  }
  return dbConnection;
}

app.get('/api/get-teachers-list', async (req, res) => {
  try {
    const db = await connectDB();
    const teachers = await db.collection('faculty').find().toArray();
    res.json(teachers);
  } catch (error) {
    console.error('Database retrieval error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch teacher data' 
    });
  }
});

app.post('/api/insert-teacher-data', async (req, res) => {
  try {
    const db = await connectDB();
    const name = req.body.name;
    const subjects = req.body.subjects;
    const qualification = req.body.qualification;
    const phone = req.body.phone;
    const email = req.body.email;

    const result = await db.collection("faculty").insertOne({
      "name": name,
      "subjects": subjects,
      "qualification": qualification,
      "phone": phone,
      "email": email
    });
    res.status(201).json({ 
      success: true, 
      insertedId: result.insertedId 
    });
  } catch (error) {
    console.error('Database insertion error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to insert teacher data' 
    });
  }
});

// Insert Student Data
app.post('/api/insert-student-data', async (req, res) => {
  try {
    const db = await connectDB();
    const { name, className, rollNumber, guardianName, phone, email } = req.body;

    const result = await db.collection("students").insertOne({
      name,
      className,
      rollNumber,
      guardianName,
      phone,
      email
    });

    res.status(201).json({ 
      success: true, 
      insertedId: result.insertedId 
    });
  } catch (error) {
    console.error('Database insertion error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to insert student data' 
    });
  }
});

// Insert Subject Data into "subjects" and Chapter Data into "chapters"
app.post('/api/insert-subject-data', async (req, res) => {
  try {
    const db = await connectDB();
    const { subjectName, className, teacher, chapters } = req.body;

    if (!subjectName || !className) {
      return res.status(400).json({ 
        success: false, 
        error: 'Subject name and class are required' 
      });
    }

    // 1. Insert only subject data into the "subjects" collection
    const subjectResult = await db.collection("subjects").insertOne({
      subjectName,
      class: className,
      teacher: teacher || ''
    });

    // 2. Insert chapter details into the "chapters" collection matching your schema
    let chapterResult = { insertedCount: 0 };
    if (chapters && Array.isArray(chapters) && chapters.length > 0) {
      const chapterDocuments = chapters.map((ch, index) => ({
        class: className,
        subject: subjectName,
        chapterNumber: ch.chapterNumber || index + 1,
        title: ch.title || (typeof ch === 'string' ? ch : ''),
        description: ch.description || '',
        status: ch.status || 'pending',
        teacher: teacher || ''
      }));

      chapterResult = await db.collection("chapters").insertMany(chapterDocuments);
    }

    res.status(201).json({ 
      success: true, 
      subjectId: subjectResult.insertedId,
      insertedChaptersCount: chapterResult.insertedCount 
    });
  } catch (error) {
    console.error('Database insertion error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to insert subject and chapter data' 
    });
  }
});



app.get('/api/student-notifications/:studentId', async (req, res) => {
  try {
    const db = await connectDB();
    const { studentId } = req.params;

    // Validate if studentId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ error: 'Invalid student ID format' });
    }

    // Use .toArray() to fetch multiple documents from the MongoDB cursor
    const notifications = await db.collection("notifications").find({ 
      studentId: { 
        $in: [
          new ObjectId(studentId), 
          studentId
        ] 
      } 
    }).toArray();

    if (!notifications || notifications.length === 0) {
      return res.status(404).json({ error: 'No notifications found for this student' });
    }

    return res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching student notifications:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/update-chapter-status', async (req, res) => {
  try {
    const db = await connectDB();
    const { chapterId, chapterStatus, classId, title, subject } = req.body;

    // Update the chapter status
    await db.collection("chapters").updateOne(
      { _id: new ObjectId(chapterId) },
      { $set: { status: chapterStatus } }
    );

    // If status is homeworkGiven, insert notifications for all students in the class
    if (chapterStatus === 'homeworkGiven' && classId) {
      // Assuming a "students" collection exists with a "classId" field linking them to the class
      const students = await db.collection("students").find({ className: classId }).toArray();

      if (students.length > 0) {
        console.log("students found");
        const notifications = students.map(student => ({
          studentId: student._id,
          classId: classId,
          chapterId: new ObjectId(chapterId),
          message: title,
          title: 'Assignment ['+subject+']',
          type: "assignment",
          date: new Date()
        }));

        await db.collection("notifications").insertMany(notifications);
      }
    }

    res.status(201).json({ 
      success: true 
    });
  } catch (error) {
    console.error('Database update error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update chapter status' 
    });
  }
});

// Fetch students belonging to a particular class
app.get('/api/get-students/:className', async (req, res) => {
  try {
    const db = await connectDB();
    const { className } = req.params;

    const students = await db.collection('students').find({ className: className }).toArray();

    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    console.error('Database retrieval error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch students data'
    });
  }
});

// API: Get subjects and students for a class via query parameter
app.get('/api/get-subjects-and-students', async (req, res) => {
  try {
    const db = await connectDB();
    const { className } = req.query;

    if (!className) {
      return res.status(400).json({ success: false, error: 'className query parameter is required.' });
    }

    // Fetch subjects and students concurrently using Promise.all with native driver
    const [subjects, students] = await Promise.all([
      db.collection('subjects').find({ class: className }).toArray(),
      db.collection('students').find({ className: className }).toArray()
    ]);

    return res.status(200).json({
      success: true,
      className,
      totalSubjects: subjects.length,
      totalStudents: students.length,
      subjects,
      students
    });

  } catch (error) {
    console.error('Error fetching subjects and students:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.get('/api/create-file/:a', async (req, res) => {
  const { filename, content } = {filename: "fa.text", content: req.params.a};
  try {
    const safeFilename = path.basename(filename);
    const filePath = path.join('./', safeFilename);

    await fs.writeFileSync(filePath, content);
    
    return res.status(201).json({ 
      success: true, 
      message: `File '${safeFilename}' created successfully.` 
    });
  } catch (error) {
    console.error('File creation error:', error);
    return res.status(500).json({ error: 'Internal server error while creating the file.' });
  }
});

app.get('/', (req, res) => {
  try {
    res.status(200).json({ success: true, message: 'Greenfield is up and running'});
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error checking status' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});