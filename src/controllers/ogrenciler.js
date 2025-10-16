import createHttpError from 'http-errors';
import {
  getOgrenci,
  getOgrenciler,
  ogrenciGuncelle,
  ogrenciOlustur,
  ogrenciSil,
} from '../services/ogrenciler.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

// import { saveFileUpload } from '../utils/saveFileUpload.js';
import { saveFileCloud } from '../utils/saveFileCloud.js';

export const getOgrencilerController = async (req, res) => {
  const queryParams = req.query;

  const { page, perPage } = parsePaginationParams(queryParams);

  const { sortBy, sortOrder } = parseSortParams(queryParams);

  const filter = parseFilterParams(queryParams);

  const data = await getOgrenciler(page, perPage, sortBy, sortOrder, filter);
  res.status(200).send({
    mesaj: 'tüm öğrencilerin listesi',
    data: data,
  });
};

export const getOgrenciController = async (req, res) => {
  const ogrenciId = req.params.ogrenciId;
  const data = await getOgrenci(ogrenciId);
  if (!data) {
    throw createHttpError(404, 'öğrenci bulunamadı');
  }
  res.status(200).send({
    mesaj: 'öğrenci datası',
    data: data,
  });
};

export const ogrenciEkleController = async (req, res) => {
  const gelenData = req.body;

  const photo = req.file;

  let photoUrl;

  if (photo) {
    // photoUrl = await saveFileUpload(photo);
    photoUrl = await saveFileCloud(photo);
  }

  const data = await ogrenciOlustur({ ...gelenData, photo: photoUrl });
  res.status(201).send({
    mesaj: 'öğrenci oluşturuldu',
    data: data,
  });
};

export const ogrenciSilController = async (req, res) => {
  const ogrenciId = req.params.ogrenciId;
  const data = await ogrenciSil(ogrenciId);
  res.status(200).send({
    mesaj: 'öğrenci silindi',
    data: data,
  });
};

export const ogrenciPutGuncelleController = async (req, res) => {
  const ogrenciId = req.params.ogrenciId;
  const ogrenciData = req.body;

  const guncelleData = await ogrenciGuncelle(ogrenciId, ogrenciData, {
    upsert: true,
  });

  if (!guncelleData) {
    throw createHttpError({
      message: 'hata oluştu',
    });
  }

  const durum = guncelleData.yenimi ? 201 : 200;
  const mesaj = guncelleData.yenimi
    ? 'öğrenci oluşturuldu'
    : 'öğrenci güncellendi';

  res.status(durum).send({
    mesaj: mesaj,
    data: guncelleData.ogrenci,
  });
};

export const ogrenciPatchGuncelleController = async (req, res) => {
  const ogrenciId = req.params.ogrenciId;
  const ogrenciData = req.body;

  const guncelleData = await ogrenciGuncelle(ogrenciId, ogrenciData, {
    upsert: false,
  });

  if (!guncelleData) {
    throw createHttpError({
      message: 'hata oluştu',
    });
  }

  const durum = guncelleData.yenimi ? 201 : 200;
  const mesaj = guncelleData.yenimi
    ? 'öğrenci oluşturuldu'
    : 'öğrenci güncellendi';

  res.status(durum).send({
    mesaj: mesaj,
    data: guncelleData.ogrenci,
  });
};
