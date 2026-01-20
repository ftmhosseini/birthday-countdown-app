import express from 'express';
const router = express.Router();
import {login, createAccount} from '../controllers/login_controller.js'

router.post('/login', login);
router.post('/signup', createAccount);
export default router;

