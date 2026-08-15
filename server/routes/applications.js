import express from 'express';
import db from '../db/setup.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/applications
router.get('/', authenticateToken, (req, res) => {
  try {
    const { status } = req.query;
    let query = 'SELECT * FROM applications WHERE user_id = ?';
    const params = [req.user.id];

    if (status && status.toLowerCase() !== 'all') {
      query += ' AND LOWER(status) = ?';
      params.push(status.toLowerCase());
    }
    
    query += ' ORDER BY applied_at DESC';

    const applications = db.prepare(query).all(...params);
    res.json(applications);
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/applications
router.post('/', authenticateToken, (req, res) => {
  try {
    const { job_title, company, source, source_url, url, status, notes } = req.body;

    if (!job_title || !company) {
      return res.status(400).json({ error: 'job_title and company are required' });
    }

    const result = db.prepare(`
      INSERT INTO applications (user_id, job_title, company, source, source_url, status, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      req.user.id, 
      job_title.trim(), 
      company.trim(), 
      source || 'Manual', 
      source_url || url || null, 
      (status || 'applied').toLowerCase(), 
      notes || null
    );

    const newApp = db.prepare('SELECT * FROM applications WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newApp);
  } catch (error) {
    console.error('Create application error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH /api/applications/:id
router.patch('/:id', authenticateToken, (req, res) => {
  try {
    const { status, notes } = req.body;
    
    // Ensure application exists and belongs to user
    const app = db.prepare('SELECT * FROM applications WHERE id = ? AND user_id = ?').get(req.params.id, req.user.id);
    if (!app) {
      return res.status(404).json({ error: 'Application not found' });
    }

    let updateFields = [];
    let params = [];

    if (status !== undefined) {
      updateFields.push('status = ?');
      params.push(status.toLowerCase());
    }
    if (notes !== undefined) {
      updateFields.push('notes = ?');
      params.push(notes);
    }

    if (updateFields.length > 0) {
      params.push(req.params.id);
      db.prepare(`UPDATE applications SET ${updateFields.join(', ')} WHERE id = ?`).run(...params);
    }

    const updatedApp = db.prepare('SELECT * FROM applications WHERE id = ?').get(req.params.id);
    res.json(updatedApp);
  } catch (error) {
    console.error('Update application error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/applications/:id
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const app = db.prepare('SELECT * FROM applications WHERE id = ? AND user_id = ?').get(req.params.id, req.user.id);
    if (!app) {
      return res.status(404).json({ error: 'Application not found' });
    }

    db.prepare('DELETE FROM applications WHERE id = ? AND user_id = ?').run(req.params.id, req.user.id);
    res.json({ success: true, message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Delete application error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
