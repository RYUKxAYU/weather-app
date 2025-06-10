import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// Initialize SQLite DB
const db = new sqlite3.Database('./weather.db', (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    db.run(`CREATE TABLE IF NOT EXISTS weather (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      location TEXT NOT NULL,
      temperature REAL,
      description TEXT,
      date TEXT
    )`);
  }
});

// CREATE
app.post('/api/weather', (req, res) => {
  const { location, temperature, description, date } = req.body;
  db.run(
    'INSERT INTO weather (location, temperature, description, date) VALUES (?, ?, ?, ?)',
    [location, temperature, description, date],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, location, temperature, description, date });
    }
  );
});

// READ ALL
app.get('/api/weather', (req, res) => {
  db.all('SELECT * FROM weather', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// READ ONE
app.get('/api/weather/:id', (req, res) => {
  db.get('SELECT * FROM weather WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  });
});

// UPDATE
app.put('/api/weather/:id', (req, res) => {
  const { location, temperature, description, date } = req.body;
  db.run(
    'UPDATE weather SET location = ?, temperature = ?, description = ?, date = ? WHERE id = ?',
    [location, temperature, description, date, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: req.params.id, location, temperature, description, date });
    }
  );
});

// DELETE
app.delete('/api/weather/:id', (req, res) => {
  db.run('DELETE FROM weather WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// Health check
app.get('/', (req, res) => {
  res.send('Weather API is running. Use /api/weather');
});

app.listen(PORT, () => {
  console.log(`Weather backend running on http://localhost:${PORT}`);
});
