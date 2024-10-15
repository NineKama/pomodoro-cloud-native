const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;
const apiRouter = express.Router();

app.use(cors());
app.use(express.json());

// Use /api for all routes
app.use('/api', apiRouter);

let timers = [];

// Create a new timer
apiRouter.post('/start-timer', (req, res) => {
  const { duration } = req.body;
  const timer = { id: timers.length + 1, duration, startTime: Date.now() };
  timers.push(timer);
  res.json({ message: 'Timer started', timer });
});

// Get all timers
apiRouter.get('/timers', (req, res) => {
  res.json(timers);
});

// Clear all timers
apiRouter.delete('/clear-timers', (req, res) => {
  timers = [];
  res.json({ message: 'All timers cleared' });
});

// Heath check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Pomodoro backend running at http://localhost:${port}`);
  });
}

module.exports = app;