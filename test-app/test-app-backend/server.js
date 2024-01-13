const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'adnaan770@',
  database: 'testapp',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.post('/api/register', (req, res) => {
  const { username, password } = req.body;

  // Hash the password before storing it in the database
  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  const values = [username, hashedPassword];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error registering user:', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
    } else {
      console.log('User registered successfully');
      res.json({ success: true, message: 'User registered successfully' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
