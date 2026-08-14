import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure data directory exists
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Database file path
const dbPath = path.join(dataDir, 'jobgrid.db');

// Initialize Database connection
let db;
try {
  db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  
  // Read and execute schema.sql
  const schemaPath = path.join(__dirname, 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');
  db.exec(schema);

  // Safe migrations for preferred_location & remote_only
  try {
    db.exec(`ALTER TABLE profiles ADD COLUMN preferred_location TEXT;`);
  } catch (e) { /* Column already exists */ }
  try {
    db.exec(`ALTER TABLE profiles ADD COLUMN remote_only INTEGER DEFAULT 0;`);
  } catch (e) { /* Column already exists */ }

  console.log('Database initialized successfully.');
} catch (error) {
  console.error('Failed to initialize database:', error);
  process.exit(1);
}

export default db;
