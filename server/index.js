const bcrypt = require('bcrypt');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./model/user');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB (Get your string from MongoDB Atlas)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
//clean the data from user

app.use(express.json());
app.use(mongoSanitize());

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, 
  message: "Too many login attempts, please try again after 15 minutes"
});

  // hash password before saving user
  const hashedPassword= await bcrypt.hash(password, 10)
  console.log(hashedPassword)

// SIGNUP ROUTE
app.post('/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "User created!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user) {
    // 1. Check if the provided password matches the hashed one in DB
    const isMatch = await bcrypt.compare(password, hashedPassword);
    
    if (isMatch) {
      res.json({ message: "Login successful", user: user.username });
    } else {
      res.status(401).json({ error: "Invalid password" });
    }
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));