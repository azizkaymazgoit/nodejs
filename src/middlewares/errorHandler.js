import { HttpError } from 'http-errors';

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).send({
      mesaj: err.message,
      durum: err.status,
    });
  }
  res.status(500).send({
    mesaj: 'sunucu hatası',
    durum: 500,
  });
};
