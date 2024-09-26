import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, TextField, Grid, Paper, Box } from '@mui/material';

function App() {
  const [duration, setDuration] = useState(25); // default 25-minute timer
  const [timers, setTimers] = useState([]);

  useEffect(() => {
    fetch('/api/timers')
      .then(response => response.json())
      .then(data => {
        const updatedTimers = data.map(timer => ({
          ...timer,
          remainingTime: calculateRemainingTime(timer),
        }));
        setTimers(updatedTimers);
      });
  }, []);

  // Set up interval to update the timers every second
  useEffect(() => {
    const interval = setInterval(() => {
      updateTimers();
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [timers]);

  const calculateRemainingTime = (timer) => {
    const now = Date.now();
    const endTime = timer.startTime + timer.duration * 60 * 1000; // Convert minutes to milliseconds
    return Math.max(0, Math.floor((endTime - now) / 1000)); // Remaining time in seconds
  };

  const updateTimers = () => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) => {
        const remainingTime = calculateRemainingTime(timer);
        if (remainingTime === 0) {
          return { ...timer, expired: true };
        }
        return { ...timer, remainingTime };
      })
    );
  };

  const startTimer = () => {
    fetch('/api/start-timer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ duration }),
    })
      .then(response => response.json())
      .then(data => {
        const newTimer = {
          ...data.timer,
          remainingTime: calculateRemainingTime(data.timer),
        };
        setTimers([...timers, newTimer]);
      });
  };

  const clearTimers = () => {
    fetch('/api/clear-timers', { method: 'DELETE' })
      .then(response => response.json())
      .then(() => setTimers([]));
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Pomodoro Timer
        </Typography>
        
        <Paper elevation={3} sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <TextField
                label="Set Timer (minutes)"
                variant="outlined"
                fullWidth
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
              />
            </Grid>
            
            <Grid item xs={6}>
              <Button variant="contained" color="primary" fullWidth onClick={startTimer}>
                Start Timer
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="outlined" color="secondary" fullWidth onClick={clearTimers}>
                Clear Timers
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Box sx={{ my: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Active Timers
          </Typography>
          {timers.length === 0 ? (
            <Typography variant="body1">No active timers.</Typography>
          ) : (
            <ul>
              {timers.map((timer) => (
                <li key={timer.id}>
                  {timer.expired ? (
                    <Typography variant="body1" color="error">
                      Timer {timer.id}: Expired
                    </Typography>
                  ) : (
                    <Typography variant="body1">
                      Timer {timer.id}: {Math.floor(timer.remainingTime / 60)} minutes {timer.remainingTime % 60} seconds left
                    </Typography>
                  )}
                </li>
              ))}
            </ul>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default App;
