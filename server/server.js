import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import loginRoute from './routes/login-route.js';
import carouselRoute from './routes/carousel-route.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.static('.'));

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/index.html'));
// });
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

app.use('/api/carousel', carouselRoute);
app.use('/api', loginRoute);
app.use('/api', loginRoute);


const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
