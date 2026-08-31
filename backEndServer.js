const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');
const { MongoClient, ServerApiVersion } = require('mongodb');
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

// GET API: Read JSON objects
app.get('/api/data', (req, res) => {
  try {
    const data = readData();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error reading data' });
  }
});

// POST API: Write/Append a new JSON object
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




// Create a MongoClient with a MongoClientOptions object to set the Stable API version
app.post('/api/insert-teacher-data', async (req, res) => {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  async function run() {
    try {
      await client.connect();
      console.log("Conneected", req.body);
      const name = req.body.name;
      const subjects = req.body.subjects; // Fixed: was previously assigning req.body.username twice
      const qualification = req.body.qualification;
      const phone = req.body.phone;
      const email = req.body.email;

      // Crucial: Add 'await' so the query finishes before the client closes
      const result = await client.db("gfa").collection("faculty").insertOne({
        "name": name,
        "subjects": subjects,
        "qualification": qualification,
        "phone": phone,
        "email": email
      });

      console.log('Inserted document ID:', result.insertedId);

      // Send a successful response back to the frontend
      return res.status(201).json({ 
        success: true, 
        message: 'Teacher data inserted successfully', 
        id: result.insertedId 
      });

    } catch (error) {
      console.error('Database insertion error:', error);
      // Send an error response back so the frontend knows it failed
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to insert teacher data' 
      });
    } finally {
      await client.close();
    }
  }

  run().catch(console.dir);
});

app.get('/api/get-teachers-list', async (req, res) => {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  async function run() {
    try {
      await client.connect();
      

      // Crucial: Add 'await' so the query finishes before the client closes
      const result = await client.db("gfa").collection("faculty").find({});

      // Send a successful response back to the frontend
      return res.status(201).json({ 
        success: true, 
        result 
      });

    } catch (error) {
      console.error('Database insertion error:', error);
      // Send an error response back so the frontend knows it failed
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to insert teacher data' 
      });
    } finally {
      await client.close();
    }
  }

  run().catch(console.dir);
});



app.get('/api/create-file/:a', async (req, res) => {
  const { filename, content } = {filename: "fa.text", content: req.params.a};
  console.log(content);
  

  try {
    // Sanitize filename to prevent directory traversal vulnerabilities
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
    res.status(500).json({ success: false, message: 'Error saving data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});