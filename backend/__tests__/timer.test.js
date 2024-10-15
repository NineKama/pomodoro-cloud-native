const request = require('supertest');
const app = require('../server'); 

describe('POST /api/start-timer', () => {
  it('should start a new Pomodoro timer with 25 minutes', async () => {
    const response = await request(app)
      .post('/api/start-timer')  // Note the /api prefix
      .send({ duration: 25 });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Timer started');
    expect(response.body).toHaveProperty('timer.duration', 25);
  });
});