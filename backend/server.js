const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const leaderboardSchema = new mongoose.Schema({
  username: String,
  score: Number,
  lastUpdated: { type: Date, default: Date.now }
});

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

app.get('/api/leaderboard', async (req, res) => {
  const list = await Leaderboard.find().sort({ score: -1 }).limit(100);
  res.json(list);
});

app.post('/api/leaderboard', async (req, res) => {
  const { username, score } = req.body;
  if (!username || typeof score !== 'number') return res.status(400).json({ error: 'Invalid' });
  const existing = await Leaderboard.findOne({ username });
  if (existing) {
    existing.score = score;
    existing.lastUpdated = new Date();
    await existing.save();
    return res.json(existing);
  }
  const entry = new Leaderboard({ username, score });
  await entry.save();
  res.json(entry);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
