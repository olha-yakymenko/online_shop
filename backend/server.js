const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const cors = require('cors'); 
const app = express();
const usersFilePath = './users.json';
const nodemailer=require('nodemailer')
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3001', 
  methods: 'GET, POST, PUT, DELETE', 
  credentials: true 
}));

app.use(express.json()); 

app.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const data = await fs.readFile(usersFilePath, 'utf8');
    const users = JSON.parse(data);

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isAuthenticated: false,
      cart: [],  
    };

    users.push(newUser);

    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'Error processing request' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const data = await fs.readFile(usersFilePath, 'utf8');
    const users = JSON.parse(data);
    const user = users.find(user => user.email === email);

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (email === "admin@gmail.com") {
      const isPasswordValid = password === "123";  
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      return res.status(200).json({ message: 'Login successful', user: { email, role: 'admin' } });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    user.isAuthenticated = true;
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error processing request' });
  }
});

app.post('/logout', async (req, res) => {
  const { email } = req.body;

  try {
    const data = await fs.readFile(usersFilePath, 'utf8');
    const users = JSON.parse(data);
    const user = users.find(user => user.email === email);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    user.isAuthenticated = false;

    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

    res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    res.status(500).json({ message: 'Error processing request' });
  }
});

app.get('/isAuthenticated', async (req, res) => {
  const { email } = req.query;

  try {
    const data = await fs.readFile(usersFilePath, 'utf8');
    const users = JSON.parse(data);
    const user = users.find(user => user.email === email);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    res.status(200).json({ isAuthenticated: user.isAuthenticated });
  } catch (err) {
    res.status(500).json({ message: 'Error processing request' });
  }
});

const port = 5006;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
