const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = '123';

app.use(bodyParser.json());
app.use(cors());

const users = [
  {
    id: 1,
    username: 'editor',
    password: bcrypt.hashSync('password', 8)
  }
];

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(404).send('User not found');
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).send('Invalid Password');
  }

  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: 86400 });
  res.status(200).send({ auth: true, token });
});

const textsDir = path.join(__dirname, 'texts');

app.get('/api/texts', (req, res) => {
  fs.readdir(textsDir, (err, files) => {
    if (err) {
      return res.status(500).send('Unable to scan directory');
    }
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    res.json(jsonFiles);
  });
});

app.get('/api/texts/:title', (req, res) => {
  const filePath = path.join(textsDir, req.params.title);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).send('File not found');
    }
    res.json({ title: req.params.title, text: data });
  });
});

app.put('/api/texts/:title', (req, res) => {
  const filePath = path.join(textsDir, req.params.title);
  const newData = JSON.stringify(req.body, null, 2);
  fs.writeFile(filePath, newData, 'utf8', (err) => {
    if (err) {
      console.error('Error saving file:', err);
      return res.status(500).send('Unable to save file');
    }
    res.send('File saved successfully');
  });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// The "catchall" handler: for any request that doesn't match the above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
