import {
  loginUser,
  logoutUser,
  refreshUser,
  registerUser,
  requestResetMail,
  resetPassword,
} from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const userData = req.body;

  const data = await registerUser(userData);

  res.status(201).send({
    mesaj: 'Kullanıcı kaydı başarılı',
    durum: 201,
    data,
  });
};

export const loginUserController = async (req, res) => {
  const userData = req.body;

  const session = await loginUser(userData);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.status(200).send({
    mesaj: 'Access Token',
    durum: 200,
    accessToken: session.accessToken,
  });
};

export const logoutUserController = async (req, res) => {
  const { sessionId } = req.cookies;

  await logoutUser(sessionId);

  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  res.status(200).send({
    mesaj: 'Kullanıcı çıkışı başarılı',
    durum: 200,
  });
};

export const refreshUserController = async (req, res) => {
  const { refreshToken, sessionId } = req.cookies;

  const session = await refreshUser(refreshToken, sessionId);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.status(200).send({
    mesaj: 'Access Token',
    durum: 200,
    accessToken: session.accessToken,
  });
};

export const requestResetMailController = async (req, res) => {
  const { email } = req.body;

  const sonuc = await requestResetMail(email);

  if (sonuc) {
    res.status(200).send({
      mesaj: 'Şifre Sıfırlama Maili Gönderildi',
      durum: 200,
    });
  } else {
    res.status(500).send({
      mesaj: 'Bir sorun oluştu',
      durum: 500,
    });
  }
};

export const resetPasswordController = async (req, res) => {
  const { token, yenisifre } = req.body;

  await resetPassword(token, yenisifre);

  res.status(200).send({
    mesaj: 'Şifre Güncellendi',
    durum: 200,
  });
};
