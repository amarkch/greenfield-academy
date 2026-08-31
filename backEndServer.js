const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://amarkch1990_db_user:d09ZQp5K6U6lDxpW@cluster0.ppud2xq.mongodb.net/?appName=Cluster0";
// Middleware to parse JSON bodies
app.use(express.json());

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
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      const name = req.body.username;
      const subjects = req.body.username;
      const qualification = req.body.qualification;
      const phone = req.body.phone;
      const email = req.body.email;

      const allDocs = client.db("gfa").collection("faculty").insertOne({
        "name": name,
        "subjects": subjects,
        "qualification": qualification,
        "phone": phone,
        "email": email
      });

      // 4. Output the results
      console.log('Found documents:');
      console.log(allDocs);
    } finally {
      // Ensures that the client will close when you finish/error
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