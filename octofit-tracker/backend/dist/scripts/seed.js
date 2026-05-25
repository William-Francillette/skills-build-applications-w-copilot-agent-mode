"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../config/database");
const models_1 = require("../models");
const seedDatabase = async () => {
    console.log('Seed the octofit_db database with test data');
    await (0, database_1.connectDatabase)();
    await Promise.all([
        models_1.User.deleteMany({}),
        models_1.Team.deleteMany({}),
        models_1.Activity.deleteMany({}),
        models_1.LeaderboardEntry.deleteMany({}),
        models_1.Workout.deleteMany({}),
    ]);
    await models_1.Team.insertMany([
        { name: 'Core Crushers', city: 'San Francisco', members: 8, weeklyGoalMinutes: 1800 },
        { name: 'Cardio Crew', city: 'Austin', members: 6, weeklyGoalMinutes: 1500 },
        { name: 'Flex Force', city: 'Seattle', members: 7, weeklyGoalMinutes: 1650 },
    ]);
    await models_1.User.insertMany([
        { name: 'Mona Lovelace', email: 'mona@example.com', role: 'Team Captain', team: 'Core Crushers', activeMinutes: 285 },
        { name: 'Kai Rivera', email: 'kai@example.com', role: 'Member', team: 'Cardio Crew', activeMinutes: 240 },
        { name: 'Ari Chen', email: 'ari@example.com', role: 'Member', team: 'Flex Force', activeMinutes: 215 },
        { name: 'Sam Patel', email: 'sam@example.com', role: 'Coach', team: 'Core Crushers', activeMinutes: 260 },
    ]);
    await models_1.Activity.insertMany([
        { user: 'Mona Lovelace', type: 'Trail Run', durationMinutes: 45, caloriesBurned: 430, completedAt: new Date('2026-05-20T07:30:00Z') },
        { user: 'Kai Rivera', type: 'Cycling', durationMinutes: 60, caloriesBurned: 520, completedAt: new Date('2026-05-21T18:15:00Z') },
        { user: 'Ari Chen', type: 'Yoga Flow', durationMinutes: 35, caloriesBurned: 180, completedAt: new Date('2026-05-22T06:45:00Z') },
        { user: 'Sam Patel', type: 'Strength Circuit', durationMinutes: 50, caloriesBurned: 410, completedAt: new Date('2026-05-23T12:00:00Z') },
    ]);
    await models_1.LeaderboardEntry.insertMany([
        { rank: 1, user: 'Mona Lovelace', team: 'Core Crushers', points: 1280 },
        { rank: 2, user: 'Sam Patel', team: 'Core Crushers', points: 1190 },
        { rank: 3, user: 'Kai Rivera', team: 'Cardio Crew', points: 1115 },
        { rank: 4, user: 'Ari Chen', team: 'Flex Force', points: 980 },
    ]);
    await models_1.Workout.insertMany([
        { title: 'Morning Mobility Reset', category: 'Mobility', durationMinutes: 20, intensity: 'Low', recommendedFor: ['Recovery', 'Beginners'] },
        { title: 'Lunchtime HIIT Blast', category: 'HIIT', durationMinutes: 25, intensity: 'High', recommendedFor: ['Cardio', 'Advanced'] },
        { title: 'Strength Builder A', category: 'Strength', durationMinutes: 40, intensity: 'Medium', recommendedFor: ['Muscle Gain', 'Intermediate'] },
        { title: 'Endurance Ride Prep', category: 'Cycling', durationMinutes: 55, intensity: 'Medium', recommendedFor: ['Endurance', 'Cardio'] },
    ]);
    console.log('Seed data inserted successfully');
};
seedDatabase()
    .catch((error) => {
    console.error('Failed to seed octofit_db', error);
    process.exitCode = 1;
})
    .finally(async () => {
    await mongoose_1.default.disconnect();
});
