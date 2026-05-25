"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const models_1 = require("./models");
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-tracker-api', apiBaseUrl });
});
app.get('/api/users/', async (_req, res) => {
    const users = await models_1.User.find().sort({ name: 1 });
    res.json(users);
});
app.get('/api/teams/', async (_req, res) => {
    const teams = await models_1.Team.find().sort({ name: 1 });
    res.json(teams);
});
app.get('/api/activities/', async (_req, res) => {
    const activities = await models_1.Activity.find().sort({ completedAt: -1 });
    res.json(activities);
});
app.get('/api/leaderboard/', async (_req, res) => {
    const leaderboard = await models_1.LeaderboardEntry.find().sort({ rank: 1 });
    res.json(leaderboard);
});
app.get('/api/workouts/', async (_req, res) => {
    const workouts = await models_1.Workout.find().sort({ title: 1 });
    res.json(workouts);
});
const startServer = async () => {
    try {
        await (0, database_1.connectDatabase)();
        console.log(`Connected to MongoDB at ${database_1.mongoUri}`);
        app.listen(port, () => {
            console.log(`Backend listening on ${apiBaseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to start backend service', error);
        process.exit(1);
    }
};
exports.startServer = startServer;
exports.default = app;
