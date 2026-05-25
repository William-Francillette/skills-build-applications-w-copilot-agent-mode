import express from 'express';
import cors from 'cors';
import { connectDatabase, mongoUri } from './config/database';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-tracker-api', apiBaseUrl });
});

app.get('/api/users/', async (_req, res) => {
  const users = await User.find().sort({ name: 1 });
  res.json(users);
});

app.get('/api/teams/', async (_req, res) => {
  const teams = await Team.find().sort({ name: 1 });
  res.json(teams);
});

app.get('/api/activities/', async (_req, res) => {
  const activities = await Activity.find().sort({ completedAt: -1 });
  res.json(activities);
});

app.get('/api/leaderboard/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 });
  res.json(leaderboard);
});

app.get('/api/workouts/', async (_req, res) => {
  const workouts = await Workout.find().sort({ title: 1 });
  res.json(workouts);
});

export const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();
    console.log(`Connected to MongoDB at ${mongoUri}`);

    app.listen(port, () => {
      console.log(`Backend listening on ${apiBaseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start backend service', error);
    process.exit(1);
  }
};

export default app;
