import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ogrenciRouter from './routers/ogrenciler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import AuthRouter from './routers/auth.js';
import cookieParser from 'cookie-parser';
import { UPLOADS_FOLDER } from './constants/index.js';

dotenv.config();

const PORT = process.env.PORT;

export const createServer = () => {
  const app = express();

  app.use(cors());

  app.use(
    express.json({
      limit: '1mb',
    }),
  );

  app.use(cookieParser());

  app.get('/', (req, res) => {
    res.send('Anasayfa');
  });

  app.use('/ogrenciler', ogrenciRouter);

  app.use('/auth', AuthRouter);

  app.use('/uploads', express.static(UPLOADS_FOLDER));

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log('server başlatıldı');
  });
};
