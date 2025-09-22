import createHttpError from 'http-errors';
import { getOgrenci, getOgrenciler } from '../services/ogrenciler.js';

export const getOgrencilerController = async (req, res) => {
  const data = await getOgrenciler();
  res.status(200).send({
    mesaj: 'tüm öğrencilerin listesi',
    data: data,
  });
};

export const getOgrenciController = async (req, res) => {
  const ogrenciId = req.params.ogrenciId;
  const data = await getOgrenci(ogrenciId);
  if (!data) {
    throw createHttpError({
      message: 'öğrenci bulunamadı',
      status: 404,
    });
  }
  res.status(200).send({
    mesaj: 'öğrenci datası',
    data: data,
  });
};
