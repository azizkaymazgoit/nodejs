import bcrypt from 'bcrypt';

import { randomBytes } from 'node:crypto';

import createHttpError from 'http-errors';
import UsersCollection from '../db/models/users.js';
import { ACCESS_TOKEN_TIME, REFRESH_TOKEN_TIME } from '../constants/index.js';
import SessionsCollection from '../db/models/sessions.js';

export const registerUser = async (userData) => {
  const { email, password } = userData;

  const userCheck = await UsersCollection.findOne({ email });

  if (userCheck) {
    throw createHttpError(409, 'Bu email ile daha önce kayıt olunmuş');
  }

  const sifrelenmisSifre = await bcrypt.hash(password, 10);
  userData.password = sifrelenmisSifre;

  const user = await UsersCollection.create(userData);
  return user;
};

export const loginUser = async (userData) => {
  const { email, password } = userData;

  const user = await UsersCollection.findOne({ email });

  if (!user) {
    throw createHttpError(404, 'Kullanıcı Bulunamadı.');
  }

  const sifreKontrol = await bcrypt.compare(password, user.password);

  if (!sifreKontrol) {
    throw createHttpError(400, 'Şifre Yanlış');
  }

  await SessionsCollection.deleteMany({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  const accessTokenValidUntil = new Date(Date.now() + ACCESS_TOKEN_TIME);
  const refreshTokenValidUntil = new Date(Date.now() + REFRESH_TOKEN_TIME);

  const sessionData = await SessionsCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return sessionData;
};

export const logoutUser = async (sessionId) => {
  await SessionsCollection.findByIdAndDelete(sessionId);
};

export const refreshUser = async (refreshToken, sessionId) => {
  const session = await SessionsCollection.findById(sessionId);
  if (!session) {
    throw createHttpError(404, 'Oturum bulunmadı');
  }

  if (session.refreshTokenValidUntil < Date.now()) {
    throw createHttpError(400, 'Refreshtoken süresi bitmiş');
  }

  const accessTokenNew = randomBytes(30).toString('base64');
  const refreshTokenNew = randomBytes(30).toString('base64');

  const accessTokenValidUntilNew = new Date(Date.now() + ACCESS_TOKEN_TIME);
  const refreshTokenValidUntilNew = new Date(Date.now() + REFRESH_TOKEN_TIME);

  const sessionData = await SessionsCollection.create({
    userId: session.userId,
    accessToken: accessTokenNew,
    refreshToken: refreshTokenNew,
    accessTokenValidUntil: accessTokenValidUntilNew,
    refreshTokenValidUntil: refreshTokenValidUntilNew,
  });

  await SessionsCollection.findByIdAndDelete(sessionId);

  return sessionData;
};
