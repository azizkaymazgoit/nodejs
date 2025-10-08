import createHttpError from 'http-errors';

import SessionsCollection from '../db/models/sessions.js';
import UsersCollection from '../db/models/users.js';

export const authorization = async (req, res, next) => {
  // authorization var mı
  const author = req.get('Authorization');

  if (!author) {
    next(createHttpError(404, 'Authorization bulunamadı'));
    return;
  }

  // Bearer token doğru bir şekilde gelmiş mi
  // Bearer UN35r4FaTJ1FVWMnq/zgQAsiZqsF3U87ofE4i7gu

  const bearer = author.split(' ')[0];
  const token = author.split(' ')[1];

  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Geçersiz Bearer Token'));
    return;
  }

  // bu token var mı yok mu
  const session = await SessionsCollection.findOne({ accessToken: token });

  if (!session) {
    next(createHttpError(401, 'token Geçersiz'));
    return;
  }

  // bu token süresi geçerli mi
  if (session.accessTokenValidUntil < Date.now()) {
    next(createHttpError(401, 'Token Süresi doldu'));
    return;
  }

  // token varsa kim olduğunuda ekle : user
  const user = await UsersCollection.findById(session.userId);

  req.user = user;

  next();
};
