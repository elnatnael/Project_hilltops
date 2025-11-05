const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route - to check if backend is running
app.get('/api/status', (req, res) => {
  res.json({ 
    status: '✅ Backend is running!',
    message: 'Hilltops Academy API Server',
    timestamp: new Date().toISOString()
  });
});

// Mock login endpoints (we'll replace with real database later)
app.post('/api/auth/staff-login', (req, res) => {
  const { email, password } = req.body;
  console.log('🔐 Staff login attempt:', email);
  
  // Mock staff data - same as your frontend
  const staff = {
    'johnson@hilltops.edu': { password: 'teacher123', name: 'Mr. Johnson', role: 'teacher' },
    'davis@hilltops.edu': { password: 'teacher123', name: 'Ms. Davis', role: 'teacher' },
    'wilson@hilltops.edu': { password: 'teacher123', name: 'Mr. Wilson', role: 'teacher' },
    'admin@hilltops.edu': { password: 'admin123', name: 'Administrator', role: 'admin' }
  };
  
  const staffMember = staff[email];
  
  if (staffMember && staffMember.password === password) {
    console.log('✅ Staff login successful via backend');
    res.json({
      ...staffMember,
      email: email,
      message: 'Login successful via backend API'
    });
  } else {
    console.log('❌ Staff login failed via backend');
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/auth/student-login', (req, res) => {
  const { email, password } = req.body;
  console.log('🔐 Student login attempt:', email);
  
  // Mock student data
  const students = {
    'sarah@hilltops.edu': { password: 'student123', name: 'Sarah Johnson', role: 'student' },
    'mike@hilltops.edu': { password: 'student123', name: 'Mike Brown', role: 'student' },
    'emma@hilltops.edu': { password: 'student123', name: 'Emma Davis', role: 'student' }
  };
  
  const student = students[email];
  
  if (student && student.password === password) {
    console.log('✅ Student login successful via backend');
    res.json({
      ...student,
      email: email,
      message: 'Login successful via backend API'
    });
  } else {
    console.log('❌ Student login failed via backend');
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend Server running on http://localhost:${PORT}`);
  console.log(`📚 Hilltops Academy API Ready!`);
  console.log(`📍 Test endpoint: http://localhost:${PORT}/api/status`);
});