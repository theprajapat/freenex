const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI);

// User model
const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  skills: String,
  location: String,
}));

// Register Route
app.post('/register', async (req, res) => {
  const { name, email, password, skills, location } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword, skills, location });
  await newUser.save();
  res.status(201).json({ message: 'User registered successfully' });
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Profile Route (Protected)
app.get('/user/profile', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  console.log(token)
  if (!token) return res.status(401).json({ error: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/freelancers/nearby', async (req, res) => {
const search = req.query.search || '';  // Get search term from query parameters

try {
  const freelancers = await User.find({
    $or: [
      { skills: { $regex: search, $options: 'i' } },  // Case-insensitive search in skills
      { location: { $regex: search, $options: 'i' } }  // Case-insensitive search in location
    ]
  });

  res.json(freelancers);  // Return matching freelancers
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Failed to fetch freelancers' });
}
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
