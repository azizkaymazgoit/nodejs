import { Router } from 'express';
import {
  getOgrenciController,
  getOgrencilerController,
  ogrenciEkleController,
  ogrenciPatchGuncelleController,
  ogrenciPutGuncelleController,
  ogrenciSilController,
} from '../controllers/ogrenciler.js';
import { controllerWrapper } from '../utils/controllerWrapper.js';
import { validateBody } from '../middlewares/validatorBody.js';
import {
  ogenciEkleSchema,
  ogrenciGuncelleSchema,
} from '../validators/ogrenciler.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authorization } from '../middlewares/authorization.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { USER_ROLES } from '../constants/index.js';

import { upload } from '../middlewares/uplaod.js';

const ogrenciRouter = Router();

ogrenciRouter.use(authorization);

ogrenciRouter.get(
  '/',
  checkRoles(USER_ROLES.TEACHER),
  controllerWrapper(getOgrencilerController),
);

ogrenciRouter.post(
  '/',
  checkRoles(USER_ROLES.TEACHER),
  upload.single('photo'),
  /*  upload.array('photos', 3),
  upload.fields({
    photo: {maxcount: 1},
    photos: {maxcount: 10}
  }), */
  validateBody(ogenciEkleSchema),
  controllerWrapper(ogrenciEkleController),
);
ogrenciRouter.get(
  '/:ogrenciId',
  isValidId,
  checkRoles(USER_ROLES.PARENT),
  controllerWrapper(getOgrenciController),
);
ogrenciRouter.delete(
  '/:ogrenciId',
  isValidId,
  controllerWrapper(ogrenciSilController),
);

ogrenciRouter.put(
  '/:ogrenciId',
  controllerWrapper(ogrenciPutGuncelleController),
);

ogrenciRouter.patch(
  '/:ogrenciId',
  isValidId,
  validateBody(ogrenciGuncelleSchema),
  controllerWrapper(ogrenciPatchGuncelleController),
);

export default ogrenciRouter;
