const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
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

const getChapters = async (tags) => {
  const db = await connectDB();
  const matchConditions = tags.map(tag => {
    const [, classVal, subjectVal] = tag.match(/\[(.*?)\]\[(.*?)\]/) || [];
    return { class: classVal, subject: subjectVal };
  }).filter(cond => cond.class && cond.subject);

  // Return early if no valid tags match to prevent empty $or errors
  if (matchConditions.length === 0) return [];

  const result = await db.collection('chapters').aggregate([
  { 
    $match: { $or: matchConditions } 
  },
  {
    $group: {
      _id: { 
        class: "$class", 
        subject: "$subject" 
      },
      chapters: { $push: "$$ROOT" }
    }
  },
  {
    $project: {
      _id: 0,
      class: "$_id.class",
      subject: "$_id.subject",
      periodId: {
        $concat: ["[", "$_id.class", "][", "$_id.subject", "]"]
      },
      chapters: 1,
      progress: {
        $cond: {
          if: { $eq: [{ $size: "$chapters" }, 0] },
          then: 0,
          else: {
            $multiply: [
              {
                $divide: [
                  {
                    $size: {
                      $filter: {
                        input: "$chapters",
                        as: "chap",
                        cond: { $eq: ["$$chap.status", "done"] }
                      }
                    }
                  },
                  { $size: "$chapters" }
                ]
              },
              100
            ]
          }
        }
      }
    }
  },
  {
    $sort: { periodId: 1 }
  }
]).toArray();
  return result;
}

app.get('/api/get-teacher/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the provided ID is a valid MongoDB ObjectId
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
    const periods = await getChapters(teacher.periods);

    res.status(200).json({ 
      success: true, 
      data: {teacher, periods} 
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

// NEW API: Insert Subject and Chapters Data
app.post('/api/insert-subject-data', async (req, res) => {
  try {
    const db = await connectDB();
    const { subjectName, className, chapters } = req.body;

    if (!subjectName || !className || !chapters || !Array.isArray(chapters) || chapters.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid payload or missing required fields' 
      });
    }

    // Map each chapter string into a document matching the chapters collection schema
    const chapterDocuments = chapters.map(chapterTitle => ({
      class: className,
      subject: subjectName,
      name: chapterTitle,
      status: 'pending'
    }));

    const result = await db.collection("chapters").insertMany(chapterDocuments);

    res.status(201).json({ 
      success: true, 
      insertedCount: result.insertedCount,
      insertedIds: result.insertedIds 
    });
  } catch (error) {
    console.error('Database insertion error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to insert subject data' 
    });
  }
});

app.post('/api/update-chapter-status', async (req, res) => {
  try {
    const db = await connectDB();
    const chapterId = req.body.chapterId;
    const chapterStatus = req.body.chapterStatus;
    await db.collection("chapters").updateOne(
      { _id: new ObjectId(chapterId) },
      { $set: { status: chapterStatus } }
    );
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