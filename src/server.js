import express from 'express';
import { pinoHttp } from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { dosyaoku, ogrenciEkle } from './utils/file.js';
import { getOgrenciler } from './services/ogrenciler.js';

dotenv.config();

const PORT = process.env.PORT;

export const createServer = () => {
  const app = express();
  app.use(cors());

  app.use(express.json());

  // app.use("/ogrenci", () => {})

  // app.use("*", () => {})

  app.use((req, res, next) => {
    // console.log(`url: ${req.url}, method: ${req.method}, date: ${new Date()}`);
    next();
  });

  app.use(
    pinoHttp({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  /* app.use((error, req, res, next) => {
  console.log('hata');
}); */

  app.get('/', (req, res) => {
    res.send('Anasayfa');
  });

  app.get('/ogrenci', async (req, res) => {
    const data = await dosyaoku();
    res.json({
      mesaj: 'ogrenci listesi',
      datasayi: data.length,
      durum: 'basarili',
      durumkod: 200,
      data: data,
    });
  });

  app.get('/ogrenciler', async (req, res) => {
    const data = await getOgrenciler();
    res.status(200).send({
      mesaj: 'öğrenciler',
      data: data,
    });
  });

  app.get('/ogrenciler/:ogrenciId', (req, res) => {
    res.status(200).send({
      mesaj: req.params.ogrenciId,
    });
  });

  app.post('/ekle', async (req, res) => {
    const gelendata = req.body;
    const tumData = await dosyaoku();
    tumData.push(gelendata);
    await ogrenciEkle(tumData);
    res.json({
      mesaj: 'öğrenci başarıyla kaydedildi.',
      durum: 'OK',
      durumkod: 201,
      data: gelendata,
    });
  });

  app.use((req, res) => {
    res.status(404).send({
      durum: 404,
      mesaj: 'Sayfa bulunamadı.',
    });
  });

  app.listen(PORT, () => {
    console.log('server başlatıldı');
  });
};
