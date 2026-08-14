CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER UNIQUE REFERENCES users(id),
  phone TEXT,
  location TEXT,
  preferred_location TEXT,
  remote_only INTEGER DEFAULT 0,
  headline TEXT,
  summary TEXT,
  skills TEXT,
  experience TEXT,
  education TEXT,
  resume_path TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id),
  job_title TEXT NOT NULL,
  company TEXT NOT NULL,
  source TEXT,
  source_url TEXT,
  status TEXT DEFAULT 'applied',
  applied_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  notes TEXT
);
