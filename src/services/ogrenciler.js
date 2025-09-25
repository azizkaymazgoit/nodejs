import Ogrenciler from '../db/models/ogrenciler.js';

export const getOgrenciler = async () => {
  const data = await Ogrenciler.find();
  return data;
};

export const getOgrenci = async (id) => {
  const data = await Ogrenciler.findById(id);
  return data;
};

export const ogrenciOlustur = async (ogrenciData) => {
  const data = await Ogrenciler.create(ogrenciData);
  return data;
};

export const ogrenciSil = async (ogrenciId) => {
  //const silinenOgrenci = Ogrenciler.findByIdAndDelete(ogrenciId)
  const silinenOgrenci = Ogrenciler.findOneAndDelete({ _id: ogrenciId });
  return silinenOgrenci;
};

export const ogrenciGuncelle = async (ogrenciId, ogrenciData, opt = {}) => {
  const sonuc = await Ogrenciler.findOneAndUpdate(
    { _id: ogrenciId },
    ogrenciData,
    {
      new: true,
      includeResultMetadata: true,
      ...opt,
    },
  );
  if (sonuc.value) {
    return {
      ogrenci: sonuc.value,
      yenimi: Boolean(sonuc.lastErrorObject.upserted),
    };
  }
  return null;
};
