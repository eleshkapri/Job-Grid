import express from 'express';
import multer from 'multer';
import path from 'path';
import db from '../db/setup.js';
import { authenticateToken } from '../middleware/auth.js';
import fs from 'fs';

const router = express.Router();

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// GET /api/profile
router.get('/', authenticateToken, (req, res) => {
  try {
    const profile = db.prepare('SELECT * FROM profiles WHERE user_id = ?').get(req.user.id);
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/profile
router.put('/', authenticateToken, (req, res) => {
  try {
    const { phone, location, preferred_location, remote_only, headline, summary, skills, experience, education, linkedin_url, portfolio_url } = req.body;
    
    db.prepare(`
      UPDATE profiles 
      SET phone = ?, location = ?, preferred_location = ?, remote_only = ?, 
          headline = ?, summary = ?, skills = ?, experience = ?, 
          education = ?, linkedin_url = ?, portfolio_url = ?, updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ?
    `).run(
      phone || null, location || null, preferred_location || null, remote_only ? 1 : 0,
      headline || null, summary || null, skills || null, experience || null, 
      education || null, linkedin_url || null, portfolio_url || null, req.user.id
    );
    
    const updatedProfile = db.prepare('SELECT * FROM profiles WHERE user_id = ?').get(req.user.id);
    res.json(updatedProfile);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/profile/resume
router.post('/resume', authenticateToken, upload.single('resume'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const resumePath = req.file.path;
    db.prepare('UPDATE profiles SET resume_path = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?').run(resumePath, req.user.id);
    
    res.json({ message: 'Resume uploaded successfully', resume_path: resumePath });
  } catch (error) {
    console.error('Upload resume error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
