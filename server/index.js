
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 5000;

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ['http://localhost:3000', 'https://infinite-ravine-65565-6b18fc609149.herokuapp.com/'];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, '../client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'../client/build/index.html'));
});

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
  
  app.listen(process.env.PORT || port, () => {
    console.log(`Server is running on port ${process.env.PORT || port}`);
  });