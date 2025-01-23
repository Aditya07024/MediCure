const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const socketIo = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'medical_website'
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User Registration Route (Patients & Doctors)
app.post('/register', (req, res) => {
  const { username, email, password, role } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: err });
    db.query('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', [username, email, hashedPassword, role], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(200).json({ message: 'User registered successfully!' });
    });
  });
});

// User Authentication Route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(400).json({ message: 'User not found' });
    
    bcrypt.compare(password, result[0].password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: err });
      if (!isMatch) return res.status(400).json({ message: 'Incorrect password' });

      const token = jwt.sign({ id: result[0].id, role: result[0].role }, 'secretkey', { expiresIn: '1h' });
      res.status(200).json({ token });
    });
  });
});

// File Upload (Multer Middleware)
const upload = multer({ dest: 'uploads/' });

// File Upload Route
app.post('/upload', upload.single('file'), (req, res) => {
  const { userId, fileType } = req.body;
  const filePath = req.file.path;
  
  db.query('INSERT INTO files (user_id, file_path, file_type) VALUES (?, ?, ?)', [userId, filePath, fileType], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: 'File uploaded successfully!' });
  });
});

// Appointment Booking Route
app.post('/appointments', (req, res) => {
  const { patientId, doctorId, appointmentTime } = req.body;
  db.query('INSERT INTO appointments (patient_id, doctor_id, appointment_time) VALUES (?, ?, ?)', [patientId, doctorId, appointmentTime], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: 'Appointment booked successfully!' });
  });
});

// WebSocket Setup for Real-Time Chat
io.on('connection', socket => {
  console.log('A user connected');
  
  socket.on('sendMessage', (message) => {
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(5000, () => {
  console.log('Server running on port 5000');
});
