import express from 'express';
import { registerUser, getUserProfile } from '../controllers/user.controller.js';

const profile = express.Router();


profile.post('/register', registerUser);
profile.get('/profile/:id', getUserProfile);

export default profile;
