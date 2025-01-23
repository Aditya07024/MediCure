// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(bodyParser.json());

// // MongoDB connection
// mongoose.connect('mongodb://localhost:27017/medicsDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // User Schema
// const userSchema = new mongoose.Schema({
//   userId: String,
// });

// const User = mongoose.model('User', userSchema);

// // Login route
// app.post('/login', async (req, res) => {
//   const { userId } = req.body;
//   const user = await User.findOne({ userId });
//   if (user) {
//     res.send({ success: true });
//   } else {
//     res.send({ success: false });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/medicsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// User Schema
const userSchema = new mongoose.Schema({
  userId: String,
});

const User = mongoose.model('User', userSchema);

// Predefined list of allowed IDs
const allowedIDs = ['user1', 'user2', 'user3'];

// Login route
app.post('/login', async (req, res) => {
  const { userId } = req.body;
  const user = await User.findOne({ userId });
  if (user) {
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
});

// Add User route
app.post('/addUser', async (req, res) => {
  const { userId } = req.body;

  if (!allowedIDs.includes(userId)) {
    return res.send({ success: false, error: 'User ID not allowed' });
  }

  const newUser = new User({ userId });
  try {
    await newUser.save();
    res.send({ success: true });
  } catch (error) {
    console.error(error);
    res.send({ success: false, error: 'Failed to add user' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
