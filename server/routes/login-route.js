import express from 'express';
const router = express.Router();
import {login, createAccount, getBirth} from '../controllers/login_controller.js'

router.post('/login', login);
router.post('/signup', createAccount);
router.get('/birth', getBirth);
export default router;

