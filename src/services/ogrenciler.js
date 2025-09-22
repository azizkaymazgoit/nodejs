import Ogrenciler from '../db/models/ogrenciler.js';

export const getOgrenciler = async () => {
  const data = await Ogrenciler.find();
  return data;
};

export const getOgrenci = async (id) => {
  const data = await Ogrenciler.findById(id);
  return data;
};
