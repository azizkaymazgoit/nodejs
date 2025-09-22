export const notFoundHandler = (req, res) => {
  res.status(404).send({
    durum: 404,
    mesaj: 'Sayfa bulunamadı.',
  });
};
