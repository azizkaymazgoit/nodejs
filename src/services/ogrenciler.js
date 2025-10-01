import { DEFAULT_PAGINATION_VALUES } from '../constants/pagination.js';
import Ogrenciler from '../db/models/ogrenciler.js';
import { calculatePaginationdata } from '../utils/calculatePaginationdata.js';

export const getOgrenciler = async (
  page = DEFAULT_PAGINATION_VALUES.page,
  perPage = DEFAULT_PAGINATION_VALUES.perPage,
  sortBy = DEFAULT_PAGINATION_VALUES.sortBy,
  sortOrder = DEFAULT_PAGINATION_VALUES.sortOrder,
  filter = {},
) => {
  // page
  // limit

  // 1.sayfada 5 limit data
  // 0,1,2,3,4

  // 4.sayfada 5 limit data
  // 0...19 20.

  const skip = (page - 1) * perPage;
  const limit = perPage;

  const ogrenciQuery = Ogrenciler.find();

  // koşullar
  if (filter.gender) {
    ogrenciQuery.where('gender').eq(filter.gender);
  }

  if (filter.minAge) {
    ogrenciQuery.where('age').gte(filter.minAge);
  }

  if (filter.maxAge) {
    ogrenciQuery.where('age').lte(filter.maxAge);
  }

  const totalData = await Ogrenciler.countDocuments(ogrenciQuery.getQuery());

  const data = await ogrenciQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const pagination = calculatePaginationdata(totalData, page, perPage);

  return {
    data,
    pagination,
  };
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
