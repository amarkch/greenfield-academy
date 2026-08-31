const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

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