import express from 'express'
import {load_carousels, load_birth_carousel} from '../controllers/carousel-controller.js'

const router = express.Router()

router.get('/', load_carousels);
router.get('/hbd', load_birth_carousel);

export default router;