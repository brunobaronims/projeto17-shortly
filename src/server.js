import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';

import userRoute from './routes/userRoute.js';
import urlRoute from './routes/urlRoute.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(userRoute);
app.use(urlRoute);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));