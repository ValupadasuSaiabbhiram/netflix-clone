//const express = require('express');

import express from 'express';

import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.route.js';

import movieRoutes from './routes/movie.route.js';

import tvRoutes from './routes/tv.route.js'; // Assuming you have a similar route for TV shows

import { protectRoute } from './middleware/protectRoute.js'; // Middleware to protect routes

import searchRoutes from './routes/search.route.js'; // Assuming you have a search route

import { ENV_VARS } from './config/envVars.js';

import { connectDB } from './config/db.js';

const app = express();

const PORT = ENV_VARS.PORT

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes); 
app.use("/api/v1/search", protectRoute, searchRoutes);// Assuming TV routes are similar to movie routes


app.listen(PORT, () => {
  console.log('Server started at http://localhost:'+PORT);
  
  connectDB();
});



