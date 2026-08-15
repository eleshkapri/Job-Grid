import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'jobgrid-dev-secure-secret-key-2026';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const token = authHeader.split(' ')[1];
  if (!token || token.trim() === '') {
    return res.status(401).json({ error: 'Invalid authentication token' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Session expired. Please log in again.' });
      }
      return res.status(401).json({ error: 'Invalid or revoked token' });
    }
    
    if (!user || !user.id) {
      return res.status(401).json({ error: 'Invalid payload in authentication token' });
    }

    req.user = user;
    next();
  });
};
