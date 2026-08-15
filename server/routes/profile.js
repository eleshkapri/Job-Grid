import express from 'express';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import db from '../db/setup.js';
import { authenticateToken } from '../middleware/auth.js';
import fs from 'fs';

const router = express.Router();

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];

// Setup secure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const safeExt = path.extname(file.originalname).toLowerCase();
    const randomName = crypto.randomBytes(16).toString('hex');
    cb(null, `resume-${req.user.id}-${randomName}${safeExt}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max limit
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext) || !ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      return cb(new Error('Invalid file format. Only PDF, DOC, and DOCX files are allowed.'));
    }
    cb(null, true);
  }
});

// Helper to get unified profile with user details
function getFullUserProfile(userId) {
  const user = db.prepare('SELECT id, name, email FROM users WHERE id = ?').get(userId);
  let profile = db.prepare('SELECT * FROM profiles WHERE user_id = ?').get(userId);
  if (!profile) {
    db.prepare('INSERT INTO profiles (user_id) VALUES (?)').run(userId);
    profile = db.prepare('SELECT * FROM profiles WHERE user_id = ?').get(userId);
  }
  return {
    ...profile,
    name: user ? user.name : '',
    email: user ? user.email : ''
  };
}

// GET /api/profile
router.get('/', authenticateToken, (req, res) => {
  try {
    const fullProfile = getFullUserProfile(req.user.id);
    res.json(fullProfile);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/profile
router.put('/', authenticateToken, (req, res) => {
  try {
    const { name, email, phone, location, preferred_location, remote_only, headline, summary, skills, experience, education, linkedin_url, portfolio_url } = req.body;

    // 1. Update users table if name or email changed
    if (name) {
      const formattedName = name.trim().replace(/\b\w/g, c => c.toUpperCase());
      db.prepare('UPDATE users SET name = ? WHERE id = ?').run(formattedName, req.user.id);
    }
    if (email) {
      db.prepare('UPDATE users SET email = ? WHERE id = ?').run(email.trim().toLowerCase(), req.user.id);
    }

    // 2. Ensure profile row exists
    const existing = db.prepare('SELECT id FROM profiles WHERE user_id = ?').get(req.user.id);
    if (!existing) {
      db.prepare('INSERT INTO profiles (user_id) VALUES (?)').run(req.user.id);
    }
    
    // 3. Update profiles table
    db.prepare(`
      UPDATE profiles 
      SET phone = ?, location = ?, preferred_location = ?, remote_only = ?, 
          headline = ?, summary = ?, skills = ?, experience = ?, 
          education = ?, linkedin_url = ?, portfolio_url = ?, updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ?
    `).run(
      phone ? String(phone).trim() : null, 
      location ? String(location).trim() : null, 
      preferred_location ? String(preferred_location).trim() : null, 
      remote_only ? 1 : 0,
      headline ? String(headline).trim() : null, 
      summary ? String(summary).trim() : null, 
      skills ? (typeof skills === 'string' ? skills : JSON.stringify(skills)) : null, 
      experience ? (typeof experience === 'string' ? experience : JSON.stringify(experience)) : null, 
      education ? (typeof education === 'string' ? education : JSON.stringify(education)) : null, 
      linkedin_url ? String(linkedin_url).trim() : null, 
      portfolio_url ? String(portfolio_url).trim() : null, 
      req.user.id
    );
    
    const updatedFullProfile = getFullUserProfile(req.user.id);
    res.json(updatedFullProfile);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/profile/resume
router.post('/resume', authenticateToken, (req, res) => {
  upload.single('resume')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File size exceeds maximum allowed limit of 5MB.' });
      }
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No resume file provided.' });
    }
    
    const resumePath = req.file.path;
    const originalName = req.file.originalname;

    // Ensure profile row exists
    const existing = db.prepare('SELECT id FROM profiles WHERE user_id = ?').get(req.user.id);
    if (!existing) {
      db.prepare('INSERT INTO profiles (user_id) VALUES (?)').run(req.user.id);
    }

    db.prepare('UPDATE profiles SET resume_path = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?').run(resumePath, req.user.id);
    
    res.json({ message: 'Resume uploaded successfully', resume_path: resumePath, filename: originalName });
  });
});

export default router;
