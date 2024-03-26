
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 5000;

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your allowed origin
};

app.use(cors(corsOptions));

// handle file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const storageDirectory = path.join(__dirname, 'uploaded-files');
// Ensure the storage directory exists, or create it if missing
if (!fs.existsSync(storageDirectory)) {
  fs.mkdirSync(storageDirectory);
}

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // const fileContent = req.file.buffer.toString('utf-8');

  // Save the file content or perform other processing here
  const filename = req.file.originalname;
  const filePath = path.join(storageDirectory, filename);

  // Save the file to the storage directory
  fs.writeFileSync(filePath, req.file.buffer);
  res.status(200).send('File uploaded successfully.');
});

app.post("/draft", (req, res) => {
  fs.readdir(storageDirectory, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }
  
    files.forEach((file) => {
      console.log(file);
    });
    res.status(200).json({ files });
  });
})

// Serve file content
app.get('/files/:filename', (req, res) => {
    // console.log(res);
    const filename = req.params.filename;
    const filePath = path.join(__dirname, storageDirectory, filename);

    fs.readdir(__dirname, (err, files) => {
      if (err) {
        console.error('Error reading directory:', err);
        return;
      }
    
      // Loop through the list of files and print each file's name
      console.log("list files");
      files.forEach((file) => {
        console.log(file);
      });
    });

    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      res.status(200).send(fileContent);
    } else {
      res.status(404).send('File not found.');
    }
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });